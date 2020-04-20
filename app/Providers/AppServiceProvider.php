<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\ModelObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() === 'local') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
        $this->app->register(TelescopeServiceProvider::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // TODO: This doesn't belong here
        Validator::extend('password_match', function (
            $attribute, $value, $parameters, \Illuminate\Validation\Validator $validator
        ) {
            /** @var User $user */
            $user = auth()->user();
            $validator->setCustomMessages(['password_match' => 'Please enter correct current password']);
            if ($user) {
                $current_password = $user->password;
                return Hash::check($value, $current_password);
            }

            return false;
        });
    }
}
