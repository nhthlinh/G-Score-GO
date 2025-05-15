<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Score;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('math_scores')->delete();
        DB::table('physics_scores')->delete();
        DB::table('chemistry_scores')->delete();
        DB::table('biology_scores')->delete();
        DB::table('history_scores')->delete();
        DB::table('geography_scores')->delete();
        DB::table('literature_scores')->delete();
        DB::table('english_scores')->delete();
        DB::table('gdcd_scores')->delete();
        DB::table('students')->delete();
        DB::table('subjects')->delete();

        $this->call([
            SubjectSeeder::class,
        ]);

        $subjectMap = Subject::pluck('id', 'mon_hoc')->toArray();
        $subjectCodes = ['toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'];

        $filePath = storage_path('app/public/diem_thi_thpt_2024.csv');
        $file = fopen($filePath, 'r');

        if (!$file) {
            throw new \Exception("Không thể mở file CSV.");
        }

        $firstRow = true;
        $studentBatch = [];
        $studentData = [];
        $batchSize = 1000;

        while (($row = fgetcsv($file)) !== false) {
            if ($firstRow) {
                $firstRow = false;
                continue;
            }

            // Kiểm tra dữ liệu hợp lệ
            if (!is_array($row) || count($row) < 11) continue;

            $studentBatch[] = [
                'sbd' => $row[0],
                'ma_ngoai_ngu' => $row[10],
            ];

            $studentData[$row[0]] = $row;

            if (count($studentBatch) >= $batchSize) {
                $this->insertBatch($studentBatch, $studentData, $subjectCodes, $subjectMap);
                $studentBatch = [];
                $studentData = [];
            }
        }

        // Insert phần còn lại
        if (!empty($studentBatch)) {
            $this->insertBatch($studentBatch, $studentData, $subjectCodes, $subjectMap);
        }

        fclose($file);
    }

    private function insertBatch($studentBatch, $studentData)
    {
        // Insert students
        Student::insert($studentBatch);

        $studentIds = array_column($studentBatch, 'sbd');
        $studentIdMap = Student::whereIn('sbd', $studentIds)->pluck('id', 'sbd')->toArray();

        // Ánh xạ môn học -> bảng
        $subjectTables = [
            'toan' => 'math_scores',
            'ngu_van' => 'literature_scores',
            'ngoai_ngu' => 'english_scores',
            'vat_li' => 'physics_scores',
            'hoa_hoc' => 'chemistry_scores',
            'sinh_hoc' => 'biology_scores',
            'lich_su' => 'history_scores',
            'dia_li' => 'geography_scores',
            'gdcd' => 'gdcd_scores',
        ];

        $subjectCodes = array_keys($subjectTables);
        $scoreBatches = [];

        // Khởi tạo mảng điểm từng môn
        foreach ($subjectCodes as $code) {
            $scoreBatches[$code] = [];
        }

        foreach ($studentBatch as $s) {
            $sbd = $s['sbd'];
            $id = $studentIdMap[$sbd];
            $row = $studentData[$sbd];

            foreach ($subjectCodes as $i => $code) {
                $score = (float) $row[$i + 1];
                if ($score === 0.0) continue; // Bỏ điểm 0

                $scoreBatches[$code][] = [
                    'student_id' => $id,
                    'score' => $score,
                ];
            }
        }

        // Insert từng batch vào bảng tương ứng
        foreach ($scoreBatches as $code => $data) {
            if (!empty($data)) {
                DB::table($subjectTables[$code])->insert($data);
            }
        }
    }

}
