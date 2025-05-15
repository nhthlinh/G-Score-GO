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
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function checkScore($sbd)
    {
        $student = Student::where('sbd', $sbd)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $studentId = $student->id;

        $scores = [
            'toan' => MathScore::where('student_id', $studentId)->value('score') ?? 0,
            'ngu_van' => LiteratureScore::where('student_id', $studentId)->value('score') ?? 0,
            'ngoai_ngu' => EnglishScore::where('student_id', $studentId)->value('score') ?? 0,
            'vat_li' => PhysicsScore::where('student_id', $studentId)->value('score') ?? 0,
            'hoa_hoc' => ChemistryScore::where('student_id', $studentId)->value('score') ?? 0,
            'sinh_hoc' => BiologyScore::where('student_id', $studentId)->value('score') ?? 0,
            'lich_su' => HistoryScore::where('student_id', $studentId)->value('score') ?? 0,
            'dia_li' => GeographyScore::where('student_id', $studentId)->value('score') ?? 0,
            'gdcd' => GdcdScore::where('student_id', $studentId)->value('score') ?? 0,
        ];

        return response()->json([
            'sbd' => $student->sbd,
            'ma_ngoai_ngu' => $student->ma_ngoai_ngu,
            'scores' => $scores,
        ]);
    }
}