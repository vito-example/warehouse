<?php
/**
 * app\Http\Controllers\Api\V1\TransferController.php
 *
 * Date-Time: 6/16/2021
 * Time: 11:02 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\TransferRequest;
use App\Http\Requests\Api\V1\WarehouseRequest;
use App\Http\Resources\Api\v1\Product\ProductResource;
use App\Http\Resources\Api\v1\Transfer\TransferCollection;
use App\Http\Resources\Api\v1\Transfer\TransferResource;
use App\Models\Product;
use App\Repositories\Eloquent\ProductRepository;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\TransferRepositoryInterface;
use App\Repositories\WarehouseRepositoryInterface;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

/**
 * Class TransferController
 * @package App\Http\Controllers\Api\V1
 */
class TransferController extends Controller
{
    /**
     * @var TransferRepositoryInterface
     */
    private $transferRepository;
    /**
     * @var \App\Repositories\WarehouseRepositoryInterface
     */
    private $warehouseRepository;
    /**
     * @var \App\Repositories\ProductRepositoryInterface
     */
    private $productRepository;

    /**
     * TransferController constructor.
     *
     * @param TransferRepositoryInterface $transferRepository
     * @param \App\Repositories\WarehouseRepositoryInterface $warehouseRepository
     * @param \App\Repositories\ProductRepositoryInterface $productRepository
     */
    public function __construct(
        TransferRepositoryInterface $transferRepository,
        WarehouseRepositoryInterface $warehouseRepository,
        ProductRepositoryInterface $productRepository
    )
    {
        $this->transferRepository = $transferRepository;
        $this->warehouseRepository = $warehouseRepository;
        $this->productRepository = $productRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param \App\Http\Requests\Api\v1\TransferRequest $request
     *
     * @return \App\Http\Resources\Api\v1\Transfer\TransferCollection
     */
    public function index(TransferRequest $request): TransferCollection
    {
        return new TransferCollection($this->transferRepository->getData($request, ['transferable' => function (MorphTo $morphTo) {
            $morphTo->constrain([
                Product::class
            ]);
        }, 'transferTo', 'transferFrom']));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(int $id): \Illuminate\Http\JsonResponse
    {
        $product = Product::where('id', $id)->with('warehouses')->firstOrFail();
        return response()->json([
            'product' => $product,
            'warehouses' => $this->warehouseRepository->getData(new WarehouseRequest()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Http\Requests\Api\V1\TransferRequest $request
     * @param int $id
     *
     * @return \App\Http\Resources\Api\v1\Product\ProductResource
     * @throws \App\Exceptions\Api\v1\DataNotFoundException
     */
    public function store(TransferRequest $request, int $id): ProductResource
    {
        $product = $this->productRepository->findOrFail($id);

        $attributes = $request->only(
            'transfer_from',
            'transfer_to',
            'count',
            'date'
        );

        return new ProductResource($this->transferRepository->transfer($product, $attributes));
    }
}
