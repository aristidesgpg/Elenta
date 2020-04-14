<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Tag extends Model
{
    /**
     * Get all of the templates that are assigned this tag.
     */
    public function templates() {
        return $this->morphedByMany(Template::class, 'taggable');
    }

    /**
     * Get all of the programs that are assigned this tag.
     */
    //TODO: need to add the programs(): MorphMany return type thing, unsure what it is
    public function programs() {
        return $this->morphedByMany(Program::class, 'taggable');
    }

    /**
     * Get all of the modules that are assigned this tag.
     */
    public function modules() {
        return $this->morphedByMany(Module::class, 'taggable');
    }
}
