<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LiteratureScore extends Model
{
    protected $table = 'literature_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}