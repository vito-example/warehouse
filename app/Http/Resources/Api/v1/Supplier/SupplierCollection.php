<?php
/**
 * app\Http\Resources\Api\v1\Supplier\SupplierCollection.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:30 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Http\Resources\Api\v1\Supplier;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class SupplierCollection
 * @package App\Http\Resources\Api\v1\Supplier
 */
class SupplierCollection extends ResourceCollection
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
                function ($supplier) {
                    return new SupplierResource($supplier);
                }
            )
        ];
    }
}
