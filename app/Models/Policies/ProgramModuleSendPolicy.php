<?php

namespace App\Policies;

use App\Models\ProgramModuleSend;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProgramModuleSendPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any program module sends.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the program module send.
     *
     * @param  User  $user
     * @param  ProgramModuleSend  $programModuleSend
     * @return mixed
     */
    public function view(User $user, ProgramModuleSend $programModuleSend)
    {
        //
    }

    /**
     * Determine whether the user can create program module sends.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the program module send.
     *
     * @param  User  $user
     * @param  ProgramModuleSend  $programModuleSend
     * @return mixed
     */
    public function update(User $user, ProgramModuleSend $programModuleSend)
    {
        //
    }

    /**
     * Determine whether the user can delete the program module send.
     *
     * @param  User  $user
     * @param  ProgramModuleSend  $programModuleSend
     * @return mixed
     */
    public function delete(User $user, ProgramModuleSend $programModuleSend)
    {
        //
    }

    /**
     * Determine whether the user can restore the program module send.
     *
     * @param  User  $user
     * @param  ProgramModuleSend  $programModuleSend
     * @return mixed
     */
    public function restore(User $user, ProgramModuleSend $programModuleSend)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the program module send.
     *
     * @param  User  $user
     * @param  ProgramModuleSend  $programModuleSend
     * @return mixed
     */
    public function forceDelete(User $user, ProgramModuleSend $programModuleSend)
    {
        //
    }
}
