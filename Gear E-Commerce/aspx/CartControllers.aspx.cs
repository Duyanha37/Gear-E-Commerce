using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.IO;
using System.Web.Services.Description;

namespace Gear_E_Commerce.aspx
{
    public partial class CartControllers : System.Web.UI.Page
    {
        private bool isApiRequest = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Request.HttpMethod == "GET" && Request.Headers["Service-Name"] == "GetCartItemsByMemberID")
            {
                isApiRequest = true;
                GetCartItemsByMemberID();
                return;
            }
            if(Request.HttpMethod == "PUT" && Request.Headers["Service-Name"] == "UpdateCartItems")
            {
                isApiRequest = true;
                UpdateCartItems();
                return;
            }
            if(Request.HttpMethod == "DELETE" && Request.Headers["Service-Name"] == "DeleteCartItem")
            {
                isApiRequest = true;
                DeleteCartItem();
                return;
            }
        }

        private void GetCartItemsByMemberID()
        {
            string memberID = Request.QueryString["memberID"];
            List<CartMember> cartMembers = (List<CartMember>)Application["CartMembers"];
            CartMember cartMember = cartMembers.FirstOrDefault(cm => cm.MemberID == memberID);
            if (cartMember != null)
            {
                Response.Clear();
                Response.ContentType = "application/json";
                JavaScriptSerializer seri = new JavaScriptSerializer();
                Response.StatusCode = 200;
                Response.Write(seri.Serialize(cartMember.Items));
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
                return;
            }
        }

        private void UpdateCartItems()
        {
            string memberID = Request.QueryString["memberID"];
            List<CartMember> cartMembers = (List<CartMember>)Application["CartMembers"];
            CartMember cartMember = cartMembers.FirstOrDefault(cm => cm.MemberID == memberID);
            Response.Clear();
            Response.ContentType = "application/json";
            if (cartMember != null)
            {
                string requestBody;
                using (StreamReader reader = new StreamReader(Request.InputStream))
                {
                    requestBody = reader.ReadToEnd();
                }
                JavaScriptSerializer seri = new JavaScriptSerializer();
                CartItem updatedItems = seri.Deserialize<CartItem>(requestBody);
                CartItem cartItem = cartMember.Items.FirstOrDefault(item => item.CartItemID == updatedItems.CartItemID);
                if (cartItem != null)
                {
                    List<Product> products = (List<Product>)Application["Products"];
                    Product product = products.FirstOrDefault(p => p.productID == updatedItems.ProductID);
                    if(product.Stock < updatedItems.Quantity)
                    {
                        Response.StatusCode = 400;
                        Response.Write(seri.Serialize(new { message = "Số lượng hàng không đủ" }));
                        Context.ApplicationInstance.CompleteRequest();
                        return;
                    }
                    else
                    {
                        cartItem = updatedItems;
                        Application["CartMembers"] = cartMembers;
                        Response.StatusCode = 200;
                        Response.Write(seri.Serialize(cartMember.Items));
                        Context.ApplicationInstance.CompleteRequest();
                        return;
                    }
                }
                else
                {
                    Response.StatusCode = 404;
                    return;
                }
            }
            else
            {
                Response.StatusCode = 404;
                return;
            }
        }

        private void DeleteCartItem()
        {
            string memberID = Request.QueryString["memberID"];
            string cartItemID = Request.QueryString["cartItemID"];
            List<CartMember> cartMembers = (List<CartMember>)Application["CartMembers"];
            CartMember cartMember = cartMembers.FirstOrDefault(cm => cm.MemberID == memberID);
            if (cartMember != null)
            {
                CartItem cartItem = cartMember.Items.FirstOrDefault(item => item.CartItemID == cartItemID);
                if (cartItem != null)
                {
                    cartMember.Items.Remove(cartItem);
                    Application["CartMembers"] = cartMembers;
                    Response.StatusCode = 200;
                    return;
                }
                else
                {
                    Response.StatusCode = 404;
                    return;
                }
            }
            else
            {
                Response.StatusCode = 404;
                return;
            }
        }

        protected override void Render(HtmlTextWriter writer)
        {
            if (isApiRequest)
            {
                return;
            }
            base.Render(writer);
        }
    }
}