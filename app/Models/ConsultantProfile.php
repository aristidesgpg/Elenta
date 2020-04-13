<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\ConsultantProfile
 *
 * @property string $id
 * @property string $user_id
 * @property string|null $picture_url
 * @property string|null $title
 * @property string|null $bio
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Program[] $programs
 * @property-read int|null $programs_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Template[] $templates
 * @property-read int|null $templates_count
 * @property-read \App\Models\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ConsultantProfile onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile wherePictureUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ConsultantProfile withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ConsultantProfile withoutTrashed()
 * @mixin \Eloquent
 * @property bool $is_public
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ConsultantProfile whereIsPublic($value)
 */
class ConsultantProfile extends Model
{
    use SoftDeletes;
    use UsesUuid;

    protected $guarded = [];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function templates(): HasMany {
        return $this->hasMany(Template::class);
    }

    public function programs(): HasMany {
        return $this->hasMany(Program::class);
    }

    function getPictureUrlAttribute($path)
    {
        //TODO: temporary until we have permanent file storage solution
        return $path;
        if (stripos($path, 'https://') !== 0 && stripos($path, 'http://') !== 0) {
            if (config('filesystems.cloud') === 'public') {
                $path = Storage::disk(config('filesystems.cloud'))->url($path);
            } else {
                $path = Storage::disk(config('filesystems.cloud'))->temporaryUrl($path, now()->addDay(2));
            }
        }

        return $path;
    }
}
