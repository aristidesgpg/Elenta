<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use Notifiable;
    use SoftDeletes;
    use UsesUuid;
    use Billable;

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function authoredTemplates() {
        return $this->hasMany(Template::class);
    }

    public function authoredPrograms() {
        return $this->hasMany(Program::class);
    }

    public function enrolledPrograms() {
        return $this->hasManyThrough(Program::class, ProgramLearner::class);
    }

    public function enrolledModules() {
        return $this->hasManyThrough(Module::class, ModuleSend::class);
    }

    public function templateRequests() {
        return $this->hasMany(TemplateRequest::class);
    }
}
