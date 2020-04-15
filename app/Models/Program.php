<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Program
 *
 * @property string $id
 * @property string $consultant_profile_id
 * @property string $template_id
 * @property string $title
 * @property string $format
 * @property int|null $max_learners
 * @property string|null $start_timestamp
 * @property bool $can_invite
 * @property bool $is_public
 * @property mixed|null $dynamic_fields
 * @property mixed|null $dynamic_fields_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProgramInvite[] $invites
 * @property-read int|null $invites_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\LearnerProfile[] $learners
 * @property-read int|null $learners_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Module[] $modules
 * @property-read int|null $modules_count
 * @property-read \App\Models\ConsultantProfile $owner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProgramModule[] $programModules
 * @property-read int|null $program_modules_count
 * @property-read \App\Models\Template $template
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Program onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereCanShare($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereConsultantProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereDynamicFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereDynamicFieldsData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereMaxLearners($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereStartTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Program withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Program withoutTrashed()
 * @mixin \Eloquent
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereCanInvite($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tag[] $tags
 * @property-read int|null $tags_count
 */
class Program extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function owner(): BelongsTo {
        return $this->belongsTo(ConsultantProfile::class, 'consultant_profile_id');
    }

    public function template(): BelongsTo {
        return $this->belongsTo(Template::class);
    }

    public function programModules(): HasMany {
        return $this->hasMany(ProgramModule::class);
    }

    public function modules(): BelongsToMany {
        return $this->belongsToMany(Module::class, 'program_modules');
    }

    public function learners(): BelongsToMany {
        return $this->belongsToMany(LearnerProfile::class, 'program_learners');
    }

    public function invites(): HasMany {
        return $this->hasMany(ProgramInvite::class);
    }

    /**
     * Get all of the tags for the program.
     */
    public function tags(): MorphToMany {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
