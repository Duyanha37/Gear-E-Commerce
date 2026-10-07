document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    const passwordError = document.getElementById('password-error');
    const usernameError = document.getElementById('username-error');
    const signinForm = document.querySelector('.signin-form');

    passwordInput.addEventListener('input', () => {
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(passwordInput.value) === false) {
            passwordError.innerHTML = 'Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ cái và số.';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    usernameInput.addEventListener('input', () => {
        let usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/;
        if (usernameRegex.test(usernameInput.value) === false) {
            usernameError.innerHTML = 'Tên đăng nhập không hợp lệ.';
            usernameError.style.display = 'block';
        } else {
            usernameError.style.display = 'none';
        }
    });

    const checkvalidateForm = (e) => {
        let isValid = true;
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Tên đăng nhập không được để trống.';
            usernameError.style.display = 'block';
            isValid = false;
        }
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Mật khẩu không được để trống.';
            passwordError.style.display = 'block';
            isValid = false;
        }
        return isValid;
    };

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkvalidateForm()) {
            signinForm.submit();
        } else {
            return;
        }
    });
});
