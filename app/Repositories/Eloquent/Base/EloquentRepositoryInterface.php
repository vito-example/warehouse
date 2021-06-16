<?php
/**
 * app\Repositories\Eloquent\Base\EloquentRepositoryInterface.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:09 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Repositories\Eloquent\Base;

use Illuminate\Database\Eloquent\Model;

/**
 * Interface EloquentRepositoryInterface
 * @package App\Repositories\Eloquent\Base
 */
interface EloquentRepositoryInterface
{
    /**
     * @param $request
     * @param array $with
     *
     * @return mixed
     */
    public function getData($request,array $with = []);

    /**
     * @param array $attributes
     *
     * @return Model
     */
    public function create(array $attributes): Model;
}
