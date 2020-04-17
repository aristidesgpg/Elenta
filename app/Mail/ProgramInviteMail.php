<?php

namespace App\Mail;

use App\Models\Program;
use App\Models\ProgramInvite;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProgramInviteMail extends Mailable
{
    use Queueable, SerializesModels;

    public ProgramInvite $programInvite;

    public function __construct(ProgramInvite $p)
    {
        $this->programInvite = $p;
    }


    public function build()
    {
        return $this->markdown('emails.program_invites.invite');
    }
}
