<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ProgramInvite
 *
 * @property string $id
 * @property string $program_id
 * @property string|null $learner_profile_id
 * @property string $email
 * @property string $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\LearnerProfile $learner
 * @property-read \App\Models\Program $program
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramInvite onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereLearnerProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramInvite withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramInvite withoutTrashed()
 * @mixin \Eloquent
 */
class ProgramInvite extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function program() {
        return $this->belongsTo(Program::class);
    }

    public function learner() {
        return $this->belongsTo(LearnerProfile::class, 'learner_profile_id');
    }

    public function creator() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
