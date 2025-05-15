<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Subject;
use App\Models\MathScore;
use App\Models\PhysicsScore;
use App\Models\ChemistryScore;
use App\Models\BiologyScore;
use App\Models\HistoryScore;
use App\Models\GeographyScore;
use App\Models\LiteratureScore;
use App\Models\EnglishScore;
use App\Models\GdcdScore;

class ChemistryController extends Controller
{
    public function getTopStudents()
    {
        $topStudents = Student::select('sbd', 'hoa_hoc')
            ->orderByRaw('hoa_hoc DESC')
            ->limit(10)
            ->get();

        return response()->json($topStudents);
    }
}