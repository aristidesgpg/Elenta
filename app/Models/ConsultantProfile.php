<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsultantProfile extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function templates() {
        return $this->hasMany(Template::class);
    }

    public function programs() {
        return $this->hasMany(Program::class);
    }
}
