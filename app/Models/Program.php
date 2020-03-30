<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(ConsultantProfile::class);
    }

    public function template() {
        return $this->belongsTo(Template::class);
    }

    public function modules() {
        return $this->hasManyThrough(Module::class, ProgramModule::class);
    }

    public function learners() {
        return $this->hasManyThrough(LearnerProfile::class, ProgramLearner::class);
    }

    public function invites() {
        return $this->hasMany(ProgramInvite::class);
    }
}
