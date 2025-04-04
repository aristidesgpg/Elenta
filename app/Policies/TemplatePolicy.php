<?php

namespace App\Policies;

use App\Models\LearnerProfile;
use App\Models\Template;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TemplatePolicy
{
    use HandlesAuthorization;
    /**
     * Determine whether the user can view any templates.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function view(User $user, Template $template)
    {
        return $template->is_public
            || $template->can_request
            || $user->id == $template->owner->user_id;
    }

    /**
     * Determine whether the user can create templates.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function update(User $user, Template $template)
    {
        return $user->id == $template->owner->user_id;
    }

    /**
     * Determine whether the user can delete the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function delete(User $user, Template $template)
    {
        return $user->id == $template->owner->user_id;
    }

    /**
     * Determine whether the user can restore the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function restore(User $user, Template $template)
    {
        return $user->id == $template->owner->user_id;
    }

    /**
     * Determine whether the user can permanently delete the template.
     *
     * @param  User  $user
     * @param  Template  $template
     * @return mixed
     */
    public function forceDelete(User $user, Template $template)
    {
        return $user->id == $template->owner->user_id;
    }

    public function upsert(User $user, array $args) {
        if ($args['id']) {
            return $user->can('update', Template::find($args['id']));
        } else {
            return $user->can('create', Template::class);
        }
    }
}
