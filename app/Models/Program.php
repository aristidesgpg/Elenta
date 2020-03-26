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
        return $this->belongsTo(User::class);
    }

    public function template() {
        return $this->belongsTo(Template::class);
    }

    public function modules() {
        return $this->hasMany(Module::class);
    }

    public function learners() {
        return $this->hasManyThrough(User::class, ProgramLearner::class);
    }

    public function invites() {
        return $this->hasMany(ProgramInvite::class);
    }
}
