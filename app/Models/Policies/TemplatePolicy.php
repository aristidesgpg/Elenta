<?php

namespace App\Policies;

use App\Models\Template;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TemplatePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any templates.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function view(User $user, Template $template)
    {
        //
    }

    /**
     * Determine whether the user can create templates.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function update(User $user, Template $template)
    {
        //
    }

    /**
     * Determine whether the user can delete the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function delete(User $user, Template $template)
    {
        //
    }

    /**
     * Determine whether the user can restore the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function restore(User $user, Template $template)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function forceDelete(User $user, Template $template)
    {
        //
    }
}
