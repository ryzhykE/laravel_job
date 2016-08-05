<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function (){
    return view('welcome');
});

Route::group(['prefix' => 'api'], function (){
    Route::resource('books', 'BookApiController', ['only' => ['store', 'show', 'index', 'destroy', 'update','deleter']]);
    Route::resource('userbook', 'BookUserApiController', ['only' => ['destroy']]);
    Route::resource('users', 'UserApiController', ['only' => ['show', 'index', 'destroy']]);
});

