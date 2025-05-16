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
use App\Models\GDCDScore;
use Illuminate\Support\Facades\DB;

class SubjectController extends Controller
{

    public function generateReport($mon_hoc)
    {
        // Mapping từ tên môn học sang model tương ứng
        $modelMap = [
            'toan' => \App\Models\MathScore::class,
            'vat_li' => \App\Models\PhysicsScore::class,
            'hoa_hoc' => \App\Models\ChemistryScore::class,
            'sinh_hoc' => \App\Models\BiologyScore::class,
            'lich_su' => \App\Models\HistoryScore::class,
            'dia_li' => \App\Models\GeographyScore::class,
            'ngu_van' => \App\Models\LiteratureScore::class,
            'ngoai_ngu' => \App\Models\EnglishScore::class,
            'gdcd' => \App\Models\GDCDScore::class,
        ];

        if (!isset($modelMap[$mon_hoc])) {
            return response()->json(['message' => 'Môn học không hợp lệ'], 400);
        }

        $model = $modelMap[$mon_hoc];

        $report = $model::selectRaw("
                COUNT(CASE WHEN score >= 8 THEN 1 END) AS `8+`,
                COUNT(CASE WHEN score >= 6 AND score < 8 THEN 1 END) AS `6-8`,
                COUNT(CASE WHEN score >= 4 AND score < 6 THEN 1 END) AS `4-6`,
                COUNT(CASE WHEN score < 4 THEN 1 END) AS `4-`
            ")->first();

        return response()->json([
            'subject' => $mon_hoc,
            'report' => $report,
        ]);
    }

    public function subjectStatistics()
    {
        $modelMap = [
            'toan' => \App\Models\MathScore::class,
            'vat-li' => \App\Models\PhysicsScore::class,
            'hoa-hoc' => \App\Models\ChemistryScore::class,
            'sinh-hoc' => \App\Models\BiologyScore::class,
            'lich-su' => \App\Models\HistoryScore::class,
            'dia-li' => \App\Models\GeographyScore::class,
            'ngu-van' => \App\Models\LiteratureScore::class,
            'ngoai-ngu' => \App\Models\EnglishScore::class,
            'gdcd' => \App\Models\GDCDScore::class,
        ];

        $result = [];

        foreach ($modelMap as $subjectName => $model) {
            $stats = $model::selectRaw("
                COUNT(CASE WHEN score >= 8 THEN 1 END) AS `8+`,
                COUNT(CASE WHEN score >= 6 AND score < 8 THEN 1 END) AS `6-8`,
                COUNT(CASE WHEN score >= 4 AND score < 6 THEN 1 END) AS `4-6`,
                COUNT(CASE WHEN score < 4 THEN 1 END) AS `4-`
            ")->first();

            $result[$subjectName] = $stats;
        }

        return response()->json($result);
    }


    public function getTopStudents()
    {
        // Lấy danh sách học sinh và cộng điểm từ 3 bảng riêng biệt
        $topStudents = \App\Models\Student::select('students.sbd', 'students.ma_ngoai_ngu')
            ->join('math_scores', 'students.id', '=', 'math_scores.student_id')
            ->join('physics_scores', 'students.id', '=', 'physics_scores.student_id')
            ->join('chemistry_scores', 'students.id', '=', 'chemistry_scores.student_id')
            ->selectRaw('
                math_scores.score as toan,
                physics_scores.score as vat_li,
                chemistry_scores.score as hoa_hoc,
                (math_scores.score + physics_scores.score + chemistry_scores.score) as tong_diem
            ')
            ->orderByDesc('tong_diem')
            ->limit(10)
            ->get();

        return response()->json($topStudents);
    }

}


