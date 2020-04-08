<?php

namespace App\Mail;

use App\Models\ProgramModule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProgramModuleTriggerMail extends Mailable
{
    use Queueable, SerializesModels;

    public ProgramModule $programModule;

    public function __construct(ProgramModule $programModule)
    {
        $this->programModule = $programModule;
    }

    public function build()
    {
        return $this->markdown('emails.program_modules.trigger');
    }
}
