<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'password',
        'roles',
        'last_login_at',
    ];

    public function getRoles(): array
    {
        return explode(',', $this->roles);
    }
    public function setRoles(array $roles): void
    {
        $this->roles = implode(',', $roles);
    }
    public function hasRole(string $role): bool
    {
        return in_array($role, $this->getRoles());
    }
    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }
        return false;
    }
    public function makeToken(string $tokenName, array $abilities = ['*'])
    {
        return $this->createToken($tokenName, $abilities)->plainTextToken;
    }
    public function revokeToken(string $tokenName): void
    {
        $this->tokens()->where('name', $tokenName)->delete();
    }
    public function revokeAllTokens(): void
    {
        $this->tokens()->delete();
    }
    public function getAllTokens()
    {
        $tokens = $this->tokens;
        return $tokens->map(function ($token) {
            return [
                'name' => $token->name,
                'abilities' => $token->abilities,
                'last_used_at' => $token->last_used_at,
                'created_at' => $token->created_at,
            ];
        });
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
