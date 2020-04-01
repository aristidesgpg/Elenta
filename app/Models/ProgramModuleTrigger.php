<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ProgramModuleTrigger
 *
 * @property string $id
 * @property string $program_module_id
 * @property string|null $start_timestamp
 * @property string|null $start_timestamp_field
 * @property int $frequency
 * @property int $max_sends
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Module $module
 * @property-read \App\Models\ProgramModule $programModule
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleTrigger onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereMaxSends($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereProgramModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereStartTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereStartTimestampField($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProgramModuleTrigger whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleTrigger withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ProgramModuleTrigger withoutTrashed()
 * @mixin \Eloquent
 */
class ProgramModuleTrigger extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function programModule(): BelongsTo {
        return $this->belongsTo(ProgramModule::class);
    }
}
