<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProgramModule extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function program() {
        return $this->belongsTo(Program::class);
    }

    public function module() {
        return $this->belongsTo(Module::class);
    }

    public function reminders() {
        return $this->hasMany(ProgramModuleReminder::class);
    }

    public function triggers() {
        return $this->hasMany(ProgramModuleTrigger::class);
    }

    public function sends() {
        return $this->hasMany(ProgramModuleSend::class);
    }
}
