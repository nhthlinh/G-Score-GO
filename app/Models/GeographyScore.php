<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeographyScore extends Model
{
    protected $table = 'geography_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}