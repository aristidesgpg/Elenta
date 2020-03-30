<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TemplateRequest extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function template() {
        return $this->belongsTo(Template::class);
    }

    public function learner() {
        return $this->belongsTo(LearnerProfile::class);
    }
}
