<?php

namespace App\Mail;

use App\Models\ProgramModule;
use App\Models\ProgramModuleSend;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProgramModuleTriggerMail extends Mailable
{
    use Queueable, SerializesModels;

    public ProgramModuleSend $programModuleSend;

    public function __construct(ProgramModuleSend $programModuleSend)
    {
        $this->programModuleSend = $programModuleSend;
    }

    public function build()
    {
        return $this->markdown('emails.program_modules.trigger');
    }
}
