<?php
/**
 * app\Exceptions\Api\v1\DataNotFoundException.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:43 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Exceptions\Api\v1;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Class DataNotFoundException
 * @package App\Exceptions\Api\v1
 */
class DataNotFoundException extends Exception
{
    public function report()
    {
        //
    }

    /**
     * Return json error for dataNotFound
     *
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => 'Resource not found',
            'status' => 404
        ],404);
    }
}
