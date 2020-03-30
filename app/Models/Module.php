<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function programs() {
        return $this->hasManyThrough(Program::class, ProgramModule::class);
    }

    public function templates() {
        return $this->hasManyThrough(Template::class, TemplateModule::class);
    }

    public function reminders() {
        return $this->hasManyThrough(ProgramModuleReminder::class, ProgramModule::class);
    }

    public function triggers() {
        return $this->hasManyThrough(ProgramModuleTrigger::class, ProgramModule::class);
    }

    public function sends() {
        return $this->hasManyThrough(ProgramModuleSend::class, ProgramModule::class);
    }
}
