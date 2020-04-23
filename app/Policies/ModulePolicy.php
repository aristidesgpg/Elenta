<?php

namespace App\Policies;

use App\Models\LearnerProfile;
use App\Models\Module;
use App\Models\Program;
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
        return false;
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
        return $module->is_public
            // If you own a program or template with the module
            || $module->programs()->with('owner')->get()
                    ->pluck('owner.user_id')
                    ->contains($user->id)
            || $module->templates()->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id)
            // If you're enrolled in a program with the module
            || $module->programs()->with('learners')->get()->map(function (Program $p) {
                return $p->learners->pluck('user_id');
            })->flatten()->contains($user->id);
    }

    /**
     * Determine whether the user can create modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
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
        return $user->id == $module->owner->user_id;
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
        return $user->id == $module->owner->user_id;
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
        return $user->id == $module->owner->user_id;
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
        return $user->id == $module->owner->user_id;
    }

    public function upsert(User $user, array $args) {
        if ($args['id']) {
            return $user->can('update', Module::find($args['id']));
        } else {
            return $user->can('create');
        }
    }
}
