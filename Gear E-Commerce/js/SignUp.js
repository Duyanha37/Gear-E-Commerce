document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('.signup-form');
    const fullnameInput = document.getElementById('fullname');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmpasswordInput = document.getElementById('confirm-password');
    const fullnameError = document.getElementById('fullname-error');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const confirmpasswordError = document.getElementById('confirm-password-error');

    fullnameInput.addEventListener('input', () => {
        let regexFullname = /^[a-zA-ZÀ-ỹ\s]+$/;
        if (regexFullname.test(fullnameInput.value) === false) {
            fullnameError.textContent = 'Họ và tên chỉ được phép chứa chữ cái và khoảng trắng.';
            fullnameError.style.display = 'block';
        } else {
            fullnameError.style.display = 'none';
        }
    });

    usernameInput.addEventListener('input', () => {
        let usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/;
        if (usernameRegex.test(usernameInput.value) === false) {
            usernameError.textContent = 'Tên đăng nhập không hợp lệ.';
            usernameError.style.display = 'block';
        } else {
            usernameError.style.display = 'none';
        }
    });

    passwordInput.addEventListener('input', () => {
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(passwordInput.value) === false) {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ cái và số.';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    confirmpasswordInput.addEventListener('input', () => {
        if (confirmpasswordInput.value !== passwordInput.value) {
            confirmpasswordError.textContent = 'Xác nhận mật khẩu không khớp.';
            confirmpasswordError.style.display = 'block';
        } else {
            confirmpasswordError.style.display = 'none';
        }
    });

    const checkvalidateForm = (e) => {
        let isValid = true;
        if (fullnameInput.value.trim() === '') {
            fullnameError.innerHTML = 'Họ và tên không được để trống.';
            fullnameError.style.display = 'block';
            isValid = false;
        }
        if (usernameInput.value.trim() === '') {
            usernameError.innerHTML = 'Tên đăng nhập không được để trống.';
            usernameError.style.display = 'block';
            isValid = false;
        }
        if (passwordInput.value.trim() === '') {
            passwordError.innerHTML = 'Mật khẩu không được để trống.';
            passwordError.style.display = 'block';
            isValid = false;
        }
        if (confirmpasswordInput.value.trim() === '') {
            confirmpasswordError.innerHTML = 'Xác nhận mật khẩu không được để trống.';
            confirmpasswordError.style.display = 'block';
            isValid = false;
        }
        return isValid;
    };

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkvalidateForm()) {
            alert('Đăng ký thành công!');
            signupForm.submit();
        } else {
            return;
        }
    });
});