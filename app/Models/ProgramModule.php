<?php

namespace App\Models;

use App\Mail\ProgramModuleMailer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

/**
 * App\Models\ProgramModule
 *
 * @property string $id
 * @property string|null $program_id
 * @property string|null $module_id
 * @property string|null $folder
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Module|null $module
 * @property-read \App\Models\Program|null $program
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ModuleReminder[] $reminders
 * @property-read int|null $reminders_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProgramModuleSend[] $sends
 * @property-read int|null $sends_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ModuleTrigger[] $triggers
 * @property-read int|null $triggers_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModule onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereFolder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModule withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModule withoutTrashed()
 * @mixin \Eloquent
 */
class ProgramModule extends Pivot
{
    use SoftDeletes;

    protected $table = "program_modules";
    protected $guarded = [];
    protected $attributes = [
        'folder' => '',
        'order' => 0
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function (ProgramModule $programModule) {
            if ($programModule->order === null) {
                $amount = ProgramModule::where('program_id', $programModule->program_id)
                    ->select(DB::raw('max("order") as m'))
                    ->get()
                    ->first()
                    ->toArray();
                $programModule->order = $amount['m'] == null ? 0 : $amount['m'] + 1;
            }
        });
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function sends(): HasMany
    {
        return $this->hasMany(ProgramModuleSend::class);
    }

    public function sendModule(LearnerProfile $l, string $reason, string $channel, string $subject = "", string $message = "")
    {
        $pms = new ProgramModuleSend();
        $pms->fill([
            'program_module_id' => $this->id,
            'learner_profile_id' => $l->id,
            'reason' => $reason,
            'channel' => $channel,
            'subject' => $subject,
            'message' => $message
        ]);
        $pms->save();
        $pms->send();
    }
}
