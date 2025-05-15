<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChemistryScore extends Model
{
    protected $table = 'chemistry_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}