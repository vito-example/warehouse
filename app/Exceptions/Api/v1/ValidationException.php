<?php
/**
 * app\Exceptions\Api\v1\ValidationException.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:23 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Exceptions\Api\v1;

use Exception;
use Illuminate\Http\JsonResponse;
use Throwable;

/**
 * Class ValidationException
 * @package App\Exceptions\Api\v1
 */
class ValidationException extends Exception
{
    public function __construct($message = "", $code = 422, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function report()
    {
        //
    }

    /**
     * Return json error for Validation
     *
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'errors' => $this->message,
            'status' => $this->code
        ], $this->code);
    }
}
