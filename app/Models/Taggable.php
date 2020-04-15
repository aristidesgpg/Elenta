<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Taggable
 *
 * @property int $id
 * @property int $tag_id
 * @property string $taggable_id
 * @property string $taggable_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Module[] $modules
 * @property-read int|null $modules_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Program[] $programs
 * @property-read int|null $programs_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tag[] $tags
 * @property-read int|null $tags_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Template[] $templates
 * @property-read int|null $templates_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Taggable onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable whereTagId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable whereTaggableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable whereTaggableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Taggable whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Taggable withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Taggable withoutTrashed()
 * @mixin \Eloquent
 */

// Might have to extend a Pivot instead of Model
class Taggable extends Model
{
    use SoftDeletes;

    public const TEMPLATE = Template::class;
    public const PROGRAM = Program::class;
    public const MODULE = Module::class;

    public function templates(): BelongsToMany {
        return $this->belongsToMany(Template::class, 'templates');
    }

    public function programs(): BelongsToMany {
        return $this->belongsToMany(Program::class, 'programs');
    }


    public function modules(): BelongsToMany {
        return $this->belongsToMany(Module::class, 'modules');
    }

    public function tags(): Morp {
        return $this->belongsToMany(Tag::class, 'tags');
    }
}
