<?php

namespace App\Policies;

use App\Models\Module;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ModulePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the module.
     *
     * @param  User  $user
     * @param  Module  $module
     * @return mixed
     */
    public function view(User $user, Module $module)
    {
        //
    }

    /**
     * Determine whether the user can create modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the module.
     *
     * @param  User  $user
     * @param  Module  $module
     * @return mixed
     */
    public function update(User $user, Module $module)
    {
        //
    }

    /**
     * Determine whether the user can delete the module.
     *
     * @param  User  $user
     * @param  Module  $module
     * @return mixed
     */
    public function delete(User $user, Module $module)
    {
        //
    }

    /**
     * Determine whether the user can restore the module.
     *
     * @param  User  $user
     * @param  Module  $module
     * @return mixed
     */
    public function restore(User $user, Module $module)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the module.
     *
     * @param  User  $user
     * @param  Module  $module
     * @return mixed
     */
    public function forceDelete(User $user, Module $module)
    {
        //
    }
}
