<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterUserController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterUserRequest $request)
    {
        $user = User::create($request->all() + ['password' => bcrypt($request->password)]);

        return response()->json([
            'message' => 'user registered successfully',
            'data' => $user,
            'token' =>  $user->createToken($request->header('User-Agent'))->plainTextToken
        ], Response::HTTP_CREATED);
    }
}
