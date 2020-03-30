<?php

namespace App\Models\Policies;

use App\Models\ConsultantProfile;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ConsultantProfilePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any consultant profiles.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the consultant profile.
     *
     * @param  User  $user
     * @param  ConsultantProfile  $consultantProfile
     * @return mixed
     */
    public function view(User $user, ConsultantProfile $consultantProfile)
    {
        return true;
    }

    /**
     * Determine whether the user can create consultant profiles.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the consultant profile.
     *
     * @param  User  $user
     * @param  ConsultantProfile  $consultantProfile
     * @return mixed
     */
    public function update(User $user, ConsultantProfile $consultantProfile)
    {
        return $user->id == $consultantProfile->user_id;
    }

    /**
     * Determine whether the user can delete the consultant profile.
     *
     * @param  User  $user
     * @param  ConsultantProfile  $consultantProfile
     * @return mixed
     */
    public function delete(User $user, ConsultantProfile $consultantProfile)
    {
        return $user->id == $consultantProfile->user_id;
    }

    /**
     * Determine whether the user can restore the consultant profile.
     *
     * @param  User  $user
     * @param  ConsultantProfile  $consultantProfile
     * @return mixed
     */
    public function restore(User $user, ConsultantProfile $consultantProfile)
    {
        return $user->id == $consultantProfile->user_id;
    }

    /**
     * Determine whether the user can permanently delete the consultant profile.
     *
     * @param  User  $user
     * @param  ConsultantProfile  $consultantProfile
     * @return mixed
     */
    public function forceDelete(User $user, ConsultantProfile $consultantProfile)
    {
        return $user->id == $consultantProfile->user_id;
    }
}
