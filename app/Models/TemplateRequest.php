<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\TemplateRequest
 *
 * @property string $id
 * @property string $template_id
 * @property string|null $learner_profile_id
 * @property string $email
 * @property string|null $organization
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\LearnerProfile $learner
 * @property-read \App\Models\Template $template
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TemplateRequest onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereLearnerProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereOrganization($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TemplateRequest withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TemplateRequest withoutTrashed()
 * @mixin \Eloquent
 */
class TemplateRequest extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function template(): BelongsTo {
        return $this->belongsTo(Template::class);
    }

    public function learner(): BelongsTo {
        return $this->belongsTo(LearnerProfile::class, 'learner_profile_id');
    }
}
