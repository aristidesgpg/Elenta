<?php

namespace App\Models;

use App\Mail\ProgramModuleMailer;
use App\RecipientList;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
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
 * @property-read \App\Models\ProgramModuleSend $send
 * @property-read mixed $module_variables
 */
class ProgramModule extends BasePivot
{
    use SoftDeletes;

    protected $table = "program_modules";
    protected $guarded = [];
    protected $appends = ['module_variables'];
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
                //$programModule->recipient_list_id = $programModule->program->default_recipient_list->id;
            }
        });
    }

    /**
     * Return a list of variables that can be used in the conditions
     * or text fields of the associated module. These are the input fields
     * from other modules in the same program, which have been sent before this one.
     */
    public function getModuleVariablesAttribute() {
        return "{}";
        $result = [];
        /** @var ProgramModule $this_pm */
        $this_pm = $this;
        // TODO: add filter for programs that are running after
        $this->program->programModules->filter(function(ProgramModule $pm) use ($this_pm) {
            return Carbon::parse($pm->module->trigger->start_timestamp)->lte($this_pm->start_timestamp);
        })->each(function (ProgramModule $pm) use ($result) {
                $content = json_decode($pm->module->content);
                // TODO: make sure input fields, get type of input field, get possible values for input field
                if ($schema = $content['schema']) {
                    foreach ($schema['properties'] as $field => $props) {
                        $result[] = [
                            'program_module_id' => $pm->id,
                            'field_name' => $field,
                            'type' => $props['type'],
                            'available_values' => ['a', 'b']
                        ];
                    }
                }
            });
        return $result;
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function send(): HasOne
    {
        return $this->hasOne(ProgramModuleSend::class, 'program_module_id');
    }

    public function recipientList(): BelongsTo {
        return $this->belongsTo(RecipientList::class);
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
