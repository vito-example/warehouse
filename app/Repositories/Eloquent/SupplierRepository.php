<?php
/**
 * app\Repositories\Eloquent\SupplierRepository.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:27 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Repositories\Eloquent;


use App\Models\Supplier;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\SupplierRepositoryInterface;

/**
 * Class SupplierRepository
 * @package App\Repositories\Eloquent
 */
class SupplierRepository extends BaseRepository implements SupplierRepositoryInterface
{
    /**
     * SupplierRepository constructor.
     * @param Supplier $model
     */
    public function __construct(Supplier $model)
    {
        parent::__construct($model);
    }
}
