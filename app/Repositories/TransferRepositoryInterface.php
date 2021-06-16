<?php
/**
 * app\Repositories\TransferRepositoryInterface.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:59 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Repositories;

use App\Http\Requests\Api\V1\TransferRequest;

/**
 * Interface TransferRepositoryInterface
 * @package App\Repositories
 */
interface TransferRepositoryInterface
{
    /**
     * @param TransferRequest $request
     * @param array $with
     * @return mixed
     */
    public function getData(TransferRequest $request, array $with = []);
}
