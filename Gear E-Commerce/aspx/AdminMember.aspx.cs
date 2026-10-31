using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Gear_E_Commerce
{
    public partial class AdminMember : System.Web.UI.Page
    {
        private bool isApiRequest = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string username = Session["username"].ToString();
                adminName.InnerHtml = username;
                adminAvatar.InnerHtml = username.Substring(0, 1).ToUpper();
            }

            if(Request.HttpMethod == "GET" && Request.Headers["Request-With"] == "Fetch")
                LoadMemberList();

        }
        
        private void LoadMemberList()
        {
            isApiRequest = true;
            Response.Clear();
            Response.ContentType = "application/json";

            List<Member> members = (List<Member>)Application["MemberList"];
            JavaScriptSerializer seri = new JavaScriptSerializer();
            Response.Write(seri.Serialize(members));
            Context.ApplicationInstance.CompleteRequest();
            return;
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