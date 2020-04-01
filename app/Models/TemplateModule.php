<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
class TemplateModule extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function module() {
        return $this->belongsTo(Module::class);
    }

    public function template() {
        return $this->belongsTo(Template::class);
    }
}
