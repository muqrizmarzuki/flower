<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| DigiBouquet Gift Routes for Sayang ❤️
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('flower');
});
