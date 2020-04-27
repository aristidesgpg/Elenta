@component('mail::message')
Hey there!
You've been invited to enrol in {{$programInvite->program->title}} by {{$programInvite->creator->name}}

@component('mail::button', ['url' => env('APP_URL') . "/login"])
Enrol Now!
@endcomponent

Thanks,
{{ config('app.name') }}
@endcomponent
