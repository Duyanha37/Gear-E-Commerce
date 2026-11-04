using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Gear_E_Commerce.aspx
{
    public partial class Home : System.Web.UI.Page
    {
        protected string ProductListJson = "[]";

        protected void Page_Load(object sender, EventArgs e)
        {
            object products = Application["Products"] ?? Application["ProductList"] ?? new object[0];
            ProductListJson = new JavaScriptSerializer().Serialize(products);
        }
    }
}
