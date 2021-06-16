<?php
/**
 * app\Repositories\Eloquent\TransferRepository.php
 *
 * Date-Time: 6/16/2021
 * Time: 11:00 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Repositories\Eloquent;


use App\Models\Transfer;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\TransferRepositoryInterface;


class TransferRepository extends BaseRepository implements TransferRepositoryInterface
{
    /**
     * TransferRepository constructor.
     * @param Transfer $model
     */
    public function __construct(Transfer $model)
    {
        parent::__construct($model);
    }
}
