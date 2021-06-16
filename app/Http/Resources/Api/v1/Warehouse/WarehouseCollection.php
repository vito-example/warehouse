<?php
/**
 * app\Http\Resources\Api\v1\Warehouse\WarehouseCollection.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:56 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Http\Resources\Api\v1\Warehouse;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class WarehouseCollection
 * @package App\Http\Resources\Api\v1\Warehouse
 */
class WarehouseCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'data' => $this->collection->map(
                function ($warehouse) {
                    return new WarehouseResource($warehouse);
                }
            )
        ];
    }
}
