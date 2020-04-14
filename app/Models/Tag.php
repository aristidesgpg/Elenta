<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tag extends Model
{
    /**
     * Get all of the templates that are assigned this tag.
     */
    public function templates(): MorphToMany {
        return $this->morphedByMany(Template::class, 'taggable');
    }

    /**
     * Get all of the programs that are assigned this tag.
     */
    public function programs(): MorphToMany {
        return $this->morphedByMany(Program::class, 'taggable');
    }

    /**
     * Get all of the modules that are assigned this tag.
     */
    public function modules(): MorphToMany {
        return $this->morphedByMany(Module::class, 'taggable');
    }
}
