<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('flower');
});

Route::get('/preview-fonts', function () {
    return view('preview-fonts');
});
