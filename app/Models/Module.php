<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function program() {
        return $this->belongsTo(Program::class);
    }

    public function template() {
        return $this->belongsTo(Template::class);
    }

    public function reminders() {
        return $this->hasMany(ModuleReminder::class);
    }

    public function triggers() {
        return $this->hasMany(ModuleTrigger::class);
    }

    public function sends() {
        return $this->hasMany(ModuleSend::class);
    }

    public function recipients() {
        return $this->hasManyThrough(User::class, ModuleSend::class);
    }
}
