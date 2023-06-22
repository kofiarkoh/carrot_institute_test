<?php

namespace App\Transformers;

use App\Models\Task;
use App\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{


    /**
     * @param User $user
     *
     * @return array
     */
    public function transform(User $user)
    {

        return [
            'name'                     => $user->name,
            'email'                     => $user->email,


        ];
    }
}
