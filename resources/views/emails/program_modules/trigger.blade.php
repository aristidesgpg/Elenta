@component('mail::message')

Hey {$programModule->learner->user->firstName()},

It's time to complete {{$programModuleSend->programModule->module->title}} from {{$programModuleSend->programModule->program->title}}. Click the button below:

@component('mail::button', ['url' => $programModuleSend->respondUrl()])
View
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
