<?php
/**
 * app\Http\Resources\Api\v1\Supplier\SupplierResource.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:32 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Supplier;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class SupplierResource
 * @package App\Http\Resources\Api\v1\Supplier
 */
class SupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
