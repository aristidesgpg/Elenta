<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProgramModuleSend extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public const REASONS = ['MANUAL', 'TRIGGER', 'REMINDER'];
    public const CHANNELS = ['EMAIL', 'SLACK'];


    public function programModule() {
        return $this->belongsTo(ProgramModule::class);
    }

    public function module() {
        return $this->hasOneThrough(Module::class, ProgramModule::class);
    }

    public function recipients() {
        return $this->hasOne(LearnerProfile::class);
    }
}
