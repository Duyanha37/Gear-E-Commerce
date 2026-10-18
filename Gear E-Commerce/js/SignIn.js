document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const username_emailInput = document.getElementById('username_email');
    const passwordError = document.getElementById('password_error');
    const username_emailError = document.getElementById('username_email_error');
    const signinForm = document.querySelector('.signin-form');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value.trim();
        const isValid = passwordRegex.test(val);

        if (!isValid && val !== '') {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ cái và số.';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    username_emailInput.addEventListener('input', () => {
        const val = username_emailInput.value.trim();
        const isValid = emailRegex.test(val) || usernameRegex.test(val);

        if (!isValid && val !== '') {
            username_emailError.textContent = 'Email hoặc tên đăng nhập không hợp lệ.';
            username_emailError.style.display = 'block';
        } else {
            username_emailError.style.display = 'none';
        }
    });

    const checkvalidateForm = () => {
        let isValid = true;
        const username_emailVal = username_emailInput.value.trim();
        const passwordVal = passwordInput.value.trim();

        if (username_emailVal === '') {
            username_emailError.textContent = 'Vui lòng nhập email hoặc tên đăng nhập.';
            username_emailError.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(username_emailVal) && !usernameRegex.test(username_emailVal) && username_emailVal !== 'admin') {
            username_emailError.textContent = 'Email hoặc tên đăng nhập không hợp lệ.';
            username_emailError.style.display = 'block';
            isValid = false;
        }

        if (passwordVal === '') {
            passwordError.textContent = 'Vui lòng nhập mật khẩu.';
            passwordError.style.display = 'block';
            isValid = false;
        }

        return isValid;
    };

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkvalidateForm()) {
            signinForm.submit();
        }else {
            return;
        }
    });
});
