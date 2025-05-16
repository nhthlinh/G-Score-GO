<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# G-Score-GO

Đây là backend của dự án **G-Score**, được phát triển bằng **Laravel**.

---

## Yêu cầu hệ thống

- PHP >= 8.1
- Composer
- MySQL hoặc Railway DB
- Node.js (nếu dùng Laravel Mix hoặc Vite cho frontend tích hợp)

---

## Hướng dẫn chạy local

1. **Clone project & cài đặt thư viện**

```bash
   git clone https://github.com/yourusername/g-score-backend.git
   cd g-score-backend
   composer install
```

2. **Tạo file môi trường**

   ```bash
   cp .env.example .env
   ```

3. **Cấu hình `.env` với thông tin database**

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. **Tạo key ứng dụng và migrate database**

   ```bash
   php artisan key:generate
   php artisan migrate --seed
   ```

5. **Chạy server**

   ```bash
   php artisan serve
   ```

   Mặc định chạy ở: [http://localhost:8000](http://localhost:8000)

---

## Cấu trúc thư mục cơ bản

```
├── app/
│   ├── Http/Controllers/         # Controller xử lý request
│   ├── Models/                   # Model Eloquent
├── database/
│   ├── migrations/               # File tạo bảng DB
│   ├── seeders/                  # File seed dữ liệu
├── public/                       # Thư mục public (index.php)
├── routes/
│   └── api.php                   # Khai báo route API
├── .env                          # Thông tin cấu hình
└── server.js                     # Script custom cho Railway
```

## DEMO 
```bash
https://g-score-go-production.up.railway.app/
```

