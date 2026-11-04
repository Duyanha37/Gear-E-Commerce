using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gear_E_Commerce
{
    public class CartItem
    {
        public String CartItemID { get; set; }
        public String ProductID { get; set; }
        public int Quantity { get; set; }

        public CartItem()
        {
        }

        public CartItem(String cartItemID, String productID, int quantity)
        {
            CartItemID = cartItemID;
            ProductID = productID;
            Quantity = quantity;
        }
    }
}