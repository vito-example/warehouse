<?php
/**
 * app\Models\Transfer.php
 *
 * Date-Time: 6/16/2021
 * Time: 10:53 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Models;

use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Transfer
 * @package App\Models
 * @property integer $id
 * @property string $transferable_type
 * @property integer $transferable_id
 * @property integer $from_warehouse_id
 * @property integer $to_warehouse_id
 * @property integer $count
 * @property string $date
 * @property string $created_at
 * @property string $updated_at
 * @property string|null $deleted_at
 */
class Transfer extends Model
{
    use HasFactory,softDeletes,ScopeFilter;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'transfers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'from_warehouse_id',
        'to_warehouse_id',
        'count',
        'date'
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
        ];
    }

    /**
     * @return MorphTo
     */
    public function transferable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return HasOne
     */
    public function transferFrom(): HasOne
    {
        return $this->hasOne(WareHouse::class,'id','from_warehouse_id');
    }

    /**
     * @return HasOne
     */
    public function transferTo(): HasOne
    {
        return $this->hasOne(WareHouse::class,'id','to_warehouse_id');
    }
}
