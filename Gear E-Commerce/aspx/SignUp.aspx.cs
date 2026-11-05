using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Gear_E_Commerce
{
    public partial class SignUp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                string fullname = Request.Form["fullname"];
                string email = Request.Form["email"];
                string phone = Request.Form["phone"];
                string password = Request.Form["password"];
                string confirm_password = Request.Form["confirm-password"];
                Boolean isValid = true;

                if (string.IsNullOrWhiteSpace(fullname))
                {
                    fullname_error.InnerHtml = "Họ tên không được để trống.";
                    isValid = false;
                }
                if(string.IsNullOrWhiteSpace(email))
                {
                    email_error.InnerText = "Email không được để trống.";
                    email_error.Style["display"] = "block";
                    isValid = false;
                }
                if(string.IsNullOrWhiteSpace(phone))
                {
                    phone_error.InnerText = "Số điện thoại không được để trống.";
                    phone_error.Style["display"] = "block";
                    isValid = false;
                }
                if(string.IsNullOrWhiteSpace(password))
                {
                    password_error.InnerText = "Mật khẩu không được để trống.";
                    password_error.Style["display"] = "block";
                    isValid = false;
                }
                if(string.IsNullOrWhiteSpace(confirm_password) || password != confirm_password)
                {
                    confirm_password_error.InnerText = "Xác nhận mật khẩu không hợp lệ.";
                    confirm_password_error.Style["display"] = "block";
                    isValid = false;
                }
                if (!isValid) return;

                int index = email.IndexOf("@");
                string username = email.Substring(0, index);
                List<Member> memberList = (List<Member>)Application["MemberList"];
                int count = memberList.Count(m => m.Email == email || m.Username == username);
                
                if(count > 0)
                {
                    email_error.InnerText = "Email đã tồn tại.";
                    email_error.Style["display"] = "block";
                    return;
                }else
                {
                    Member newMember = new Member((memberList.Max(m => int.Parse(m.memberID))+1).ToString(), "Member", fullname, username, password, email, phone);
                    memberList.Add(newMember);
                    Application["MemberList"] = memberList;
                    List<CartMember> cartMembers = (List<CartMember>)Application["CartMemberList"];
                    CartMember newCartMember = new CartMember((cartMembers.Max(cm => int.Parse(cm.CartID))+1).ToString(), newMember.memberID);
                    cartMembers.Add(newCartMember);
                    Application["CartMemberList"] = cartMembers;
                    Response.Redirect("SignIn.aspx");
                }
            }
        }
    }
}