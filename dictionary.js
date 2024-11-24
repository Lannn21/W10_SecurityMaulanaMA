const crypto = require('crypto');
const https = require('https');

// Hash target yang akan diretas
const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// URL ke file daftar kata sandi
const url = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt';

// Fungsi untuk menghitung hash MD5
const md5Hash = (data) => {
  return crypto.createHash('md5').update(data).digest('hex');
};

// Melakukan serangan dictionary
const dictionaryAttack = () => {
  https.get(url, (res) => {
    let data = '';

    // Mengumpulkan potongan data
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Memproses data setelah selesai diunduh
    res.on('end', () => {
      const words = data.split('\n');

      for (const word of words) {
        const hash = md5Hash(word.trim());
        if (hash === targetHash) {
          console.log(`Kata sandi ditemukan: ${word}`);
          return;
        }
      }

      console.log('Kata sandi tidak ditemukan di dalam daftar.');
    });
  }).on('error', (err) => {
    console.error('Kesalahan saat mengunduh daftar kata sandi:', err.message);
  });
};

// Memulai serangan
dictionaryAttack();
