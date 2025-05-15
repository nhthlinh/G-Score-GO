<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\ScoreStatistic;

class UpdateScoreStatistics extends Command
{
    protected $signature = 'stats:update';
    protected $description = 'Cập nhật bảng thống kê điểm theo môn học';

    public function handle()
    {
        $rows = DB::table('scores')
            ->join('subjects', 'scores.subject_id', '=', 'subjects.id')
            ->selectRaw("
                subjects.mon_hoc,
                COUNT(CASE WHEN score >= 8 THEN 1 END) AS score_8_plus,
                COUNT(CASE WHEN score >= 6 AND score < 8 THEN 1 END) AS score_6_8,
                COUNT(CASE WHEN score >= 4 AND score < 6 THEN 1 END) AS score_4_6,
                COUNT(CASE WHEN score < 4 THEN 1 END) AS score_under_4
            ")
            ->groupBy('subjects.mon_hoc')
            ->get();

        foreach ($rows as $row) {
            ScoreStatistic::updateOrCreate(
                ['mon_hoc' => $row->mon_hoc],
                [
                    'score_8_plus' => $row->score_8_plus,
                    'score_6_8' => $row->score_6_8,
                    'score_4_6' => $row->score_4_6,
                    'score_under_4' => $row->score_under_4,
                ]
            );
        }

        $this->info("Cập nhật thống kê thành công.");
    }
}

