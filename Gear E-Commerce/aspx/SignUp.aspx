<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SignUp.aspx.cs" Inherits="Gear_E_Commerce.SignUp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign up - GearHouse</title>
    <link rel="stylesheet" href="../css/SignUp.css">
    <script src="../js/SignUp.js"></script>
</head>
<body>
    <div class="auth-page">
        <section class="auth-hero">
            <img src="../assets/images/Circle.png" alt="" class="hero-bg-circles">

            <div class="hero-header">
                <a href="home.html" class="hero-brand" title="GearHouse Home">
                    <img src="../assets/images/Logo-White.png" alt="GearHouse Logo" class="hero-logo">
                    <span class="hero-brand-name">GearHouse</span>
                </a>
            </div>

            <div class="hero-content">
                <span class="hero-tagline">GEAR FOR WHAT'S NEXT</span>
                <h1 class="hero-title">Join the house.</h1>
                <p class="hero-desc">Create your account and build with confidence.</p>
            </div>

            <div class="hero-footer">
                <p class="hero-copyright">&copy; 2026 GearHouse</p>
            </div>
        </section>

        <main class="auth-main">
            <div class="auth-form-container">
                <div class="back-nav">
                    <a href="home.html" class="back-link">
                        <span class="back-arrow">&larr;</span> Trở lại cửa hàng
                </a>
                </div>

                <div class="form-header">
                    <span class="form-badge">Tạo tài khoản</span>
                    <h2 class="form-title">Hãy bắt đầu thôi</h2>
                    <p class="form-subtitle">Nhập thông tin của bạn để tạo tài khoản.</p>
                </div>

                <form class="signup-form" method="POST" runat="server" novalidate>
                    <div class="form-group">
                        <label class="form-label" for="fullname">Họ và tên</label>
                        <input class="form-input" type="text" id="fullname" name="fullname" placeholder="Họ và tên">
                        <span class="form-error-message" id="fullname_error" runat="server" ClientIDMode="Static"></span>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="email">Địa chỉ email</label>
                        <input class="form-input" type="email" id="email" name="email" placeholder="Nhập email">
                        <span class="form-error-message" id="email_error" runat="server" ClientIDMode="Static"></span>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="phone">Số điện thoại</label>
                        <input class="form-input" type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại">
                        <span class="form-error-message" id="phone_error" runat="server" ClientIDMode="Static"></span>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="password">Mật khẩu</label>
                        <input class="form-input" type="password" id="password" name="password" placeholder="Ít nhất 8 ký tự">
                        <span class="form-error-message" id="password_error" runat="server" ClientIDMode="Static"></span>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="confirm-password">Nhập lại mật khẩu</label>
                        <input class="form-input" type="password" id="confirm-password" name="confirm-password" placeholder="Nhập lại mật khẩu của bạn">
                        <span class="form-error-message" id="confirm_password_error" runat="server" ClientIDMode="Static"></span>
                    </div>

                    <button type="submit" class="signup-button">Tạo tài khoản</button>

                    <div class="form-footer">
                        <span class="footer-text">Đã có tài khoản?</span>
                        <a href="SignIn.aspx" class="footer-link">Đăng nhập</a>
                    </div>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
