<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * 複数代入可能な属性
     *
     * @var array
     */
    protected $fillable = ['title', 'is_done', 'user_id'];

    /**
     * キャストする必要のある属性
     *
     * @var array
     */
    protected $casts = [
        'is_done' => 'boolean',
        'user_id' => 'int'
    ];
}
