<?php
/**
 * app\Http\Controllers\Api\V1\SupplierController.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:19 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\SupplierRequest;
use App\Http\Resources\Api\v1\Supplier\SupplierCollection;
use App\Http\Resources\Api\v1\Supplier\SupplierResource;
use App\Repositories\SupplierRepositoryInterface;
use Illuminate\Http\Request;

/**
 * Class SupplierController
 * @package App\Http\Controllers\Api\V1
 */
class SupplierController extends Controller
{

    /**
     * @var SupplierRepositoryInterface
     */
    private $supplierRepository;

    /**
     * SupplierController constructor.
     * @param SupplierRepositoryInterface $supplierRepository
     */
    public function __construct(
        SupplierRepositoryInterface $supplierRepository
    )
    {
        $this->supplierRepository = $supplierRepository;
    }


    /**
     * @param SupplierRequest $request
     * @return SupplierCollection
     */
    public function index(SupplierRequest $request): SupplierCollection
    {
        return new SupplierCollection($this->supplierRepository->getData($request));
    }

    /**
     * @param SupplierRequest $request
     * @return SupplierResource
     */
    public function store(SupplierRequest $request): SupplierResource
    {
        $attributes = $request->only('name');

        return new SupplierResource($this->supplierRepository->create($attributes));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return SupplierResource
     */
    public function show(int $id): SupplierResource
    {
        return new SupplierResource($this->supplierRepository->findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
