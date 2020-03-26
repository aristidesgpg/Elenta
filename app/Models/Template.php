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
        return $this->belongsTo(User::class);
    }

    public function modules() {
        return $this->hasMany(Module::class);
    }

    public function requests() {
        return $this->hasMany(TemplateRequest::class);
    }

    public function programs() {
        return $this->hasMany(Program::class);
    }
}
