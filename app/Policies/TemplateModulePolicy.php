<?php

namespace App\Policies;

use App\Models\Template;
use App\Models\TemplateModule;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TemplateModulePolicy
{
    use HandlesAuthorization;
    /**
     * Determine whether the user can view any template modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function view(User $user, TemplateModule $templateModule)
    {
        return $user->id == $templateModule->template->owner->user_id;
    }

    /**
     * Determine whether the user can create template modules.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function update(User $user, TemplateModule $templateModule)
    {
        return $user->id == $templateModule->template->owner->user_id;
    }

    /**
     * Determine whether the user can delete the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function delete(User $user, TemplateModule $templateModule)
    {
        return $user->id == $templateModule->template->owner->user_id;
    }

    /**
     * Determine whether the user can restore the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function restore(User $user, TemplateModule $templateModule)
    {
        return $user->id == $templateModule->template->owner->user_id;
    }

    /**
     * Determine whether the user can permanently delete the template module.
     *
     * @param  User  $user
     * @param  TemplateModule  $templateModule
     * @return mixed
     */
    public function forceDelete(User $user, TemplateModule $templateModule)
    {
        return $user->id == $templateModule->template->owner->user_id;
    }

    public function upsert(User $user, array $args) {
        if ($args['id']) {
            return $user->can('update', TemplateModule::find($args['id']));
        } else {
            return $user->can('create');
        }
    }
}
