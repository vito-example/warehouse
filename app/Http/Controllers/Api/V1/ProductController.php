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
use App\Http\Resources\Api\v1\Product\ProductCollection;
use App\Repositories\ProductRepositoryInterface;
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
     * ProductController constructor.
     * @param ProductRepositoryInterface $productRepository
     */
    public function __construct(
        ProductRepositoryInterface $productRepository
    ) {
        $this->productRepository = $productRepository;
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
