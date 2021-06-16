<?php
/**
 * app\Providers\RepositoryServiceProvider.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:03 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */

namespace App\Providers;

use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\Eloquent\Base\EloquentRepositoryInterface;
use App\Repositories\Eloquent\SupplierRepository;
use App\Repositories\Eloquent\WarehouseRepository;
use App\Repositories\SupplierRepositoryInterface;
use App\Repositories\WarehouseRepositoryInterface;
use Illuminate\Support\ServiceProvider;

/**
 * Class RepositoryServiceProvider
 * @package App\Providers
 */
class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(SupplierRepositoryInterface::class,SupplierRepository::class);
        $this->app->bind(WarehouseRepositoryInterface::class,WarehouseRepository::class);
    }
}
