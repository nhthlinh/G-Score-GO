<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GDCDScore extends Model
{
    protected $table = 'gdcd_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}