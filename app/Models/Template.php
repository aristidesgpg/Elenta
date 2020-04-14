<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Template
 *
 * @property string $id
 * @property string $consultant_profile_id
 * @property string $title
 * @property bool $can_request
 * @property bool $is_public
 * @property mixed|null $dynamic_fields
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Module[] $modules
 * @property-read int|null $modules_count
 * @property-read \App\Models\ConsultantProfile $owner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Program[] $programs
 * @property-read int|null $programs_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TemplateRequest[] $requests
 * @property-read int|null $requests_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Template onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereCanRequest($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereConsultantProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereDynamicFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Template withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Template withoutTrashed()
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TemplateModule[] $templateModules
 * @property-read int|null $template_modules_count
 */
class Template extends Model
{
    use SoftDeletes;
    use UsesUuid;

    //TODO: Move to Program
    public const FORMATS = ['SELF_DIRECTED', 'IN_PERSON', 'VIRTUAL_ATTENDANCE'];

    protected $guarded = [];

    public function owner(): BelongsTo {
        return $this->belongsTo(ConsultantProfile::class, 'consultant_profile_id');
    }

    public function templateModules(): HasMany {
        return $this->hasMany(TemplateModule::class);
    }

    public function modules(): BelongsToMany {
        return $this->belongsToMany(Module::class, 'template_modules')
            ->withPivot([
                'folder',
                'order'
            ]);
    }

    public function requests(): HasMany {
        return $this->hasMany(TemplateRequest::class);
    }

    public function programs(): HasMany {
        return $this->hasMany(Program::class);
    }
}
