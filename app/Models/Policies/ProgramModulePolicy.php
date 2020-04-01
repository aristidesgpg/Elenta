<?php

namespace App\Policies;

use App\Models\ProgramModule;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProgramModulePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any program modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the program module.
     *
     * @param  User  $user
     * @param  ProgramModule  $programModule
     * @return mixed
     */
    public function view(User $user, ProgramModule $programModule)
    {
        return $user->id == $programModule->program->owner->user_id
            || $programModule->program->learners->pluck('user_id')->contains($user->id);
    }

    /**
     * Determine whether the user can create program modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the program module.
     *
     * @param  User  $user
     * @param  ProgramModule  $programModule
     * @return mixed
     */
    public function update(User $user, ProgramModule $programModule)
    {
        return $user->id == $programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can delete the program module.
     *
     * @param  User  $user
     * @param  ProgramModule  $programModule
     * @return mixed
     */
    public function delete(User $user, ProgramModule $programModule)
    {
        return $user->id == $programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can restore the program module.
     *
     * @param  User  $user
     * @param  ProgramModule  $programModule
     * @return mixed
     */
    public function restore(User $user, ProgramModule $programModule)
    {
        return $user->id == $programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can permanently delete the program module.
     *
     * @param  User  $user
     * @param  ProgramModule  $programModule
     * @return mixed
     */
    public function forceDelete(User $user, ProgramModule $programModule)
    {
        return $user->id == $programModule->program->owner->user_id;
    }
}
