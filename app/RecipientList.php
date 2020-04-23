<?php

namespace App;

use App\Models\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class RecipientList extends Model
{
    use UsesUuid;

    public const CHANNEL_EMAIL = 'EMAIL';
    public const CHANNELS = [self::CHANNEL_EMAIL];

    protected $guarded = [];
}
