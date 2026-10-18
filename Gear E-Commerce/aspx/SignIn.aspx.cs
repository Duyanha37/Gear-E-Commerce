using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Gear_E_Commerce
{
    public partial class SignIn : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                string username_email = Request.Form["username_email"];
                string password = Request.Form["password"];
                Boolean isValid = true;
                if (string.IsNullOrWhiteSpace(username_email))
                {
                    username_email_error.InnerHtml = "Vui lòng nhập đầy đủ thông tin!";
                    isValid = false;
                }
                if (string.IsNullOrWhiteSpace(password))
                {
                    password_error.InnerHtml = "Vui lòng nhập đầy đủ thông tin!";
                    isValid = false;
                }
                if (!isValid) return;

                List<Member> memberList = (List<Member>)Application["MemberList"];
                Member mb = memberList.FirstOrDefault(m => (m.Username == username_email || m.Email == username_email) && m.Password == password);

                if (mb == null)
                {
                    Response.Write("Lỗi không có mb");
                    username_email_error.InnerHtml = "Tên đăng nhập hoặc mật khẩu không đúng!";
                }else
                {
                    Session["memberID"] = mb.memberID;
                    Session["username"] = mb.Username;
                    Session["Role"] = mb.Role;
                    Response.Redirect("Home.aspx");
                }
            }
        }
    }
}