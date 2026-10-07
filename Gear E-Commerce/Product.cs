using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gear_E_Commerce
{
    public class Product
    {
        string ProductID { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        long Price { get; set; }
        int Stock { get; set; }
        string Category { get; set; }
        string Image { get; set; }
    }
}