<?php

namespace App\Policies;

use App\Models\ProgramInvite;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProgramInvitePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any program invites.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the program invite.
     *
     * @param  User  $user
     * @param  ProgramInvite  $programInvite
     * @return mixed
     */
    public function view(User $user, ProgramInvite $programInvite)
    {
        //
    }

    /**
     * Determine whether the user can create program invites.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the program invite.
     *
     * @param  User  $user
     * @param  ProgramInvite  $programInvite
     * @return mixed
     */
    public function update(User $user, ProgramInvite $programInvite)
    {
        //
    }

    /**
     * Determine whether the user can delete the program invite.
     *
     * @param  User  $user
     * @param  ProgramInvite  $programInvite
     * @return mixed
     */
    public function delete(User $user, ProgramInvite $programInvite)
    {
        //
    }

    /**
     * Determine whether the user can restore the program invite.
     *
     * @param  User  $user
     * @param  ProgramInvite  $programInvite
     * @return mixed
     */
    public function restore(User $user, ProgramInvite $programInvite)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the program invite.
     *
     * @param  User  $user
     * @param  ProgramInvite  $programInvite
     * @return mixed
     */
    public function forceDelete(User $user, ProgramInvite $programInvite)
    {
        //
    }
}
