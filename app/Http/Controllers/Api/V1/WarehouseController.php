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
use App\Repositories\WarehouseRepositoryInterface;
use Illuminate\Http\Request;

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
