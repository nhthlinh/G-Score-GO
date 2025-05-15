<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MathScore extends Model
{
    protected $table = 'math_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}