<?php

namespace App\GraphQL\Directives;

use Illuminate\Validation\Rule;
use Nuwave\Lighthouse\Schema\Directives\ValidationDirective;

class UpdateConsultantProfileDirective extends ValidationDirective
{
    /**
     * @return mixed[]
     */
    public function rules(): array
    {
        return [
            'id' => ['required'],
            'name' => ['required', 'string'],
            'email' => ['required', Rule::unique('users', 'email')->ignore($this->args['id'], 'id')],
            'bio' => ['required', 'string'],
            'title' => ['required', 'string'],
            'old_password' => ['required_with:password', 'string', 'password_match'],
            'password' => ['required_with:old_password', 'string', 'min:6', 'max:16', 'confirmed'],
        ];
    }
}
