<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {

        $subjects = [
            ['mon_hoc' => 'toan'],
            ['mon_hoc' => 'ngu_van'],
            ['mon_hoc' => 'vat_li'],
            ['mon_hoc' => 'hoa_hoc'],
            ['mon_hoc' => 'sinh_hoc'],
            ['mon_hoc' => 'lich_su'],
            ['mon_hoc' => 'dia_li'],   
            ['mon_hoc' => 'ngoai_ngu'],
            ['mon_hoc' => 'gdcd'],
        ];

        Subject::insert($subjects);
    }
}

