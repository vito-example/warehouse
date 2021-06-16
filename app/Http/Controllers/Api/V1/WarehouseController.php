<?php
/**
 * app\Http\Controllers\Api\V1\WarehouseController.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:10 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\WarehouseRequest;
use App\Http\Resources\Api\v1\Warehouse\WarehouseCollection;
use App\Http\Resources\Api\v1\Warehouse\WarehouseResource;
use App\Repositories\WarehouseRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class WarehouseController
 * @package App\Http\Controllers\Api\V1
 */
class WarehouseController extends Controller
{

    /**
     * @var WarehouseRepositoryInterface
     */
    private $warehouseRepository;

    public function __construct(
        WarehouseRepositoryInterface $warehouseRepository
    ) {
        $this->warehouseRepository = $warehouseRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param WarehouseRequest $request
     * @return WarehouseCollection
     */
    public function index(WarehouseRequest $request): WarehouseCollection
    {
        return new WarehouseCollection($this->warehouseRepository->getData($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param WarehouseRequest $request
     * @return WarehouseResource
     */
    public function store(WarehouseRequest $request): WarehouseResource
    {
        $attributes = $request->only('name');

        return new WarehouseResource($this->warehouseRepository->create($attributes));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return WarehouseResource
     */
    public function show(int $id): WarehouseResource
    {
        return new WarehouseResource($this->warehouseRepository->findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
