<?php
/**
 * app\Http\Controllers\Api\V1\TransferController.php
 *
 * Date-Time: 6/16/2021
 * Time: 11:02 PM
 *
 * @author Vito Makhatadze <vitomakhatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\TransferRequest;
use App\Http\Resources\Api\v1\Transfer\TransferCollection;
use App\Repositories\TransferRepositoryInterface;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

/**
 * Class TransferController
 * @package App\Http\Controllers\Api\V1
 */
class TransferController extends Controller
{
    /**
     * @var TransferRepositoryInterface
     */
    private TransferRepositoryInterface $transferRepository;

    /**
     * TransferController constructor.
     * @param TransferRepositoryInterface $transferRepository
     */
    public function __construct(
        TransferRepositoryInterface $transferRepository
    )
    {
        $this->transferRepository = $transferRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param \App\Http\Requests\Api\v1\TransferRequest $request
     *
     * @return \App\Http\Resources\Api\v1\Transfer\TransferCollection
     */
    public function index(TransferRequest $request): TransferCollection
    {
        return new TransferCollection($this->transferRepository->getData($request, ['transferable' => function (MorphTo $morphTo) {
            $morphTo->constrain([
                Product::class
            ]);
        }, 'transferTo', 'transferFrom']));
    }
}
