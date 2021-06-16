<?php
/**
 * app\Repositories\SupplierRepositoryInterface.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:26 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Repositories;

use App\Http\Requests\Api\v1\SupplierRequest;

/**
 * Interface SupplierRepositoryInterface
 * @package App\Repositories
 */
interface SupplierRepositoryInterface
{
    /**
     * @param SupplierRequest $request
     * @param array $with
     * @return mixed
     */
    public function getData(SupplierRequest $request, array $with = []);
}
