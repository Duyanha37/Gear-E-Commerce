using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gear_E_Commerce
{
    public class CartMember
    {
        public String CartID { get; set; }
        public String MemberID { get; set; }
        public List<CartItem> Items { get; set; }

        public CartMember(String cartID, String memberID)
        {
            CartID = cartID;
            MemberID = memberID;
            Items = new List<CartItem>();
        }

        public void AddItem(CartItem item)
        {
            Items.Add(item);
        }
    }
}