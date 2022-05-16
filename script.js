//Form inputlarını id ile tek tek alıyoruz
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

//Forma kayıt olduğunda hata var ise error mesajı verme
function error(input, message) {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}

function success(input) {
    input.className = 'form-control is-valid';
}

//İnputların değerini regex ile kontrol ediyoruz
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(re.test(input.value)) {
        success(input);
    } else {
        error(input, 'hatalı bir mail adresi');
    }
}

//İnputların değerlerinin girilmesinin zorunlu hale getiriyoruz
function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if(input.value === '') {
            error(input, `${input.id} is required.`);
        } else {
            success(input);
        }
    });  
}

// İnputlara girilen değerlerin minumun ve maximum ne kadar olmasını belirliyoruz
function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} en az ${min} karakter olmalıdır`);
    }else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakter olmalıdır`);
    }else {
        success(input);
    }
}

//Şifre ve Şifreyi tekrar gir inputların değerlerinin eşit olmaması durumunda eşleşmiyor mesajı verme
function checkPasswords(input1,input2) {
    if(input1.value !== input2.value) {
        error(input2, 'Parolalar eşleşmiyor');
    }
}

// Telefon karakterinin regex ile number olma durumunu kontrol ediyoruz
function checkPhone(input) {
    var exp = /^\d{10}$/;   
    if(!exp.test(input.value)) 
        error(input, 'Telefon 10 karakterli olmalıdır.');
}

// furma tıklandığında belirlediğimiz fonksiyonları çalıştırmaya başlıyoruz.
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username,email,password,repassword,phone]);
    checkEmail(email);
    checkLength(username,7,15);
    checkLength(password,7,12);
    checkPasswords(password,repassword);
    checkPhone(phone);
});
