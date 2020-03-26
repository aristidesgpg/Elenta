<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProgramLearner extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function program() {
        return $this->belongsTo(Program::class);
    }

    public function learner() {
        return $this->belongsTo(User::class);
    }
}
