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
    
    protected static function booted() {
        
    }

    final public function newCollection(array $models = []) {
        return collect($models)->filter(function (Model $m) {
            return Auth::user()->can('view', $m);
        });
    }
}
