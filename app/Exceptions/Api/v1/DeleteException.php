<?php
/**
 * app\Exceptions\Api\v1\DeleteException.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:51 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Exceptions\Api\v1;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Class DeleteException
 * @package App\Exceptions\Api\v1
 */
class DeleteException extends Exception
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
            'message' => 'Can not deleted',
            'status' => 400
        ],400);
    }
}
