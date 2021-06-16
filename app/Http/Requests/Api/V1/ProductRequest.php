<?php
/**
 * app\Http\Requests\Api\V1\ProductRequest.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:26 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Requests\Api\V1;

/**
 * Class ProductRequest
 * @package App\Http\Requests\Api\V1
 */
class ProductRequest extends Request
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
            'supplier_id' => $isRequired.'|numeric|exists:suppliers,id',
            'name' => $isRequired.'|string|max:255',
            'warehouses' => $isRequired.'|array',
            'warehouses.*.id' => $isRequired.'|exists:warehouses,id',
            'warehouses.*.count' => $isRequired.'|numeric',
            'warehouses.*.date' => $isRequired.'|date',
        ];
    }
}
