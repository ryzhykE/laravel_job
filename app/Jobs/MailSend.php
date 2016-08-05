<?php

namespace App\Jobs;

use App\User;
use App\Book;
use Illuminate\Mail\Message;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Mail\Mailer;

class MailSender extends Job implements SelfHandling, ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $user;
    protected $book;
    protected $subject;
    protected $template;
    protected $referenceUrl;

    public function __construct(User $user, Book $book, $subject, $template, $referenceUrl)
    {
        $this->user = $user;
        $this->book = $book;
        $this->subject = $subject;
        $this->template = $template;
        $this->referenceUrl = $referenceUrl;
    }

 
    public function handle(Mailer $mailer)
    {
        $mailer->send(
            $this->template,
            [
                'user' => $this->user,
                'book' => $this->book,
                'url' => $this->referenceUrl
            ],
            function (Message $message) {
                $message->to($this->user->email, $this->user->firstname)
                    ->subject($this->subject);
            }
        );
    }
}
