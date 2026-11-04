using System;
using System.Web.UI;

namespace Gear_E_Commerce.aspx
{
    public partial class List : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Application["Products"] != null) return;

            Application.Lock();
            try
            {
                if (Application["Products"] == null)
                {
                    object products = Application["ProductList"];
                    if (products != null) Application["Products"] = products;
                }
            }
            finally
            {
                Application.UnLock();
            }
        }
    }
}
