<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProgramModuleReminder[] $reminders
 * @property-read int|null $reminders_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProgramModuleSend[] $sends
 * @property-read int|null $sends_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProgramModuleTrigger[] $triggers
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
class ProgramModule extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function program() {
        return $this->belongsTo(Program::class);
    }

    public function module() {
        return $this->belongsTo(Module::class);
    }

    public function reminders() {
        return $this->hasMany(ProgramModuleReminder::class);
    }

    public function triggers() {
        return $this->hasMany(ProgramModuleTrigger::class);
    }

    public function sends() {
        return $this->hasMany(ProgramModuleSend::class);
    }
}
