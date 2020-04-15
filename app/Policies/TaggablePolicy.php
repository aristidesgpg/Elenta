<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Taggable;
use Illuminate\Auth\Access\HandlesAuthorization;

// I'm so sorry to who ever has to work on this in the future (even if it's me)
class TaggablePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view all taggable relationships.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view their taggable relationships.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Taggable  $taggable
     * @return mixed
     */
    public function view(User $user, Taggable $taggable)
    {
        if ($taggable->taggable_type == Taggable::TEMPLATE) {
            return $taggable->templates->with('owner')->get()
                        ->pluck('owner.user_id')
                        ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::PROGRAM) {
            return $taggable->programs->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::MODULE) {
            return $taggable->modules->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Taggable  $taggable
     * @return mixed
     */
    public function update(User $user, Taggable $taggable)
    {
        if ($taggable->taggable_type == Taggable::TEMPLATE) {
            return $taggable->templates->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::PROGRAM) {
            return $taggable->programs->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::MODULE) {
            return $taggable->modules->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Taggable  $taggable
     * @return mixed
     */
    public function delete(User $user, Taggable $taggable)
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Taggable  $taggable
     * @return mixed
     */
    public function restore(User $user, Taggable $taggable)
    {
        if ($taggable->taggable_type == Taggable::TEMPLATE) {
            return $taggable->templates->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::PROGRAM) {
            return $taggable->programs->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::MODULE) {
            return $taggable->modules->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Taggable  $taggable
     * @return mixed
     */
    public function forceDelete(User $user, Taggable $taggable)
    {
        if ($taggable->taggable_type == Taggable::TEMPLATE) {
            return $taggable->templates->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::PROGRAM) {
            return $taggable->programs->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
        else if ($taggable->taggable_type == Taggable::MODULE) {
            return $taggable->modules->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
        }
    }
}
