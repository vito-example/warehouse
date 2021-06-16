<?php
/**
 * app\Exceptions\Api\v1\UpdateException.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:46 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Exceptions\Api\v1;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Class UpdateException
 * @package App\Exceptions\Api\v1
 */
class UpdateException extends Exception
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
            'message' => "Resource not updated.",
            'status' => 400
        ],400);
    }}
