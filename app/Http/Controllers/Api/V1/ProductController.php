<?php
/**
 * app\Http\Controllers\Api\V1\ProductController.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:29 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\ProductRequest;
use App\Http\Requests\Api\V1\SupplierRequest;
use App\Http\Requests\Api\V1\WarehouseRequest;
use App\Http\Resources\Api\v1\Product\ProductCollection;
use App\Http\Resources\Api\v1\Product\ProductResource;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\SupplierRepositoryInterface;
use App\Repositories\WarehouseRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class ProductController
 * @package App\Http\Controllers\Api\V1
 */
class ProductController extends Controller
{
    /**
     * @var ProductRepositoryInterface
     */
    private $productRepository;
    /**
     * @var WarehouseRepositoryInterface
     */
    private $wareHouseRepository;
    /**
     * @var SupplierRepositoryInterface
     */
    private $supplierRepository;

    /**
     * ProductController constructor.
     * @param ProductRepositoryInterface $productRepository
     * @param WarehouseRepositoryInterface $warehouseRepository
     * @param SupplierRepositoryInterface $supplierRepository
     */
    public function __construct(
        ProductRepositoryInterface $productRepository,
        WarehouseRepositoryInterface $warehouseRepository,
        SupplierRepositoryInterface $supplierRepository
    ) {
        $this->productRepository = $productRepository;
        $this->wareHouseRepository = $warehouseRepository;
        $this->supplierRepository = $supplierRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param ProductRequest $request
     * @return ProductCollection
     */
    public function index(ProductRequest $request): ProductCollection
    {
        return new ProductCollection($this->productRepository->getData($request, ['warehouses']));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return JsonResponse
     */
    public function create(): JsonResponse
    {
        return response()->json([
            'product' => null,
            'warehouses' => $this->wareHouseRepository->getData(new WarehouseRequest()),
            'suppliers' => $this->supplierRepository->getData(new SupplierRequest()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @return ProductResource
     */
    public function store(ProductRequest $request): ProductResource
    {
        $attributes = $request->only('supplier_id', 'name', 'warehouses');

        return new ProductResource($this->productRepository->create($attributes));    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return ProductResource
     */
    public function show(int $id): ProductResource
    {
        return new ProductResource($this->productRepository->findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function edit($id): JsonResponse
    {
        return response()->json([
            'product' => $this->productRepository->findOrFail($id),
            'warehouses' => $this->wareHouseRepository->getData(new WarehouseRequest()),
            'suppliers' => $this->supplierRepository->getData(new SupplierRequest()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param int $id
     * @return ProductResource
     */
    public function update(ProductRequest $request,int $id): ProductResource
    {
        $attributes = $request->only('supplier_id', 'name', 'warehouses');

        return new ProductResource($this->productRepository->update($id, $attributes));    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return ProductResource
     */
    public function destroy(int $id): ProductResource
    {
        return new ProductResource($this->productRepository->delete($id));
    }
}
