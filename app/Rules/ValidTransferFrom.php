<?php
/**
 *  app/Rules/ValidTransferFrom.php
 *
 * Date-Time: 18.06.21
 * Time: 09:19
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Rules;

use App\Models\Product;
use Illuminate\Contracts\Validation\Rule;
use phpDocumentor\Reflection\Types\Integer;

/**
 * Class ValidTransferFrom
 * @package App\Rules
 */
class ValidTransferFrom implements Rule
{
    protected Product $product;
    protected int $count;
    protected string $message;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Product $product, int $count)
    {
        $this->product = $product;
        $this->count = $count;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        if (!count($this->product->warehouses)) {
            $this->fail('Transfer from warehouse not exist.');
            return false;
        }
        if ($this->product->warehouses[0]->pivot->count < $this->count) {
            $this->fail('Transfer product more than '. $this->product->warehouses[0]->pivot->count.'.' );
            return false;
        }
        return true;
    }

    /**
     * @param $message
     *
     * @return false
     */
    protected function fail($message): bool
    {
        $this->message = $message;
        return false;

    }
    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return $this->message;
    }
}
