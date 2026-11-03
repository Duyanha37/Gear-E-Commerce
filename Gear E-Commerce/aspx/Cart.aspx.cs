using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;

namespace Gear_E_Commerce
{
    public partial class Cart : Page
    {
        private const string CartSessionKey = "GearHouseCart";
        private const int MaxQuantity = 99;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["api"] == "cart")
            {
                HandleCartApi();
            }
        }

        protected override void Render(HtmlTextWriter writer)
        {
            if (Request.QueryString["api"] == "cart") return;
            base.Render(writer);
        }

        private void HandleCartApi()
        {
            Response.Clear();
            Response.ContentType = "application/json";
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();

            try
            {
                if (Request.HttpMethod == "GET")
                {
                    WriteJson(200, CartPayload(GetCart()));
                    return;
                }

                if (Request.HttpMethod != "POST")
                {
                    WriteError(405, "Method not allowed.");
                    return;
                }

                string body;
                using (var reader = new StreamReader(Request.InputStream, Request.ContentEncoding))
                {
                    body = reader.ReadToEnd();
                }

                var serializer = new JavaScriptSerializer();
                var input = serializer.Deserialize<Dictionary<string, object>>(body)
                    ?? new Dictionary<string, object>();
                var action = ReadString(input, "action");
                var id = ReadInteger(input, "id");
                var quantity = ReadInteger(input, "quantity");
                var cart = GetCart();

                if (action == "clear")
                {
                    cart.Clear();
                }
                else if (id < 1)
                {
                    WriteError(400, "A valid product id is required.");
                    return;
                }
                else if (action == "add")
                {
                    if (quantity < 1 || quantity > MaxQuantity)
                    {
                        WriteError(400, "Quantity must be between 1 and 99.");
                        return;
                    }

                    var existing = cart.Find(item => item.Id == id);
                    if (existing == null)
                    {
                        cart.Add(new CartItem { Id = id, Quantity = quantity });
                    }
                    else
                    {
                        existing.Quantity = Math.Min(MaxQuantity, existing.Quantity + quantity);
                    }
                }
                else if (action == "set")
                {
                    if (quantity < 1 || quantity > MaxQuantity)
                    {
                        WriteError(400, "Quantity must be between 1 and 99.");
                        return;
                    }

                    var existing = cart.Find(item => item.Id == id);
                    if (existing == null) cart.Add(new CartItem { Id = id, Quantity = quantity });
                    else existing.Quantity = quantity;
                }
                else if (action == "remove")
                {
                    cart.RemoveAll(item => item.Id == id);
                }
                else
                {
                    WriteError(400, "Unknown cart action.");
                    return;
                }

                Session[CartSessionKey] = cart;
                WriteJson(200, CartPayload(cart));
            }
            catch (ArgumentException)
            {
                WriteError(400, "Invalid JSON request.");
            }
            catch (Exception)
            {
                WriteError(500, "Could not update the cart.");
            }
        }

        private List<CartItem> GetCart()
        {
            var cart = Session[CartSessionKey] as List<CartItem>;
            if (cart == null)
            {
                cart = new List<CartItem>();
                Session[CartSessionKey] = cart;
            }
            return cart;
        }

        private static List<Dictionary<string, object>> CartPayload(List<CartItem> cart)
        {
            var result = new List<Dictionary<string, object>>();
            foreach (var item in cart)
            {
                result.Add(new Dictionary<string, object>
                {
                    { "id", item.Id },
                    { "soLuong", item.Quantity }
                });
            }
            return result;
        }

        private static int ReadInteger(Dictionary<string, object> input, string key)
        {
            object value;
            int parsed;
            return input.TryGetValue(key, out value)
                && int.TryParse(Convert.ToString(value, CultureInfo.InvariantCulture), NumberStyles.Integer,
                    CultureInfo.InvariantCulture, out parsed)
                ? parsed : 0;
        }

        private static string ReadString(Dictionary<string, object> input, string key)
        {
            object value;
            return input.TryGetValue(key, out value) ? Convert.ToString(value, CultureInfo.InvariantCulture) : "";
        }

        private void WriteJson(int statusCode, object value)
        {
            Response.StatusCode = statusCode;
            Response.TrySkipIisCustomErrors = true;
            Response.Write(new JavaScriptSerializer().Serialize(value));
            Context.ApplicationInstance.CompleteRequest();
        }

        private void WriteError(int statusCode, string message)
        {
            WriteJson(statusCode, new Dictionary<string, string> { { "error", message } });
        }

        [Serializable]
        private sealed class CartItem
        {
            public int Id { get; set; }
            public int Quantity { get; set; }
        }
    }
}