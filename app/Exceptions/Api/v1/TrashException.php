<?php
/**
 * app\Exceptions\Api\v1\TrashException.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:50 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Exceptions\Api\v1;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Class TrashException
 * @package App\Exceptions\Api\v1
 */
class TrashException extends Exception
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
            'message' => "This item not exists in trash.",
            'status' => 400
        ],400);
    }
}
