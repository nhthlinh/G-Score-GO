<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhysicsScore extends Model
{
    protected $table = 'physics_scores';

    protected $fillable = ['score', 'student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}