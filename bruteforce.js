const crypto = require('crypto');

const targetHash = '5531a5834816222280f20d1ef9e95f69'; // hash dari target

function md5(input) { // membuat hash berupa md5
  return crypto.createHash('md5').update(input).digest('hex');
}

// brute force
function bruteForcePin() {
  for (let i = 0; i <= 9999; i++) {
    const pin = i.toString().padStart(4, '0'); // membuat pin selalu 4 digit
    const hash = md5(pin);
    
    if (hash === targetHash) {
      return pin; 
    }
  }
  return null; 
}

const pin = bruteForcePin();
if (pin) {
  console.log(`PIN Alice adalah: ${pin}`);
} else {
  console.log('PIN tidak ditemukan.');
}