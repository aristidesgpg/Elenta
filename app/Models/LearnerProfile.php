<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LearnerProfile extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function programs() {
        return $this->hasManyThrough(Program::class, ProgramLearner::class);
    }

    public function modules() {
        return $this->hasManyThrough(Module::class,  ProgramModuleSend::class);
    }
}
