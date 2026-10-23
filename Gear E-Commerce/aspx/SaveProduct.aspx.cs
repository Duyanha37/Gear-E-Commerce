using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Gear_E_Commerce.aspx
{
    public partial class SaveProduct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Request.HttpMethod == "POST")
            {
                string productID = Request.Form["productID"];
                string Name = Request.Form["Name"];
                string Brand = Request.Form["Brand"];
                string Description = Request.Form["Description"];
                long Price = long.Parse(Request.Form["Price"]);
                int Stock = int.Parse(Request.Form["Stock"]);
                string Category = Request.Form["Category"];
                string Image = Request.Form["Image"];
                List<Product> productList = (List<Product>)Application["ProductList"];
                Product pd = productList.FirstOrDefault(p => p.productID == productID);
                if (pd != null)
                {
                    pd.Name = Name;
                    pd.Brand = Brand;
                    pd.Description = Description;
                    pd.Price = Price;
                    pd.Stock = Stock;
                    pd.Category = Category;
                    pd.Image = Image;
                }
                else
                {
                    Product newProduct = new Product(productID, Name, Brand, Description, Price, Stock, Category, Image);
                    productList.Add(newProduct);
                }
                Application["ProductList"] = productList;
            }
        }
    }
}