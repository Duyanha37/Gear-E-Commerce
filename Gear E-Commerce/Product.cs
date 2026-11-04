using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gear_E_Commerce
{
    public class Product
    {
        public Product()
        {
        }

        public Product(string productID, string Name,string Brand, string Description, long Price, int Stock, string Category, string Image)
        {
            this.productID = productID;
            this.Name = Name;
            this.Brand = Brand;
            this.Description = Description;
            this.Price = Price;
            this.Stock = Stock;
            this.Category = Category;
            this.Image = Image;
        }
        public string productID { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public int Stock { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
        public Boolean isDelete { get; set; } = false;
    }
}