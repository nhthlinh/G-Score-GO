<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SubjectController;
use App\Http\Controllers\StudentController;

// Thêm data 
// php artisan migrate
// php -d memory_limit=1024M artisan db:seed --class=StudentSeeder
/*
php artisan make:migration create_students_table
php artisan make:seeder StudentSeeder
php artisan make:model Student 

php artisan migrate
php artisan db:seed   */

Route::get('/', function () {
    return view('welcome');
});

// 1. API để kiểm tra điểm của thí sinh theo Số báo danh (SBD)
// http://localhost:8080/score/{sbd}
Route::get('/score/{sbd}', [StudentController::class, 'checkScore']);

// 2. API để báo cáo phân loại điểm theo các mức điểm
// http://localhost:8080/report/{mon_hoc}
Route::get('/report/{mon_hoc}', [SubjectController::class, 'generateReport']);

// 3. API để thống kê số lượng học sinh theo mức điểm cho từng môn
// http://localhost:8080/report
Route::get('/report', [SubjectController::class, 'subjectStatistics']);

// 4. API để lấy danh sách 10 thí sinh xuất sắc của nhóm A (Toán, Lý, Hóa)
// http://localhost:8080/top-students
Route::get('/top-students', [SubjectController::class, 'getTopStudents']);

