<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\BaseModel
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BaseModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BaseModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BaseModel query()
 * @mixin \Eloquent
 */
class BaseModel extends Model {
    /*
    protected static function booted() {
        static::retrieved(function (BaseModel $model) {
            if (!Auth::user()->can('view', $model)) {
                // TODO: Something secure
            }
        });
    }

    final public function newCollection(array $models = []) {
        return collect($models)->filter(function (Model $m) {
            return Auth::user()->can('view', $m);
        });
    }*/
}
