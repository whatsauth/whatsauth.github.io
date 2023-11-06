# WhatsAuth : Free 2FA, OTP, Notif, API WhatsApp Gratis

WhatsAuth menghadirkan solusi untuk :
1. Single Sign On
2. 2FA (2 Factor Auth)
3. OTP (One Time Password)
4. Notifikasi WA
5. API untuk integrasi dengan aplikasi anda

## Persiapan
Tahapan ini dilakukan terlebih dahulu sebelum melakukan pendaftaran, hal-hal yang harus dipersiapkan antara lain:
1. Siapkan Nomor WhatsApp yang akan dijadikan Gateway API
2. Siapkan WebHook sebagai penerima pesan masuk. [Contoh Kode WebHook](https://github.com/whatsauth/webhook)
3. [Opsional jika dibutuhkan] Siapkan laman login untuk aplikasi login menggunakan QRCode

## Pendaftaran
Proses runutan pendaftaran API melalui :
1. Buka website [wa.my.id](https://wa.my.id) kemudian scan QR Code dengan menggunakan WhatsApp yang akan dijadikan API Gateway.Jika berhasil masuk akan mendapatkan token sementara yang berlaku 2 jam
2. Buka web [apidocs](https://wa.my.id/apidocs/) klik bagian Authorize dan masukkan token ke dalam kolom Value: dan klik Authorize
3. Klik API signup, klik Try it out. Kemudian masukkan URL dan Secret dari WebHook yang sudah dibuat sebelumnya. Lihat respon, simpan baik baik token yang diterima, token tersebut berlaku selama 30 hari.
4. Daftarkan device pada bagian API device. Klik Try it out, kemudian masukkan token pada langkah sebelumnya. Ketika execute, maka akan ada notifikasi Pair Device pada handphone. Masukkan kode unik dari respon server bagian code ke WhatsApp pair device.
5. Mencoba mengirimkan notif pesan kepada nomor telepon tujuan. Buka API message klik Try it out, isi to,isgroup dan message. Ketika klik execute maka akan ada notif pesan ke nomor tujuan dari nomor Gateway yang didaftarkan.
6. [Opsional] API whatsauth digunakan untuk pengembangan lanjutan, jika anda ingin melakukan implementasi SSO, login menggunakan QR, implementasikan deploy dahulu [JS ini](https://github.com/whatsauth/js).
