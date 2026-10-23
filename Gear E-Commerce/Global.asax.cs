using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace Gear_E_Commerce
{
    public class GlobalData : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            List<Member> memberList = new List<Member>();
            Member mb = new Member("1", "Admin", "Nguyễn Trần Duy Anh", "nguyentranduyanh", "duyanh1112", "nguyentranduyanh@gmail.com", "0123456789");
            memberList.Add(mb);
            Application["MemberList"] = memberList;
            List<Product> productList = new List<Product>();
            Product pd = new Product("1", "Logitech G Pro X Superlight", "Logitech", "Chuột gaming không dây", 2490000, 50, "Chuột máy tính", "../assets/images/logitechGPro.jpg");
            productList.Add(pd);
            Application["ProductList"] = productList;
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}