<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryScore extends Model
{
    protected $table = 'history_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}