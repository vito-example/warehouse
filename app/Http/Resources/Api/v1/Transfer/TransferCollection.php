<?php
/**
 * app\Http\Resources\Api\v1\Transfer\TransferCollection.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:57 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Transfer;

use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Class TransferCollection
 * @package App\Http\Resources\Api\v1\Transfer
 */
class TransferCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'data' => $this->collection->map(
                function ($transfer) {
                    return new TransferResource($transfer);
                }
            )
        ];
    }
}
