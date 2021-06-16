<?php
/**
 * app\Models\Warehouse.php
 *
 * Date-Time: 6/16/2021
 * Time: 9:54 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Models;

use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Warehouse
 * @package App\Models
 * @property integer $id
 * @property string $name
 * @property string $created_at
 * @property string $updated_at
 * @property string|null $deleted_at
 */
class Warehouse extends Model
{
    use HasFactory,softDeletes,ScopeFilter;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'warehouses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * @var string
     */
    public $defaultSort = 'id';
    /**
     * @var string
     */
    public $defaultOrder = 'desc';


    /**
     * @return array[]
     */
    public function getFilterScopes(): array
    {
        return [
            'id' => [
                'hasParam' => true,
                'scopeMethod' => 'id'
            ],
            'name' => [
                'hasParam' => true,
                'scopeMethod' => 'name'
            ],
        ];
    }
}
