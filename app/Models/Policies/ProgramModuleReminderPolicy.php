<?php

namespace App\Policies;

use App\Models\ProgramModuleReminder;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProgramModuleReminderPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any program module reminders.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the program module reminder.
     *
     * @param  User  $user
     * @param  ProgramModuleReminder  $programModuleReminder
     * @return mixed
     */
    public function view(User $user, ProgramModuleReminder $programModuleReminder)
    {
        return $user->id == $programModuleReminder->programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can create program module reminders.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the program module reminder.
     *
     * @param  User  $user
     * @param  ProgramModuleReminder  $programModuleReminder
     * @return mixed
     */
    public function update(User $user, ProgramModuleReminder $programModuleReminder)
    {
        return $user->id == $programModuleReminder->programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can delete the program module reminder.
     *
     * @param  User  $user
     * @param  ProgramModuleReminder  $programModuleReminder
     * @return mixed
     */
    public function delete(User $user, ProgramModuleReminder $programModuleReminder)
    {
        return $user->id == $programModuleReminder->programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can restore the program module reminder.
     *
     * @param  User  $user
     * @param  ProgramModuleReminder  $programModuleReminder
     * @return mixed
     */
    public function restore(User $user, ProgramModuleReminder $programModuleReminder)
    {
        return $user->id == $programModuleReminder->programModule->program->owner->user_id;
    }

    /**
     * Determine whether the user can permanently delete the program module reminder.
     *
     * @param  User  $user
     * @param  ProgramModuleReminder  $programModuleReminder
     * @return mixed
     */
    public function forceDelete(User $user, ProgramModuleReminder $programModuleReminder)
    {
        return $user->id == $programModuleReminder->programModule->program->owner->user_id;
    }
}
