<?php

namespace App\Policies;

use App\Models\ProgramLearner;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProgramLearnerPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any program learners.
     *
     * @param  User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the program learner.
     *
     * @param  User  $user
     * @param  ProgramLearner  $programLearner
     * @return mixed
     */
    public function view(User $user, ProgramLearner $programLearner)
    {
        //
    }

    /**
     * Determine whether the user can create program learners.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the program learner.
     *
     * @param  User  $user
     * @param  ProgramLearner  $programLearner
     * @return mixed
     */
    public function update(User $user, ProgramLearner $programLearner)
    {
        //
    }

    /**
     * Determine whether the user can delete the program learner.
     *
     * @param  User  $user
     * @param  ProgramLearner  $programLearner
     * @return mixed
     */
    public function delete(User $user, ProgramLearner $programLearner)
    {
        //
    }

    /**
     * Determine whether the user can restore the program learner.
     *
     * @param  User  $user
     * @param  ProgramLearner  $programLearner
     * @return mixed
     */
    public function restore(User $user, ProgramLearner $programLearner)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the program learner.
     *
     * @param  User  $user
     * @param  ProgramLearner  $programLearner
     * @return mixed
     */
    public function forceDelete(User $user, ProgramLearner $programLearner)
    {
        //
    }
}
