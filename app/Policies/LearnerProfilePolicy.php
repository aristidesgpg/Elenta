<?php

namespace App\Policies;

use App\Models\ConsultantProfile;
use App\Models\LearnerProfile;
use App\Models\Program;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LearnerProfilePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any learner profiles.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can view the learner profile.
     *
     * @param  User  $user
     * @param  LearnerProfile  $learnerProfile
     * @return mixed
     */
    public function view(User $user, LearnerProfile $learnerProfile)
    {
        return $user->id == $learnerProfile->user_id ||
            // Program owners can view enrolled student profiles
            $learnerProfile->programs()->with('owner')->get()
                ->pluck('owner.user_id')
                ->contains($user->id);
    }

    /**
     * Determine whether the user can create learner profiles.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the learner profile.
     *
     * @param  User  $user
     * @param  LearnerProfile  $learnerProfile
     * @return mixed
     */
    public function update(User $user, LearnerProfile $learnerProfile)
    {
        return $user->id == $learnerProfile->user_id;
    }

    /**
     * Determine whether the user can delete the learner profile.
     *
     * @param  User  $user
     * @param  LearnerProfile  $learnerProfile
     * @return mixed
     */
    public function delete(User $user, LearnerProfile $learnerProfile)
    {
        return $user->id == $learnerProfile->user_id;
    }

    /**
     * Determine whether the user can restore the learner profile.
     *
     * @param  User  $user
     * @param  LearnerProfile  $learnerProfile
     * @return mixed
     */
    public function restore(User $user, LearnerProfile $learnerProfile)
    {
        return $user->id == $learnerProfile->user_id;
    }

    /**
     * Determine whether the user can permanently delete the learner profile.
     *
     * @param  User  $user
     * @param  LearnerProfile  $learnerProfile
     * @return mixed
     */
    public function forceDelete(User $user, LearnerProfile $learnerProfile)
    {
        return $user->id == $learnerProfile->user_id;
    }

    public function upsert(User $user, array $args) {
        if ($args['id']) {
            return $user->can('update', LearnerProfile::find($args['id']));
        } else {
            return $user->can('create');
        }
    }
}
