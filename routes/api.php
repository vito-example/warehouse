<?php

use App\Http\Controllers\Api\V1\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Supplier Module
    Route::apiResource('supplier',SupplierController::class);
});


