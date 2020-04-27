<?php

namespace App\Models;

use App\RecipientList;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereDeletedAt($value) * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereDynamicFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Template withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Template withoutTrashed()
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TemplateModule[] $templateModules
 * @property-read int|null $template_modules_count
 * @property string $description
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Template whereDynamicFields($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tag[] $tags
 * @property-read int|null $tags_count
 * @property-read mixed $default_recipient_list
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\RecipientList[] $recipientLists
 * @property-read int|null $recipient_lists_count
 */
class Template extends BaseModel
{
    use SoftDeletes;
    use UsesUuid;

    //TODO: Move to Program
    public const FORMATS = ['SELF_DIRECTED', 'IN_PERSON', 'VIRTUAL_ATTENDANCE'];

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();
        // Create a Module for new Template
        static::created(function (Template $t) {
            /** @var User $user */
            $user = Auth::user();
            $m = new Module();
            $m->fill([
                'title' => 'New Module',
                'description' => 'Module Description',
                'consultant_profile_id' => $user->consultantProfile->id
            ]);
            $m->save();

            $tm = new TemplateModule();
            $tm->fill([
                'template_id' => $t->id,
                'module_id' => $m->id,
            ]);
            $tm->save();
        });
    }

    public function owner(): BelongsTo {
        return $this->belongsTo(ConsultantProfile::class, 'consultant_profile_id');
    }

    public function templateModules(): HasMany {
        return $this->hasMany(TemplateModule::class);
    }

    public function modules(): BelongsToMany {
        return $this->belongsToMany(Module::class, 'template_modules')
            ->using(TemplateModule::class)
            ->withPivot([
                'id',
                'folder',
                'order',
                'deleted_at',
                'recipient_list_id'
            ])
            ->whereNull('template_modules.deleted_at')
            ->orderBy('template_modules.order', 'asc');
    }

    public function requests(): HasMany {
        return $this->hasMany(TemplateRequest::class);
    }

    public function programs(): HasMany {
        return $this->hasMany(Program::class);
    }

    public function recipientLists(): HasMany {
        return $this->hasMany(RecipientList::class);
    }

    public function tags(): MorphToMany {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    // TODO: Add default option for user
    public function getDefaultRecipientListAttribute() {
        return $this->recipientLists[0];
    }
}
