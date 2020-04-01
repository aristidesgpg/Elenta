<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
 * @property-read \App\Models\LearnerProfile $recipients
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
 */
class ProgramModuleSend extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public const REASONS = ['MANUAL', 'TRIGGER', 'REMINDER'];
    public const CHANNELS = ['EMAIL', 'SLACK'];


    public function programModule() {
        return $this->belongsTo(ProgramModule::class);
    }

    public function learner() {
        return $this->belongsTo(LearnerProfile::class, 'learner_profile_id');
    }
}
