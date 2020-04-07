<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ModuleReminder
 *
 * @property string $id
 * @property string $program_module_id
 * @property string $type
 * @property string $subject
 * @property string $message
 * @property int $frequency
 * @property int $max_reminders
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Module $module
 * @property-read \App\Models\ProgramModule $programModule
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ModuleReminder onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereMaxReminders($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereProgramModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ModuleReminder withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ModuleReminder withoutTrashed()
 * @mixin \Eloquent
 * @property string $module_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleReminder whereModuleId($value)
 */
class ModuleReminder extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    //TODO: Remove types
    public const TYPES = ['MANUAL', 'AUTOMATED'];

    public function module(): BelongsTo {
        return $this->belongsTo(Module::class);
    }
}
