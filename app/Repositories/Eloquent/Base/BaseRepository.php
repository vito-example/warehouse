<?php
/**
 * app\Repositories\Eloquent\Base\BaseRepository.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:08 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Repositories\Eloquent\Base;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BaseRepository
 * @package App\Repositories\Eloquent\Base
 */
class BaseRepository implements EloquentRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * Class Constructor
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /** Get Data with pagination
     *
     * @param $request
     * @param array $with
     * @return mixed
     */
    public function getData($request, array $with = []) {
        $data = $this->model->filter($request);

        if ($request->filled('paginate')) {
            return $data->with($with)->paginate($request['paginate']);
        }

        return $data->with($with)->get();
    }
}
