<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModuleSend extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function module() {
        return $this->belongsTo(Module::class);
    }

    public function recipients() {
        return $this->hasOne(User::class);
    }
}
