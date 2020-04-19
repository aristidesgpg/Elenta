<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
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
 */
class TemplateModule extends BasePivot
{
    use SoftDeletes;

    protected $casts = [
        'id' => 'string'
    ];
    protected $table = "template_modules";
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
        static::creating(function (TemplateModule $templateModule) {
            if ($templateModule->order === null) {
                $amount = TemplateModule::where('template_id', $templateModule->template_id)
                    ->select(DB::raw('max("order") as m'))
                    ->get()
                    ->first()
                    ->toArray();
                $templateModule->order = $amount['m'] == null ? 0 : $amount['m'] + 1;
            }
        });
    }

    public function module(): BelongsTo {
        return $this->belongsTo(Module::class);
    }

    public function template(): BelongsTo {
        return $this->belongsTo(Template::class);
    }
}
