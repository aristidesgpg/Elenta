<?php

namespace App\GraphQL\Directives;

use Illuminate\Validation\Rule;
use Nuwave\Lighthouse\Schema\Directives\ValidationDirective;

class UpdateLearnerProfileDirective extends ValidationDirective
{
    /**
     * @return mixed[]
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'exists:learner_profiles,id'],
            'name' => ['required', 'string'],
            'email' => ['required', Rule::unique('users', 'email')->ignore($this->args['user_id'], 'id')],
            'role' => ['required', 'string'],
            'tenure' => ['required', 'string'],
            'old_password' => ['required_with:password', 'string', 'password_match'],
            'password' => ['required_with:old_password', 'string', 'min:6', 'max:16', 'confirmed'],
        ];
    }
}
