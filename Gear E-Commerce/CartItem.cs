using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gear_E_Commerce
{
    public class CartItem
    {
        public String CartID { get; set; }
        public String ProductID { get; set; }
        public int Quantity { get; set; }

        public CartItem()
        {
        }

        public CartItem(String cartID, String productID, int quantity)
        {
            CartID = cartID;
            ProductID = productID;
            Quantity = quantity;
        }
    }
}