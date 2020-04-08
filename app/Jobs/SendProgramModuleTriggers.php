<?php

namespace App\Jobs;

use App\Models\LearnerProfile;
use App\Models\ProgramModule;
use App\Models\ProgramModuleSend;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;

class SendProgramModuleTriggers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected ProgramModule $programModule;

    public function __construct(ProgramModule $programModule)
    {
        $this->programModule = $programModule;
    }

    public function handle()
    {
        // TODO: Add condition filters
        $this->programModule->program->learners->each(function (LearnerProfile $l) {
            $sends = $this->programModule->sends()->where('learner_profile_id', $l->id)->get();
            // Assume only one trigger for now
            $trigger = $this->programModule->module->triggers[0];

            if ($sends->isEmpty()) {
                $this->programModule->sendModule(
                    $l,
                    ProgramModuleSend::REASON_TRIGGER,
                    ProgramModuleSend::CHANNEL_EMAIL
                );
            } else if ($sends->count() < $trigger->max_sends) {
                $last_sent = $sends->max('send_timestamp');
                if (Carbon::parse($last_sent)->addDays($trigger->frequency)->lte(Carbon::now())) {
                    $this->programModule->sendModule(
                        $l,
                        ProgramModuleSend::REASON_TRIGGER,
                        ProgramModuleSend::CHANNEL_EMAIL
                    );
                }
            }
        });
    }
}
