<?php
/**
 * app\Http\Middleware\PaginateAPI.php
 *
 * Date-Time: 6/17/2021
 * Time: 8:03 PM
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Class PaginateAPI
 * @package App\Http\Middleware
 */
class PaginateAPI
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if (!method_exists($response, 'getData')) {
            return $response;
        }

        $data = $response->getData(true);
        if (isset($data['links'])) {
            unset($data['links']);
        }

        if (isset($data['meta'])) {
            $data['pagination'] = [
                'total' => $data['meta']['total'],
                'count' => $data['meta']['total'],
                'current' => $data['meta']['current_page'],
                'pageSize' => $data['meta']['per_page']
            ];
            unset($data['meta']);
        }

        $response->setData($data);

        return $response;
    }
}
