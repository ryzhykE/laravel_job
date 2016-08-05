<?php

namespace App\Http\Controllers;

use App\Book;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;


class BookApiController extends Controller
{
	public function mailUsers(Book $book){
        $users = User::all();
        $url = route('books');
        foreach ($users as $user) {
            $this->dispatch(
                new MailSend(
                    $user,
                    $book,
                    'New book!',
                    $url
                )
            );
        }
    }
    
    public function index() {
        $book = Book::all();
        return Response::json($book->toArray(), 200);
    }
    
    public function show($id) {
        
        if($book = Book::find($id)){
            return Response::json(
                    $book->toArray(),
                    200);            
        } else {
            return Response::json([
                    'error' => true,
                    400]);            
        }     
    }
    
    public function destroy($id) {
        
        $book = Book::find($id);
        if($book->delete()){
            return Response::json($id,
                    200); 
        } else {
            return Response::json([
                    'error' => true,
                    404]);             
        }
    }
      
    public function store(Request $request){

        $rules = [
            'title' => 'required|alpha|min:3',
            'author' => 'required|alpha|min:3',
            'year' => 'required',
            'genre' => 'required|alpha|min:3',
            'user_id' => 'exists:users,id'
        ];

        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            return Response::json([], 422);
        } else {
            $book = new Book();
            $book->title = $request->title;
            $book->author = $request->author;
            $book->year = $request->year;
            $book->genre = $request->genre;
            $book-> user_id = $request->user_id;
            $book->save();
            return Response::json($book, 200);
        }
    }

    public function update(Request $request, $id) {
        $rules = [
            'title' => 'required|alpha|min:3',
            'author' => 'required|alpha|min:3',
            'year' => 'required',
            'genre' => 'required|alpha|min:3',
            'user_id' => 'exists:users,id'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return Response::json([], 422);
        } else {
            $book = Book::find($id);
            $book->title = $request->title;
            $book->author = $request->author;
            $book->year = $request->year;
            $book->genre = $request->genre;
            $book-> user_id = $request->user_id;
            $book->save();
            return Response::json($book, 200);
        }
    } 
}
