export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'

// Untuk membuat user otomatis login dengan akun ablahum@gmail.com saat mode production, Anda perlu menambahkan logika autentikasi di bagian sistem autentikasi aplikasi Anda, bukan di file env ini.
// File ini hanya mendeteksi mode environment.
// Anda bisa menggunakan variabel di bawah ini untuk membantu logika di file autentikasi Anda:

export const AUTO_LOGIN_EMAIL = isProd ? 'ablahum@gmail.com' : undefined

// Di file autentikasi (misal: auth.ts atau middleware), Anda bisa cek:
// if (isProd && !user) { loginDenganEmail(AUTO_LOGIN_EMAIL) }

//
// Penjelasan singkat (dalam Bahasa Indonesia):
// - Tidak disarankan melakukan auto-login di file env.
// - Lakukan auto-login di sistem autentikasi, gunakan variabel di atas sebagai acuan email auto-login saat production.
