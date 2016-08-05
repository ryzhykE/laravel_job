<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Book;
use Illuminate\Support\Facades\Response;

class BookUserApiController extends Controller { 
    
    public function destroy($id)
    {
        $book = Book::find($id);
        $book->user_id = null;
        if ($book->save()) {
              return Response::json(['error' => false,
                    'returned' => true],200);   
            
        } else {
            return Response::json([
                    'error' => true,
                    ],400);
        }
    }
    
}