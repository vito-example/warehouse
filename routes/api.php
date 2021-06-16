<?php

use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\SupplierController;
use App\Http\Controllers\Api\V1\WarehouseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Supplier Module
    Route::apiResource('supplier',SupplierController::class);

    // Warehouse Module
    Route::apiResource('warehouse',WarehouseController::class);

    // Product Module
    Route::apiResource('product',ProductController::class);
});


