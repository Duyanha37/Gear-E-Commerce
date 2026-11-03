using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Gear_E_Commerce.aspx
{
    public partial class MemberControllers : System.Web.UI.Page
    {
        private bool isApiRequest = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Request.HttpMethod == "GET" && Request.Headers["Service-Name"] == "GetMembers")
            {
                GetMembers();
                return;
            }
            if(Request.HttpMethod == "GET" && Request.Headers["Service-Name"] == "GetMemberByID")
            {
                GetMemberByID();
                return;
            }
            if(Request.HttpMethod == "PUT" && Request.Headers["Service-Name"] == "UpdateMember")
            {
                UpdateMember();
                return;
            }
            if(Request.HttpMethod == "DELETE" && Request.Headers["Service-Name"] == "DeleteMember")
            {
                DeleteMember();
                return;
            }
        }

        private void GetMembers()
        {
            List<Member> members = (List<Member>)Application["MemberList"];
            Response.Clear();
            Response.ContentType = "application/json";
            JavaScriptSerializer seri = new JavaScriptSerializer();
            Response.StatusCode = 200;
            Response.Write(seri.Serialize(members));
            Context.ApplicationInstance.CompleteRequest();
            return;
        }

        private void GetMemberByID()
        {
            string memberID = Request.QueryString["memberID"];
            List<Member> members = (List<Member>)Application["MemberList"];
            Response.Clear();
            Response.ContentType = "application/json";
            Member member = members.FirstOrDefault(m => m.memberID == memberID);
            if(member != null)
            {
                Response.StatusCode = 200;
                JavaScriptSerializer seri = new JavaScriptSerializer();
                Response.Write(seri.Serialize(member));
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
            }
        }

        private void UpdateMember()
        {
            List<Member> members = (List<Member>)Application["MemberList"];
            string requestBody;
            using (StreamReader reader = new StreamReader(Request.InputStream))
            {
                requestBody = reader.ReadToEnd();
            }
            JavaScriptSerializer seri = new JavaScriptSerializer();
            Member updatedMember = seri.Deserialize<Member>(requestBody);
            Member member = members.FirstOrDefault(m => m.memberID == updatedMember.memberID);
            if (member != null)
            {
                member = updatedMember;
                Response.StatusCode = 200;
                Application["MemberList"] = members;
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
                return;
            }
        }

        private void DeleteMember()
        {
            List<Member> members = (List<Member>)Application["MemberList"];
            string memberID = Request.QueryString["memberID"];
            Member member = members.FirstOrDefault(m => m.memberID == memberID);
            if (member != null)
            {
                members.Remove(member);
                Response.StatusCode = 200;
                Application["MemberList"] = members;
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
                return;
            }
        }
    }
}