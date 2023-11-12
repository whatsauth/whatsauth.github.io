# WhatsAuth : Free 2FA, OTP, Notif, WhatsApp Gateway API Gratis

WhatsAuth menghadirkan solusi untuk :
1. Single Sign On
2. 2FA (2 Factor Auth)
3. OTP (One Time Password)
4. Notifikasi WA
5. WhatsApp API Gateway untuk integrasi dengan aplikasi anda


## Persiapan WhatsApp Gateway
Tahapan ini dilakukan terlebih dahulu sebelum melakukan pendaftaran, hal-hal yang harus dipersiapkan antara lain:
1. Siapkan Nomor WhatsApp yang akan dijadikan Gateway API
2. Siapkan WebHook sebagai penerima pesan masuk, jika anda ingin melakukan test apa saja yang dikirim ke webhook bisa menggunakan layanan pipedream.com. Untuk [Contoh Kode WebHook](./webhook)

## Pendaftaran WhatsApp Gateway Melalui Interface Web
Proses nya tinggal buka [wa.my.id](https://wa.my.id) dengan urutan :
1. Scan QR Code dengan scanner QR atau fitur foto dari whatsapp, kakak akan diarahkan masuk ke dalam situs.
2. Input URL dan Secret Webhook kakak terus klik submit.
3. Masukkan Pair Code ke WhatsApp yang ada di Handphone tunggu beberapa saat sampai proses loading di handphone selesai.
   ![WhatsApp Image 2023-11-07 at 01 07 50_3f9cbb85](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/a3e3bca7-d78e-4f74-a2fb-34ef850e91c3)  
   ![WhatsApp Image 2023-11-07 at 01 07 45_d9155096](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/9e44609e-321d-43f6-b760-6a8f038a7411)  
   ![WhatsApp Image 2023-11-07 at 01 07 39_e0a1d259](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/249fab3a-7bba-4b50-b160-41cd6fa825db)  
   Tunggu beberapa menit hingga proses sinkronisasi WhatsApp selesai berjalan.
4. Klik menu Start Device, klik tombol start device untuk memulai menggunakan WhatsApp API dari nomor whatsapp kakak.
5. Masuk menu Kirim Pesan untuk mengirimkan pesan
6. Dokumen api ada di wa.my.id/apidocs

## Pendaftaran WhatsApp Gateway Melalui API
Proses runutan pendaftaran API melalui :
1. Buka website [wa.my.id](https://wa.my.id) kemudian scan QR Code dengan menggunakan WhatsApp yang akan dijadikan API Gateway.Jika berhasil masuk, silahkan inputkan URL dan Secret WebHook kakak. Setelah klik submit maka akan mendapatkan token untuk akses API dan kode untuk pairing(Pair Code) dengan HP kakak.  
   ![image](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/b8689bbb-25f4-44fc-8356-231844e24a8f)   
2. Buka web [apidocs](https://wa.my.id/apidocs/) klik bagian Authorize dan masukkan token ke dalam kolom Value: dan klik Authorize  
   ![image](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/78d313a7-345f-40fe-9cf6-7cbf58fbba2e)  
   ![image](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/54826caf-597a-4151-938c-bbb077b23741)  
3. Klik API signup, klik Try it out. Kemudian masukkan URL dan Secret dari WebHook yang sudah dibuat sebelumnya. Lihat respon, simpan baik baik token yang diterima, token tersebut berlaku selama 30 hari.
   ![image](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/fd89a320-3228-4cad-85d8-ecefd9a324e5)  
4. Daftarkan device pada bagian API device. Klik Try it out, kemudian masukkan token pada langkah sebelumnya. Ketika execute, maka akan ada notifikasi Pair Device pada handphone. Masukkan kode unik dari respon server field code ke WhatsApp pair device di handphone.  
   ![image](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/c55f0c20-1586-4c54-a676-b0ffa9b73f17)  
   ![WhatsApp Image 2023-11-07 at 01 07 50_3f9cbb85](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/a3e3bca7-d78e-4f74-a2fb-34ef850e91c3)  
   ![WhatsApp Image 2023-11-07 at 01 07 45_d9155096](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/9e44609e-321d-43f6-b760-6a8f038a7411)  
   ![WhatsApp Image 2023-11-07 at 01 07 39_e0a1d259](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/249fab3a-7bba-4b50-b160-41cd6fa825db)  
   Tunggu beberapa menit hingga proses sinkronisasi WhatsApp selesai berjalan.
6. Mencoba mengirimkan notif pesan kepada nomor telepon tujuan. Buka API message klik Try it out, isi to,isgroup dan message. Ketika klik execute maka akan ada notif pesan ke nomor tujuan dari nomor Gateway yang didaftarkan.
   ![image](https://github.com/whatsauth/whatsauth.github.io/assets/11188109/74d73883-2c91-4c22-a35c-1a4e2ef88977)  

## QRCode Login
API whatsauth dapat digunakan untuk pengembangan implementasi SSO, login menggunakan QR. Caranya deploy dahulu [JS ini](https://github.com/whatsauth/js).
