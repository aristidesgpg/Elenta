<?php

namespace App\Models;

use App\RecipientList;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Signifly\PivotEvents\HasPivotEvents;

/**
 * App\Models\TemplateModule
 *
 * @property string $id
 * @property string|null $template_id
 * @property string|null $module_id
 * @property string|null $folder
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Module|null $module
 * @property-read \App\Models\Template|null $template
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TemplateModule onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereFolder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TemplateModule withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TemplateModule withoutTrashed()
 * @mixin \Eloquent
 * @property string|null $recipient_list_id
 * @property-read mixed $module_variables
 * @property-read \App\RecipientList|null $recipientList
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\TemplateModule whereRecipientListId($value)
 */
class TemplateModule extends BasePivot
{
    use SoftDeletes;

    protected $casts = [
        'id' => 'string'
    ];
    protected $table = "template_modules";
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
        static::creating(function (TemplateModule $templateModule) {
            if ($templateModule->order === null) {
                $amount = TemplateModule::where('template_id', $templateModule->template_id)
                    ->select(DB::raw('max("order") as m'))
                    ->get()
                    ->first()
                    ->toArray();
                $templateModule->order = $amount['m'] == null ? 0 : $amount['m'] + 1;
            }
            if ($templateModule->template->recipientLists->count() > 0) {
                $templateModule->recipient_list_id = $templateModule->template->default_recipient_list->id;
            }
        });
    }

    /**
     * Return a list of variables that can be used in the conditions
     * or text fields of the associated module. These are the input fields
     * from other modules in the same template, which have been sent before this one.
     */
    public function getModuleVariablesAttribute() {        
        $result = array();
        /** @var TemplateModule $this_tm */
        $this_tm = $this;
        // TODO: add filter for templates that are running after        
        $filtered_tms = $this->template->templateModules->filter(function(TemplateModule $tm) use ($this_tm) {
            return Carbon::parse($tm->module->trigger->start_timestamp)->lte($this_tm->start_timestamp);
        });//* Robert Should remove this comment*/        
        foreach($filtered_tms as $tm){       
            try{
                $content = json_decode($tm->module->content, true);            
                // TODO: make sure input fields, get type of input field, get possible values for input field                                                         
                if ($schema = $content['schema']) {  
                    $uiSchema = $content['uiSchema'];
                    $items = array();                                  
                    foreach ($schema['properties'] as $field => $props) {                                                
                        $items[] = [   
                            'parentId' => $tm->id,                         
                            'label' => $field,
                            'fieldType' => $uiSchema[$field]['uiType']                            
                        ];//'availableValues' => ['a', 'b']
                    }
                    if(count($items) > 0){
                        $result[] = [
                            'id' => $tm->id,
                            'label' => $tm->module->title,
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

    public function module(): BelongsTo {
        return $this->belongsTo(Module::class);
    }

    public function template(): BelongsTo {
        return $this->belongsTo(Template::class);
    }

    public function recipientList(): BelongsTo {
        return $this->belongsTo(RecipientList::class);
    }
}
