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


use App\Models\Product;
use App\Models\Transfer;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\TransferRepositoryInterface;
use Illuminate\Support\Facades\DB;


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

    /**
     * @param \App\Models\Product $product
     * @param array $attributes
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function transfer(Product $product, array $attributes)
    {
        try {
            DB::connection()->beginTransaction();
            // Minus transfer products
            $product->warehouses()->where('warehouse_id', $attributes['transfer_from'])->updateExistingPivot($attributes['transfer_from'], ['count' => DB::raw('count-'.$attributes['count'])]);

            $transferTo = $product->warehouses()->where('warehouse_id',$attributes['transfer_to'])->first();
            if (null === $transferTo) {
                // if warehouse not exist create new warehouse for this product and date will be transfer date.
                $product->warehouses()->attach($attributes['transfer_to'], [
                    'count' => $attributes['count'],
                    'date' => $attributes['date']
                ]);
            } else {
                $product->warehouses()->where('warehouse_id', $attributes['transfer_to'])->updateExistingPivot($attributes['transfer_to'], ['count' => DB::raw('count+'.$attributes['count'])]);
            }

            // Create transfer
            $data = [
                'from_warehouse_id' => $attributes['transfer_from'],
                'to_warehouse_id' => $attributes['transfer_to'],
                'count' => $attributes['count'],
                'date' => $attributes['date'],
            ];

            $product->transfers()->create($data);

            DB::connection()->commit();

            return $product;
        } catch (\PDOException $e) {
            DB::connection()->rollBack();
        }
    }
}
