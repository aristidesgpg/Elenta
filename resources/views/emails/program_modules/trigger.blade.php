@component('mail::message')

Hey {$programModule->learner->user->firstName()},

It's time to complete {{$programModule->module->title}} from {{$programModule->program->title}}. Click the button below:

@component('mail::button', ['url' => $programModule->respondUrl()])
View
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
