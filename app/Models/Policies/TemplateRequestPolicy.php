<?php

namespace App\Policies;

use App\Models\TemplateRequest;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TemplateRequestPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any template requests.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the template request.
     *
     * @param  User  $user
     * @param  TemplateRequest  $templateRequest
     * @return mixed
     */
    public function view(User $user, TemplateRequest $templateRequest)
    {
        //
    }

    /**
     * Determine whether the user can create template requests.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the template request.
     *
     * @param  User  $user
     * @param  TemplateRequest  $templateRequest
     * @return mixed
     */
    public function update(User $user, TemplateRequest $templateRequest)
    {
        //
    }

    /**
     * Determine whether the user can delete the template request.
     *
     * @param  User  $user
     * @param  TemplateRequest  $templateRequest
     * @return mixed
     */
    public function delete(User $user, TemplateRequest $templateRequest)
    {
        //
    }

    /**
     * Determine whether the user can restore the template request.
     *
     * @param  User  $user
     * @param  TemplateRequest  $templateRequest
     * @return mixed
     */
    public function restore(User $user, TemplateRequest $templateRequest)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the template request.
     *
     * @param  User  $user
     * @param  TemplateRequest  $templateRequest
     * @return mixed
     */
    public function forceDelete(User $user, TemplateRequest $templateRequest)
    {
        //
    }
}
