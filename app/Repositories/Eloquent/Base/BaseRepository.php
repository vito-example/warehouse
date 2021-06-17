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

use App\Exceptions\Api\v1\DataNotFoundException;
use App\Exceptions\Api\v1\DeleteException;
use App\Exceptions\Api\v1\TrashException;
use App\Exceptions\Api\v1\UpdateException;
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
    public function getData($request, array $with = [])
    {
        $data = $this->model->filter($request);

        if ($request->filled('pageSize')) {
            return $data->with($with)->paginate($request['pageSize']);
        }

        return $data->with($with)->get();
    }

    /**
     * Create new model
     *
     * @param array $attributes
     *
     * @return Model
     */
    public function create(array $attributes = []): Model
    {
        return $this->model->create($attributes);
    }

    /**
     * Update model by the given ID
     *
     * @param integer $id
     * @param array $data
     *
     * @return mixed
     * @throws UpdateException|DataNotFoundException
     */
    public function update(int $id, array $data = []): Model
    {
        $this->model = $this->findOrFail($id);
        if (!$this->model->update($data)) {
            throw new UpdateException();
        }
        return $this->model;
    }


    /**
     * Delete model by the given ID
     *
     * @param integer $id
     *
     * @return Model
     * @throws DeleteException
     * @throws TrashException
     * @throws DataNotFoundException
     */
    public function delete(int $id): Model
    {
        $this->model = $this->findOrFail($id);
        if (!$this->model->destroy($id)) {
            throw new DeleteException();
        }

        return $this->findTrash($id);
    }

    /**
     * Find model by the given ID
     *
     * @param integer $id
     * @param array $columns
     *
     * @return mixed
     * @throws DataNotFoundException
     */
    public function findOrFail(int $id, array $columns = ['*'])
    {
        $data = $this->model->find($id, $columns);
        if (!$data) {
            throw new DataNotFoundException();
        }
        return $data;
    }

    /**
     * Find model from trash by the given ID
     *
     * @param integer $id
     *
     * @return Model
     * @throws TrashException
     */
    public function findTrash(int $id): Model
    {
        $model = $this->model->withTrashed()->find($id);
        if (null === $model) {
            throw new TrashException();
        }

        if (null === $model->deleted_at) {
            throw new TrashException();
        }
        return $model;
    }
}
