<?php

return[
    'user_model'          => env('LPL_USER_MODEL', 'App\User'),
    'user_guard'          => env('LPL_USER_GUARD', 'web'),
    'remember_login'      => env('LPL_REMEMBER_LOGIN', true),
    'login_route'         => env('LPL_LOGIN_ROUTE', '/passwordless'),
    'login_route_name'    => env('LPL_LOGIN_ROUTE_NAME', 'passwordless'),
    'login_route_expires' => env('LPL_LOGIN_ROUTE_EXPIRES', '30'),
    'redirect_on_success' => env('LPL_REDIRECT_ON_LOGIN', '/'),
];
