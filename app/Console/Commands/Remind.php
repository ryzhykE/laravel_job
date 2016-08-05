<?php

namespace App\Console\Commands;

use App\Book;
use App\User;
use App\Jobs\MailSend;
use Illuminate\Console\Command;
use Illuminate\Foundation\Bus\DispatchesJobs;

class Remind extends Command
{
    
    protected $signature = 'remind';

    
    protected $description = 'Remind user to return a book';

 
    public function handle() {
        $books = Book::whereRaw('taken < curdate() - interval 30 day')->get();
        foreach ($books as $book) {
            $url = route('books');
            $user = User::find($book->user_id);
            $this->dispatch(
                new MailSender(
                    $user,
                    $book,
                    'You must  return a book to library',
                    'emails.reminder',
                    $url
                )
            );
        }
    }
}
