<?php

namespace App\Policies;

use App\Models\ProgramModuleTrigger;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProgramModuleTriggerPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any program module triggers.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the program module trigger.
     *
     * @param  User  $user
     * @param  ProgramModuleTrigger  $programModuleTrigger
     * @return mixed
     */
    public function view(User $user, ProgramModuleTrigger $programModuleTrigger)
    {
        //
    }

    /**
     * Determine whether the user can create program module triggers.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the program module trigger.
     *
     * @param  User  $user
     * @param  ProgramModuleTrigger  $programModuleTrigger
     * @return mixed
     */
    public function update(User $user, ProgramModuleTrigger $programModuleTrigger)
    {
        //
    }

    /**
     * Determine whether the user can delete the program module trigger.
     *
     * @param  User  $user
     * @param  ProgramModuleTrigger  $programModuleTrigger
     * @return mixed
     */
    public function delete(User $user, ProgramModuleTrigger $programModuleTrigger)
    {
        //
    }

    /**
     * Determine whether the user can restore the program module trigger.
     *
     * @param  User  $user
     * @param  ProgramModuleTrigger  $programModuleTrigger
     * @return mixed
     */
    public function restore(User $user, ProgramModuleTrigger $programModuleTrigger)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the program module trigger.
     *
     * @param  User  $user
     * @param  ProgramModuleTrigger  $programModuleTrigger
     * @return mixed
     */
    public function forceDelete(User $user, ProgramModuleTrigger $programModuleTrigger)
    {
        //
    }
}
