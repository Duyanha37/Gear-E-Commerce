using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace Gear_E_Commerce
{
    public class GlobalData : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            List<Member> memberList = new List<Member>
            {
                new Member("1", "Admin", "Nguyễn Trần Duy Anh", "nguyentranduyanh", "duyanh1112", "nguyentranduyanh@gmail.com", "0123456789"),
                new Member("2", "User", "Nguyễn Văn A", "nguyenvana", "password123", "nguyenvana@gmail.com", "0987654321"),
                new Member("3", "User", "Trần Thị B", "tranthib", "pass456", "tranthib@gmail.com", "0987654321"),
                new Member("4", "User", "Lê Văn C", "levanc", "abc123", "levanc@gmail.com", "0987654321"),
                new Member("5", "User", "Phạm Thị D", "phamthid", "xyz789", "phamthid@gmail.com", "0987654321"),
                new Member("6", "User", "Nguyễn Văn E", "nguyenvane", "password456", "nguyenvane@gmail.com", "0987654321"),
                new Member("7", "User", "Trần Văn F", "tranvanf", "pass789", "tranvanf@gmail.com", "0987654321"),
                new Member("8", "User", "Lê Thị G", "lethig", "abc456", "lethig@gmail.com", "0987654321")
            };
            Application["MemberList"] = memberList;

            List<Product> productList = new List<Product>
            {
                new Product("1", "GeForce RTX 4080 Super", "", "16GB GDDR6X graphics card", 24975000, 12, "GPU", "../assets/images-backup/geforce-rtx-4080-super.jpg"),
                new Product("2", "Ryzen 9 7950X3D", "", "16-Core processor for high performance", 14975000, 18, "CPU", "../assets/images-backup/ryzen-9-7950x3d.jpg"),
                new Product("3", "ROG Strix X670E-E", "", "AM5 motherboard with Wi-Fi 6E", 11725000, 9, "Motherboard", "../assets/images-backup/rog-strix-x670e-e.jpg"),
                new Product("4", "Vengeance RGB 32GB", "", "DDR5 6000MHz memory kit", 3225000, 30, "RAM", "../assets/images-backup/vengeance-rgb-32gb.jpg"),
                new Product("5", "990 PRO NVMe 2TB", "", "7450MB/s PCIe 4.0 storage", 4475000, 16, "SSD", "../assets/images-backup/samsung-990-pro-2tb.jpg"),
                new Product("6", "RM1000x Shift", "", "1000W 80 Plus Gold power supply", 5225000, 14, "Power Supply", "../assets/images-backup/corsair-rm1000x-shift.jpg"),
                new Product("7", "RGB Gaming Fan 120mm", "", "Quiet cooling fan with RGB light", 725000, 40, "Accessories", "../assets/images-backup/RGB-fan-white.png"),
                new Product("8", "Intel Core i9-14900K", "", "24-Core processor for gaming and work", 13725000, 11, "CPU", "../assets/images-backup/intel-core-i9-14900k.jpg"),
                new Product("9", "GeForce RTX 4070 Ti", "", "12GB GDDR6X graphics card", 19975000, 8, "GPU", "../assets/images-backup/geforce-rtx-4070-ti.jpg"),
                new Product("10", "Fury Beast DDR5 32GB", "", "DDR5 memory kit 5600MHz", 2725000, 24, "RAM", "../assets/images-backup/kingston-fury-beast-ddr5-32gb.jpg"),
                new Product("11", "B650 AORUS Elite AX", "", "AM5 motherboard with Wi-Fi", 5725000, 13, "Motherboard", "../assets/images-backup/b650-aorus-elite-ax.jpg"),
                new Product("12", "Crucial P3 Plus 1TB", "", "PCIe 4.0 NVMe storage", 1975000, 35, "SSD", "../assets/images-backup/crucial-p3-plus-1tb.jpg"),
                new Product("13", "ROG Thor 850W Platinum", "", "850W modular power supply", 4725000, 7, "Power Supply", "../assets/images-backup/rog-thor-850w-platinum.jpg"),
                new Product("14", "Thermal Paste Kit", "", "Thermal paste for CPU cooling", 300000, 50, "Accessories", "../assets/images-backup/thermal-paste-kit.jpg"),
                new Product("15", "Ryzen 7 7800X3D", "", "8-Core processor for gaming", 9725000, 15, "CPU", "../assets/images-backup/ryzen-7-7800x3d.jpg"),
                new Product("16", "Radeon RX 7900 XTX", "", "24GB graphics card for 4K gaming", 22475000, 6, "GPU", "../assets/images-backup/radeon-rx-7900-xtx.jpg"),
                new Product("17", "Dominator Titanium 64GB", "", "DDR5 memory kit 6400MHz", 5475000, 10, "RAM", "../assets/images-backup/dominator-titanium-64gb.jpg"),
                new Product("18", "MAG B760 Tomahawk", "", "Intel motherboard with Wi-Fi", 4975000, 12, "Motherboard", "../assets/images-backup/msi-mag-b760-tomahawk.jpg"),
                new Product("19", "WD Black SN850X 2TB", "", "High speed PCIe 4.0 NVMe storage", 3975000, 21, "SSD", "../assets/images-backup/wd-black-sn850x-2tb.jpg"),
                new Product("20", "Focus GX 750W", "", "750W 80 Plus Gold power supply", 2975000, 19, "Power Supply", "../assets/images-backup/seasonic-focus-gx-750.jpg"),
                new Product("21", "ARGB Extension Cable", "", "Sleeved cable for clean PC builds", 600000, 28, "Accessories", "../assets/images-backup/ARGB-extension-cable-white.jpg"),
                new Product("22", "Intel Core i5-14600K", "", "14-Core processor for gaming", 7975000, 20, "CPU", "../assets/images-backup/intel-core-i5-14600k-v2.jpg"),
                new Product("23", "GeForce RTX 4060", "", "8GB graphics card for 1080p gaming", 7475000, 17, "GPU", "../assets/images-backup/geforce-rtx-4060.jpg"),
                new Product("24", "T-Force Delta RGB 16GB", "", "DDR5 memory kit 6000MHz", 1725000, 32, "RAM", "../assets/images-backup/t-force-delta-rgb-16gb.jpg"),
                new Product("25", "Prime B760M-A", "", "Micro ATX Intel motherboard", 3475000, 16, "Motherboard", "../assets/images-backup/asus-prime-b760m-a-v2.jpg"),
                new Product("26", "Kingston NV2 1TB", "", "PCIe 4.0 NVMe storage", 1475000, 26, "SSD", "../assets/images-backup/kingston-nv2-1tb.jpg"),
                new Product("27", "CX650 650W", "", "650W power supply for gaming PCs", 1975000, 23, "Power Supply", "../assets/images-backup/CorsairCX650.jpg"),
                new Product("28", "Case Dust Filter Set", "", "Dust filters for desktop case", 375000, 45, "Accessories", "../assets/images-backup/CaseDustFilters.jpg"),
                new Product("29", "ASUS TUF Gaming VG249Q1A", "", "23.8-inch Full HD gaming monitor, 165Hz", 4725000, 10, "Accessories", "../assets/images-backup/AsusTUF-VG249Q1A-clean.png"),
                new Product("30", "Akko 3098B Mechanical Keyboard", "", "Compact mechanical keyboard for gaming and work", 2225000, 14, "Accessories", "../assets/images-backup/Akko3098B.jpg"),
                new Product("31", "Logitech G502 HERO", "", "Wired gaming mouse with adjustable weights", 1225000, 20, "Accessories", "../assets/images-backup/LogitechG502.jpg"),
                new Product("32", "Logitech G PRO Wireless", "", "Lightweight wireless gaming mouse", 2475000, 12, "Accessories", "../assets/images-backup/LogitechGPro-white.jpg"),
                new Product("33", "Logitech G304 LIGHTSPEED", "", "Wireless gaming mouse with optical sensor", 975000, 22, "Accessories", "../assets/images-backup/LogitechG304.jpg"),
                new Product("34", "Logitech Wireless Mouse", "", "Comfortable everyday wireless mouse", 625000, 25, "Accessories", "../assets/images-backup/LogitechM185.jpg"),
                new Product("35", "Razer DeathAdder V3 Pro", "", "Ergonomic wireless esports gaming mouse", 2975000, 9, "Accessories", "../assets/images-backup/deathAdderV3pro.jpg"),
                new Product("36", "Razer BlackShark V2", "", "Over-ear gaming headset with clear audio", 2475000, 11, "Accessories", "../assets/images-backup/RazerBlackSharkV2-white.jpg"),
                new Product("37", "HyperX Cloud III Gaming Headset", "", "Over-ear headset for gaming and voice chat", 1975000, 15, "Accessories", "../assets/images-backup/HpHyperX3.jpg"),
                new Product("38", "Keychron K8 Pro Keyboard", "", "Wireless mechanical keyboard with RGB lighting", 2725000, 8, "Accessories", "../assets/images-backup/K8Pro.jpg")
            };
            Application["ProductList"] = productList;

            List<CartMember> cartMemberList = new List<CartMember>
            {
                new CartMember("1", "1"),
                new CartMember("2", "2"),
                new CartMember("3", "3"),
                new CartMember("4", "4"),
                new CartMember("5", "5"),
                new CartMember("6", "6"),
                new CartMember("7", "7"),
                new CartMember("8", "8")
            };

            cartMemberList[0].AddItem(new CartItem("1", "1", 1));
            cartMemberList[0].AddItem(new CartItem("2", "7", 2));
            cartMemberList[1].AddItem(new CartItem("3", "2", 1));
            cartMemberList[1].AddItem(new CartItem("4", "4", 2));
            cartMemberList[2].AddItem(new CartItem("5", "3", 1));
            cartMemberList[2].AddItem(new CartItem("3", "11", 1));
            cartMemberList[3].AddItem(new CartItem("4", "5", 1));
            cartMemberList[3].AddItem(new CartItem("4", "12", 2));
            cartMemberList[4].AddItem(new CartItem("5", "6", 1));
            cartMemberList[4].AddItem(new CartItem("5", "13", 1));
            cartMemberList[5].AddItem(new CartItem("6", "8", 1));
            cartMemberList[5].AddItem(new CartItem("6", "15", 1));
            cartMemberList[6].AddItem(new CartItem("7", "9", 1));
            cartMemberList[6].AddItem(new CartItem("7", "23", 2));
            cartMemberList[7].AddItem(new CartItem("8", "31", 1));
            cartMemberList[7].AddItem(new CartItem("8", "38", 1));

            Application["CartMemberList"] = cartMemberList;
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}