<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Template extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(ConsultantProfile::class);
    }

    public function modules() {
        return $this->hasManyThrough(Module::class, TemplateModule::class);
    }

    public function requests() {
        return $this->hasMany(TemplateRequest::class);
    }

    public function programs() {
        return $this->hasMany(Program::class);
    }
}
