<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProgramModuleTrigger extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function programModule() {
        return $this->belongsTo(ProgramModule::class);
    }

    public function module() {
        return $this->hasOneThrough(Module::class, ProgramModule::class);
    }
}
