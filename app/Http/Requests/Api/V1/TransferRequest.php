<?php
/**
 * app\Http\Requests\Api\V1\TransferRequest.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:55 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Requests\Api\V1;

use App\Models\Product;
use App\Rules\ValidTransferFrom;

/**
 * Class TransferRequest
 * @package App\Http\Requests\Api\v1
 */
class TransferRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        // Check if method is get,fields are nullable.
        $isRequired = $this->method() === 'GET' ? 'nullable' : 'required';

        return [
            'transfer_from' => [
                $isRequired,
                'exists:warehouses,id',
                new ValidTransferFrom($this->getProductModel(),$this->count)
            ],
            'transfer_to' => $isRequired.'|exists:warehouses,id',
            'count' => $isRequired.'|numeric',
            'date' => $isRequired.'|date',
        ];
    }

    /**
     * @return mixed
     */
    public function getProductModel()
    {
        return Product::where('id',$this->product)->with(['warehouses' =>function ($query) {
            $query->where('warehouses.id','=',$this->transfer_from);
        }])->first();
    }
}
