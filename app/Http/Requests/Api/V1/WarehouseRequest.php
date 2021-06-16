<?php
/**
 * app\Http\Requests\Api\V1\WarehouseRequest.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:59 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Requests\Api\V1;


use Illuminate\Validation\Rule;

/**
 * Class WarehouseRequest
 * @package App\Http\Requests\Api\V1
 */
class WarehouseRequest extends Request
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // Check if method is get,fields are nullable.
        $isRequired = $this->method() === 'GET' ? 'nullable' : 'required';

        return [
            'name' => [$isRequired, 'string', 'max:255', Rule::unique('warehouses', 'name')->ignore($this->warehouse)],
        ];
    }
}
