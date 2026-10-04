document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    const passwordError = document.getElementById('password-error');
    const usernameError = document.getElementById('username-error');
    const signinForm = document.querySelector('.signin-form');

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length < 8) {
            passwordError.innerHTML = 'Mật khẩu phải có ít nhất 8 ký tự.';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.length < 3 || usernameInput.value.length > 20) {
            usernameError.innerHTML = 'Tên đăng nhập phải có từ 3 đến 20 ký tự.';
            usernameError.style.display = 'block';
        } else {
            usernameError.style.display = 'none';
        }
    });

    const checkvalidateForm = (e) => {
        let isValid = true;
        let usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/;
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        if(usernameRegex.test(usernameInput.value) === false){
            usernameError.innerHTML = 'Tên đăng nhập phải có ít nhất một chữ cái.';
            usernameError.style.display = 'block';
            isValid = false;
        }
        if(passwordRegex.test(passwordInput.value) === false){
            passwordError.innerHTML = 'Mật khẩu phải bao gồm chữ cái và số.';
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }

    signinForm.addEventListener('submit', (e) => {
        if(!checkvalidateForm()){
            e.preventDefault();
            return;
        }
    });
});