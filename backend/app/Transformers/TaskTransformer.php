<?php

namespace App\Transformers;

use App\Models\Task;
use App\Models\User;
use League\Fractal\TransformerAbstract;

class TaskTransformer extends TransformerAbstract
{


    /**
     * @param Task $task
     *
     * @return array
     */
    public function transform(Task $task)
    {

        return [
            'uuid'                      => $task->uuid,
            'title'                     => $task->description,
            'description'               => $task->description,
            'due_at'                    => $task->due_at,


        ];
    }
}
