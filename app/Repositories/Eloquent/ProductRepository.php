<?php
/**
 * app\Repositories\Eloquent\ProductRepository.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:25 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Repositories\Eloquent;


use App\Models\Product;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\ProductRepositoryInterface;
use Illuminate\Support\Facades\DB;

/**
 * Class ProductRepository
 * @package App\Repositories\Eloquent
 */
class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    /**
     * ProductRepository constructor.
     * @param Product $model
     */
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    /**
     * @param array $attributes
     * @return Product
     */
    public function create(array $attributes = []): Product
    {
        try {
            DB::connection()->beginTransaction();

            $data = [
                'supplier_id' => $attributes['supplier_id'],
                'name' => $attributes['name']
            ];

            $this->model = parent::create($data);

            foreach ($attributes['warehouses'] as $warehouse) {
                $this->model->warehouses()->attach($warehouse['id'], [
                    'count' => $warehouse['count'],
                    'date' => $warehouse['date']
                ]);
            }

            DB::connection()->commit();

            return $this->model;

        } catch (\PDOException $e) {
            DB::connection()->rollBack();
        }
    }

}
