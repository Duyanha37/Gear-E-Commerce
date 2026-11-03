using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.EnterpriseServices;
using System.IO;

namespace Gear_E_Commerce.aspx
{
    public partial class SaveProduct : System.Web.UI.Page
    {
        private bool isApiRequest = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Request.HttpMethod == "GET" && Request.Headers["Service-Name"] == "GetProducts")
            {
                GetProducts();
                return;
            }
            if(Request.HttpMethod == "GET" && Request.Headers["Service-Name"] == "GetProductByID")
            {
                GetProductByID();
                return;
            }
            if(Request.HttpMethod == "PUT" && Request.Headers["Service-Name"] == "UpdateProduct")
            {
                UpdateProduct();
                return;
            }
            if(Request.HttpMethod == "DELETE" && Request.Headers["Service-Name"] == "DeleteProduct")
            {
                DeleteProduct();
                return;
            }
        }
        
        private void GetProducts()
        {
            List<Product> products = (List<Product>)Application["Products"];
            Response.Clear();
            Response.ContentType = "application/json";
            JavaScriptSerializer seri = new JavaScriptSerializer();
            Response.StatusCode = 200;
            Response.Write(seri.Serialize(products));
            Context.ApplicationInstance.CompleteRequest();
            return;
        }

        private void GetProductByID()
        {
            string productID = Request.QueryString["productID"];
            List<Product> products = (List<Product>)Application["Products"];
            Response.Clear();
            Response.ContentType = "application/json";
            Product product = products.FirstOrDefault(p => p.productID == productID);
            if (product != null)
            {
                Response.StatusCode = 200;
                JavaScriptSerializer seri = new JavaScriptSerializer();
                Response.Write(seri.Serialize(product));
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
            }
        }

        private void UpdateProduct()
        {
            List<Product> products = (List<Product>)Application["Products"];
            string requestBody;
            using (StreamReader reader = new StreamReader(Request.InputStream))
            {
                requestBody = reader.ReadToEnd();
            }
            JavaScriptSerializer seri = new JavaScriptSerializer();
            Product updatedProduct = seri.Deserialize<Product>(requestBody);
            Product product = products.FirstOrDefault(p => p.productID == updatedProduct.productID);
            if (product != null)
            {
                product = updatedProduct;
                Response.StatusCode = 200;
                Application["Products"] = products;
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
            }
        }

        private void DeleteProduct()
        {
            List<Product> products = (List<Product>)Application["Products"];
            string productID = Request.QueryString["productID"];
            Product product = products.FirstOrDefault(p => p.productID == productID);
            if (product != null)
            {
                products.Remove(product);
                Response.StatusCode = 200;
                Application["Products"] = products;
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
            }
        }
    }
}