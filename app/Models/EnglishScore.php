<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnglishScore extends Model
{
    protected $table = 'english_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}