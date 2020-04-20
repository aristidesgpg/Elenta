<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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
