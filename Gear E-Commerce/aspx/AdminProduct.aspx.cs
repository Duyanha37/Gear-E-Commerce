using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Gear_E_Commerce
{
    public partial class AdminProduct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string username = Session["username"].ToString();
            adminName.InnerHtml = username;
            adminAvatar.InnerHtml = username.Substring(0, 1).ToUpper();
            List<Product> products = (List<Product>)Application["Products"];
        }
    }
}