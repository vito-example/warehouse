<?php
/**
 * app\Repositories\Eloquent\WarehouseRepository.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:00 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Repositories\Eloquent;


use App\Models\Warehouse;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\WarehouseRepositoryInterface;

/**
 * Class SupplierRepository
 * @package App\Repositories\Eloquent
 */
class WarehouseRepository extends BaseRepository implements WarehouseRepositoryInterface
{
    /**
     * WarehouseRepository constructor.
     * @param Warehouse $model
     */
    public function __construct(Warehouse $model)
    {
        parent::__construct($model);
    }
}
