<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use Illuminate\Support\Facades\Response;

class UserApiController extends Controller {
    
     public function index(){
        
        $user=User::All();
        return Response::json( $user->toArray(),200);        
    }
    
    public function show($id) {
        
        if ($user = User::find($id)) {
            return Response::json($user,200);
        } else {
            return Response::json([
                    'error' => true
                    ],400);  
        }  
    }   
    
    public function destroy($id){
        $user = User::find($id);
        if($user->delete()) {
            return Response::json($id,
                    200);
        }else {
            return Response::json([
                    'error' => true,
                    404]);             
        }
    }  
}
