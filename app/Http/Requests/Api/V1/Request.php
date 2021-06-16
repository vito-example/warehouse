<?php
/**
 * app\Http\Requests\Api\V1\Request.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:21 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Http\Requests\Api\V1;

use App\Exceptions\Api\v1\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class Request
 * @package App\Http\Requests\Api\V1
 */
class Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @return void
     *
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator): void
    {
        throw new ValidationException($validator->errors());
    }
}
