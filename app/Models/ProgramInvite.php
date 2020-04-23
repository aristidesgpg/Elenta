<?php

namespace App\Models;

use App\Mail\ProgramInviteMail;
use App\Mail\ProgramModuleTriggerMail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Mail;

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
 * @property string $user_id
 * @property-read \App\Models\User $creator
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramInvite whereUserId($value)
 */
class ProgramInvite extends BaseModel
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();
        static::saved(function (ProgramInvite $pi) {
            $pi->send();
        });
    }

    public function program(): BelongsTo {
        return $this->belongsTo(Program::class);
    }

    public function learner(): BelongsTo {
        return $this->belongsTo(LearnerProfile::class, 'learner_profile_id');
    }

    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function send() {
        Mail::to($this->creator->email)->send(new ProgramInviteMail($this));
    }
}
