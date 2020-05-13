<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToProvider(String $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(String $provider)
    {
        $user = Socialite::driver($provider)->user();
        /** @var User $existing_user */
        $existing_user = User::whereEmail($user->getEmail())->first();

        if (!isset($existing_user)) {
            $existing_user = User::create([
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'password' => Hash::make(Str::random())
            ]);

            $existing_user->consultantProfile()->create([
                'picture_url' => $user->getAvatar()
            ]);
        }
        $token = $existing_user->createToken('default')->plainTextToken;
        $uri = "/login/callback/$token";
        return redirect($uri);
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $token = Auth::user()->createToken('default')->plainTextToken;
        return compact("token");
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials))
         {
            return redirect()->intended('app');
        }
    }
}

