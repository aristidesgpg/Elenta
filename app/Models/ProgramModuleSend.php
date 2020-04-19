<?php

namespace App\Models;

use App\Mail\ProgramModuleMailer;
use App\Mail\ProgramModuleTriggerMail;
use Grosv\LaravelPasswordlessLogin\LoginUrl;
use Grosv\LaravelPasswordlessLogin\PasswordlessLogin;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

/**
 * App\Models\ProgramModuleSend
 *
 * @property string $id
 * @property string $program_module_id
 * @property string $learner_profile_id
 * @property string $reason
 * @property string $channel
 * @property string $subject
 * @property string $message
 * @property string $send_timestamp
 * @property string $open_timestamp
 * @property string $click_timestamp
 * @property string $response_timestamp
 * @property string|null $response_feedback
 * @property int $response_rating
 * @property mixed $response_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Module $module
 * @property-read \App\Models\ProgramModule $programModule
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleSend onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereChannel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereClickTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereLearnerProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereOpenTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereProgramModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereResponseData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereResponseFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereResponseRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereResponseTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereSendTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleSend whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleSend withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleSend withoutTrashed()
 * @mixin \Eloquent
 * @property-read \App\Models\LearnerProfile $learner
 */
class ProgramModuleSend extends BaseModel
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public const REASON_MANUAL = 'MANUAL';
    public const REASON_TRIGGER = 'TRIGGER';
    public const REASON_REMINDER = 'REMINDER';
    public const REASONS = [self::REASON_MANUAL, self::REASON_TRIGGER, self::REASON_REMINDER];

    public const CHANNEL_EMAIL = 'EMAIL';
    public const CHANNELS = [self::CHANNEL_EMAIL];

    protected static function boot()
    {
        parent::boot();
        // Only the learner should update this object, and the first time they do it is their response
        static::updating(function (ProgramModuleSend $pms) {
            if (!$pms->response_timestamp) {
                $pms->response_timestamp = Carbon::now();
            } else {
                // Can't update response_data later
                $pms->response_data = $pms->getOriginal('response_data');
            }
        });
    }

    public function programModule(): BelongsTo {
        return $this->belongsTo(ProgramModule::class);
    }

    public function learner(): BelongsTo {
        return $this->belongsTo(LearnerProfile::class, 'learner_profile_id');
    }

    public function send() {
        if (!$this->send_timestamp) {
            Mail::to($this->learner->user->email)->send(new ProgramModuleTriggerMail($this->programModule));
        }
    }

    public function respondUrl() {
        $generator = new LoginUrl($this->learner->user);
        $generator->setRedirectUrl(config(env('APP_URL'))."/learner/module/{$this->programModule->module->id}");
        return $generator->generate();
    }
}
