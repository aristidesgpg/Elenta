<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TemplateModule extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function module() {
        return $this->belongsTo(Module::class);
    }

    public function template() {
        return $this->belongsTo(Template::class);
    }
}
