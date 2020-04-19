<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ProgramLearner
 *
 * @property string $id
 * @property string $program_id
 * @property string $learner_profile_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\User $learner
 * @property-read \App\Models\Program $program
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramLearner onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner whereLearnerProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner whereProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramLearner whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramLearner withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramLearner withoutTrashed()
 * @mixin \Eloquent
 */
class ProgramLearner extends BaseModel
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function program(): BelongsTo {
        return $this->belongsTo(Program::class);
    }

    public function learner(): BelongsTo {
        return $this->belongsTo(LearnerProfile::class, 'learner_profile_id');
    }
}
