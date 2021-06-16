<?php
/**
 * app\Models\Product.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:18 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Models;

use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Product
 * @package App\Models
 * @property integer $id
 * @property integer $supplier_id
 * @property string $name
 * @property string $created_at
 * @property string $updated_at
 * @property string|null $deleted_at
 */
class Product extends Model
{
    use HasFactory, softDeletes, ScopeFilter;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'supplier_id',
        'name'
    ];

    /**
     * @var string
     */
    public $defaultSort = 'created_at';
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

    /**
     * warehouses
     *
     * @return BelongsToMany
     */
    public function warehouses(): BelongsToMany
    {
        return $this->belongsToMany(WareHouse::class, 'product_warehouses')
            ->withPivot(['count', 'date']);
    }

    /**
     * @return MorphMany
     */
    public function transfers(): MorphMany
    {
        return $this->morphMany(Transfer::class, 'transferable');
    }
}
