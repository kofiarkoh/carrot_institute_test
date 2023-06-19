<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory, HasUuid;

    protected $guarded = ['id', 'uuid'];


    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
