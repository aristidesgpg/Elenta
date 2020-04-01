<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Module
 *
 * @property string $id
 * @property string $title
 * @property string $description
 * @property bool $is_public
 * @property mixed|null $content
 * @property mixed|null $conditions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Program[] $programs
 * @property-read int|null $programs_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Template[] $templates
 * @property-read int|null $templates_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Module onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereConditions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Module whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Module withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Module withoutTrashed()
 * @mixin \Eloquent
 */
class Module extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(ConsultantProfile::class, 'consultant_profile_id');
    }

    public function programs() {
        return $this->belongsToMany(Program::class, 'program_modules');
    }

    public function templates() {
        return $this->belongsToMany(Template::class, TemplateModule::class);
    }
}
