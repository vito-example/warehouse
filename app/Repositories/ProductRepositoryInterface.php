<?php
/**
 * app\Repositories\ProductRepositoryInterface.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:26 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Repositories;

use App\Http\Requests\Api\V1\ProductRequest;
use App\Http\Requests\Api\V1\WarehouseRequest;
use App\Models\Product;

/**
 * Interface ProductRepositoryInterface
 * @package App\Repositories
 */
interface ProductRepositoryInterface
{
    /**
     * @param ProductRequest $request
     * @param array $with
     * @return mixed
     */
    public function getData(ProductRequest $request, array $with = []);

    /**
     * @param array $attributes
     *
     * @return Product
     */
    public function create(array $attributes);

    /**
     * @param int $id
     * @param array $data
     * @return Product
     */
    public function update(int $id, array $data = []) ;

}
