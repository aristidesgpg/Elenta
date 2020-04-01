<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\LearnerProfile
 *
 * @property string $id
 * @property string $user_id
 * @property string|null $picture_url
 * @property string|null $role
 * @property string|null $tenure
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Module[] $modules
 * @property-read int|null $modules_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Program[] $programs
 * @property-read int|null $programs_count
 * @property-read \App\Models\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LearnerProfile onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile wherePictureUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile whereTenure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\LearnerProfile whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LearnerProfile withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LearnerProfile withoutTrashed()
 * @mixin \Eloquent
 */
class LearnerProfile extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function programs() {
        return $this->belongsToMany(Program::class, 'program_learners');
    }

    public function programModules() {
        return $this->belongsToMany(ProgramModule::class, 'program_module_sends');
    }
}
