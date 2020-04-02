<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix' => '/login/{provider}',
    'namespace' => 'Auth'
], function () {
    Route::get('', 'LoginController@redirectToProvider');
    Route::get('callback', 'LoginController@handleProviderCallback');
});

Auth::routes();
