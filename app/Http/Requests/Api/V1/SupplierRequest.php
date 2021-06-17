<?php
/**
 * app\Http\Requests\Api\V1\SupplierRequest.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:25 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class SupplierRequest
 * @package App\Http\Requests\Api\V1
 */
class SupplierRequest extends Request
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
            'name' => [$isRequired, 'string', 'max:255', Rule::unique('suppliers', 'name')->ignore($this->supplier)],
        ];
    }
}
