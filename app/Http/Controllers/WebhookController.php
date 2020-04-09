<?php

namespace App\Http\Controllers;

use Aws\Sns\Message;
use Aws\Sns\MessageValidator;
use Illuminate\Support\Facades\Log;
use Psy\Exception\Exception;

class WebhookController extends Controller
{
    public function __construct()
    {
    }

    public function handleElentaSesEvent() {
        try {
            $message = Message::fromRawPostData();
            Log::error($message);
            $validator = new MessageValidator();
            if ($validator->isValid($message)) {

            }
        } catch (Exception $e) {
            // Handle exception
        }
    }
}
