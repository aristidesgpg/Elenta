<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ModuleTrigger
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
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ModuleTrigger onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereMaxSends($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereProgramModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereStartTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereStartTimestampField($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ModuleTrigger withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ModuleTrigger withoutTrashed()
 * @mixin \Eloquent
 * @property string $module_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ModuleTrigger whereModuleId($value)
 */
class ModuleTrigger extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function module(): BelongsTo {
        return $this->belongsTo(Module::class);
    }
}
