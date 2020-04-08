<?php

namespace App\Policies;

use App\Models\Program;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProgramPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any programs.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return mixed
     */
    public function view(User $user, Program $program)
    {
        return $program->is_public
            || $user->id == $program->owner->user_id
            || $program->learners->pluck('user_id')->contains($user->id);
    }

    /**
     * Determine whether the user can create programs.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return mixed
     */
    public function update(User $user, Program $program)
    {
        return $user->id == $program->owner->user_id;
    }

    /**
     * Determine whether the user can delete the program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return mixed
     */
    public function delete(User $user, Program $program)
    {
        return $user->id == $program->owner->user_id;
    }

    /**
     * Determine whether the user can restore the program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return mixed
     */
    public function restore(User $user, Program $program)
    {
        return $user->id == $program->owner->user_id;
    }

    /**
     * Determine whether the user can permanently delete the program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return mixed
     */
    public function forceDelete(User $user, Program $program)
    {
        return $user->id == $program->owner->user_id;
    }
}
