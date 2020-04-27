<?php

namespace App;

use App\Models\LearnerProfile;
use App\Models\Program;
use App\Models\ProgramInvite;
use App\Models\ProgramModule;
use App\Models\Template;
use App\Models\UsesUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RecipientList extends Model {
    use UsesUuid;

    public const CHANNEL_EMAIL = 'EMAIL';
    public const CHANNELS = [self::CHANNEL_EMAIL];

    protected $guarded = [];

    public function template(): BelongsTo {
        return $this->belongsTo(Template::class);
    }

    public function program(): BelongsTo {
        return $this->belongsTo(Program::class);
    }

    public function invites(): HasMany {
        return $this->hasMany(ProgramInvite::class);
    }

    public function recipients(): BelongsToMany {
        return $this->belongsToMany(LearnerProfile::class, 'program_invites');
    }
}
