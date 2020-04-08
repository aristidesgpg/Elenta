<?php

namespace App\Policies;

use App\Models\ModuleTrigger;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ModuleTriggerPolicy
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
     * @param  ModuleTrigger  $moduleTrigger
     * @return mixed
     */
    public function view(User $user, ModuleTrigger $moduleTrigger)
    {
        return $user->id == $moduleTrigger->module->owner->user_id;
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
     * @param  ModuleTrigger  $moduleTrigger
     * @return mixed
     */
    public function update(User $user, ModuleTrigger $moduleTrigger)
    {
        return $user->id == $moduleTrigger->module->owner->user_id;
    }

    /**
     * Determine whether the user can delete the program module reminder.
     *
     * @param  User  $user
     * @param  ModuleTrigger  $moduleTrigger
     * @return mixed
     */
    public function delete(User $user, ModuleTrigger $moduleTrigger)
    {
        return $user->id == $moduleTrigger->module->owner->user_id;
    }

    /**
     * Determine whether the user can restore the program module reminder.
     *
     * @param  User  $user
     * @param  ModuleTrigger  $moduleTrigger
     * @return mixed
     */
    public function restore(User $user, ModuleTrigger $moduleTrigger)
    {
        return $user->id == $moduleTrigger->module->owner->user_id;
    }

    /**
     * Determine whether the user can permanently delete the program module reminder.
     *
     * @param  User  $user
     * @param  ModuleTrigger  $moduleTrigger
     * @return mixed
     */
    public function forceDelete(User $user, ModuleTrigger $moduleTrigger)
    {
        return $user->id == $moduleTrigger->module->owner->user_id;
    }
}
