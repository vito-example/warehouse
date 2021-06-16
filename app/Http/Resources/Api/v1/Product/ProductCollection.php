<?php
/**
 * app\Http\Resources\Api\v1\Product\ProductCollection.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:23 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Product;

use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class ProductCollection
 * @package App\Http\Resources\Api\v1\Product
 */
class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'data' => $this->collection->map(
                function ($product) {
                    return new ProductResource($product);
                }
            )
        ];
    }
}
