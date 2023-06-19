<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        $validated = $request->validated();


        /** @var User $user */
        $user = User::whereEmail($validated['email'])->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => 'user not found',
            ]);
        }
        if (!Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'password' => 'invalid credentials',
            ]);
        }




        return response()->json([
            'message' => 'Login successful',
            "data" => $user,
            'token' => $user->createToken($request->header('User-Agent'))->plainTextToken
        ], Response::HTTP_OK);
    }
}
