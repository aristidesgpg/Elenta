<?php

namespace App\Policies;

use App\Models\TemplateModule;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TemplateModulePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any template modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function view(User $user, TemplateModule $templateModule)
    {
        //
    }

    /**
     * Determine whether the user can create template modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function update(User $user, TemplateModule $templateModule)
    {
        //
    }

    /**
     * Determine whether the user can delete the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function delete(User $user, TemplateModule $templateModule)
    {
        //
    }

    /**
     * Determine whether the user can restore the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function restore(User $user, TemplateModule $templateModule)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function forceDelete(User $user, TemplateModule $templateModule)
    {
        //
    }
}
