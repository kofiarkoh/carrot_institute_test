<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\UpdateTaskStatusRequest;
use App\Models\Task;
use App\Transformers\TaskTransformer;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = auth()->user()->tasks;
        return response()->json([
            'message' => 'tasks retrieved successfully',
            'data' => fractal()->collection($tasks, new TaskTransformer)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTaskRequest $request)
    {


        $user = auth()->user();
        $task = $user->tasks()->create(
            [
                'status' => 'pending',
                'due_at' => Carbon::parse($request->due_at)->toDateTimeString()
            ] + $request->all()
        );


        return response()->json([
            'message' => 'task created successfully',
            'data' => fractal()->item($task, new TaskTransformer)
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task = tap($task, function ($_task) use ($data, $request) {
            $_task->update(
                ['due_at' => Carbon::parse($request->due_at)->toDateTimeString()] + $data
            );
        });
        return response()->json([
            'message' => 'task updated successfully',
            'data' => fractal()->item($task, new TaskTransformer)
        ], Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {

        return response()->json([
            'message' => 'tasks deleted successfully',

        ]);
    }

    public function updateStatus(UpdateTaskStatusRequest $request, Task $task)
    {

        $task->status = $request->status;
        $task->save();
        return response()->json([
            'message' => 'task status updated successfully',
            'data' => fractal()->item($task, new TaskTransformer)
        ], Response::HTTP_CREATED);
    }
}
