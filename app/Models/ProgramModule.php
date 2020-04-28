<?php

namespace App\Models;

use App\Mail\ProgramModuleMailer;
use App\RecipientList;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
 * @property string|null $recipient_list_id
 * @property-read \App\RecipientList|null $recipientList
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModule whereRecipientListId($value)
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
            }
        });

        static::created(function (ProgramModule $programModule) {
            if ($programModule->program->default_recipient_list) {
                $programModule->recipient_list_id = $programModule->program->default_recipient_list->id;
                $programModule->save();
            }
        });
    }

    /**
     * Return a list of variables that can be used in the conditions
     * or text fields of the associated module. These are the input fields
     * from other modules in the same program, which have been sent before this one.
     */
    public function getModuleVariablesAttribute() {
        if (!$this->program) {
            return "{}";
        }
        $result = [];
        /** @var ProgramModule $this_pm */
        $this_pm = $this;
        /*
        $filtered_pms = $this->program->programModules->filter(function(ProgramModule $pm) use ($this_pm) {
            return Carbon::parse($pm->module->trigger->start_timestamp)->lte($this_pm->start_timestamp);
        });
         */
        $filtered_pms = $this->program->programModules;
        foreach($filtered_pms as $pm){
            try{
                $content = json_decode($pm->module->content, true);
                // TODO: make sure input fields, get type of input field, get possible values for input field
                if ($schema = $content['schema']) {
                    $uiSchema = $content['uiSchema'];
                    $items = array();
                    foreach ($schema['properties'] as $field => $props) {
                        $items[] = [
                            'parentId' => $pm->id,
                            'id' => $field,
                            'label' => $field,
                            'fieldType' => $uiSchema[$field]['uiType']
                        ];//'availableValues' => ['a', 'b']
                    }
                    if(count($items) > 0){
                        $result[] = [
                            'id' => $pm->id,
                            'label' => $pm->module->title,
                            'items' => $items
                        ];
                    }
                }
            }
            catch(Exception $error){
                Log::error($error);
            }
        }
        return json_encode($result);
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
        return $this->hasMany(ProgramModuleSend::class, 'program_module_id');
    }

    public function recipientList(): BelongsTo {
        return $this->belongsTo(RecipientList::class);
    }

    public function sendModule(LearnerProfile $l, string $reason, string $channel, string $subject = "", string $message = "")
    {
        if (!$this->sends()->where('learner_profile_id', $l->id)->exists()) {
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
        } else {
            /** @var ProgramModuleSend $existing */
            $existing = $this->sends()->where('learner_profile_id', $l->id)->first();
            $existing->last_reminded_at = Carbon::now();
            $existing->save();
        }
    }
}
