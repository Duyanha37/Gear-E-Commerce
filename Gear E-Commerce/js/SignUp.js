document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('.signup-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmpasswordInput = document.getElementById('confirm-password');
    const fullnameError = document.getElementById('fullname-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const passwordError = document.getElementById('password-error');
    const confirmpasswordError = document.getElementById('confirm-password-error');
    const regexFullname = /^[a-zA-ZÀ-ỹ\s]+$/;
    const regexPhone = /^0[0-9]{9}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    fullnameInput.addEventListener('input', () => {
        if (!regexFullname.test(fullnameInput.value) && fullnameInput.value.trim() !== '') {
            fullnameError.textContent = 'Họ và tên chỉ được phép chứa chữ cái và khoảng trắng.';
            fullnameError.style.display = 'block';
        } else {
            fullnameError.style.display = 'none';
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.validity.typeMismatch && emailInput.value.trim() !== '') {
            emailError.textContent = 'Địa chỉ email không hợp lệ.';
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });

    phoneInput.addEventListener('input', () => {
        if (!regexPhone.test(phoneInput.value) && phoneInput.value.trim() !== '') {
            phoneError.textContent = 'Số điện thoại không hợp lệ.';
            phoneError.style.display = 'block';
        } else {
            phoneError.style.display = 'none';
        }
    });

    passwordInput.addEventListener('input', () => {
        if (!passwordRegex.test(passwordInput.value) && passwordInput.value.trim() !== '') {
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
            fullnameError.textContent = 'Họ và tên không được để trống.';
            fullnameError.style.display = 'block';
            isValid = false;
        }
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Địa chỉ email không được để trống.';
            emailError.style.display = 'block';
            isValid = false;
        }
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Số điện thoại không được để trống.';
            phoneError.style.display = 'block';
            isValid = false;
        }
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Mật khẩu không được để trống.';
            passwordError.style.display = 'block';
            isValid = false;
        }
        if (confirmpasswordInput.value.trim() === '') {
            confirmpasswordError.textContent = 'Xác nhận mật khẩu không được để trống.';
            confirmpasswordError.style.display = 'block';
            isValid = false;
        }
        return isValid;
    };

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkvalidateForm()) {
            signupForm.submit();
        } else {
            return;
        }
    });
});