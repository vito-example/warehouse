<?php
/**
 * app\Http\Resources\Api\v1\Transfer\TransferResource.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:58 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Transfer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class TransferResource
 * @package App\Http\Resources\Api\v1\Transfer
 */
class TransferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'product' => $this->transferable,
            'from_warehouse' => $this->transferFrom,
            'to_warehouse' => $this->transferTo,
            'count' => $this->count,
            'date' => $this->date,
            'created_at' => $this->created_at,
        ];
    }
}
