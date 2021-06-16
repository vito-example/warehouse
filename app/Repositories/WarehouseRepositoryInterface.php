<?php
/**
 * app\Repositories\WarehouseRepositoryInterface.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:00 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Repositories;

use App\Http\Requests\Api\V1\WarehouseRequest;

/**
 * Interface WarehouseRepositoryInterface
 * @package App\Repositories
 */
interface WarehouseRepositoryInterface
{
    /**
     * @param WarehouseRequest $request
     * @param array $with
     * @return mixed
     */
    public function getData(WarehouseRequest $request, array $with = []);
}
