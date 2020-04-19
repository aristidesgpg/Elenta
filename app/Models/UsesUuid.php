<?php
namespace App\Models;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

trait UsesUuid
{
    protected static function bootUsesUuid()
    {
        static::creating(function (BaseModel $model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
