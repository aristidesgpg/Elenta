<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// TODO: Hack to make BrowserRoutes work with react-router
Route::fallback(function () {
    return view('index');
});
Route::view('/{any?}', 'index');

Route::group([
    'prefix' => '/login/{provider}',
    'namespace' => 'Auth'
], function () {
    Route::get('', 'LoginController@redirectToProvider');
    Route::get('/callback', 'LoginController@handleProviderCallback');
});

Route::group([
    'prefix' => '/webhook',
    'namespace' => '\App\Http\Controllers'
], function () {
    Route::get('/elenta-ses-events', 'WebhookController@handleElentaSesEvent');
});
Auth::routes();
