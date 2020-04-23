<?php

namespace App\Policies;

use App\Models\ProgramModuleSend;
use App\Models\TemplateModule;
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
        return false;
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
        return $user->id == $programModuleSend->learner->user_id
            || $user->id == $programModuleSend->programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can create program module sends.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
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
        return $user->id == $programModuleSend->learner->user_id;
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
        return $user->id == $programModuleSend->programModule->program->owner->user_id;
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
        return $user->id == $programModuleSend->programModule->program->owner->user_id;
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
        return false;
    }

    public function upsert(User $user, array $args) {
        if ($args['id']) {
            return $user->can('update', ProgramModuleSend::find($args['id']));
        } else {
            return $user->can('create');
        }
    }
}
