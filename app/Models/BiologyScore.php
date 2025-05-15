<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BiologyScore extends Model
{
    protected $table = 'biology_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}