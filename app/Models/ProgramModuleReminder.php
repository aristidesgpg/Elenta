<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ProgramModuleReminder
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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleReminder onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereMaxReminders($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereProgramModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleReminder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleReminder withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleReminder withoutTrashed()
 * @mixin \Eloquent
 */
class ProgramModuleReminder extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public const TYPES = ['MANUAL', 'AUTOMATED'];

    public function programModule(): BelongsTo {
        return $this->belongsTo(ProgramModule::class);
    }
}
