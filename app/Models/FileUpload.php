<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class FileUpload extends Model
{
    use SoftDeletes;

    public function owner(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
}
