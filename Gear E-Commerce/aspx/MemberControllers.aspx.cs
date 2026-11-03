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
                isApiRequest = true;
                GetMembers();
                return;
            }
            if(Request.HttpMethod == "GET" && Request.Headers["Service-Name"] == "GetMemberByID")
            {
                isApiRequest = true;
                GetMemberByID();
                return;
            }
            if(Request.HttpMethod == "POST" && Request.Headers["Service-Name"] == "AddMember")
            {
                isApiRequest = true;
                AddMember();
                return;
            }
            if (Request.HttpMethod == "PUT" && Request.Headers["Service-Name"] == "UpdateMember")
            {
                isApiRequest = true;
                UpdateMember();
                return;
            }
            if(Request.HttpMethod == "POST" && Request.Headers["Service-Name"] == "DeleteMember")
            {
                isApiRequest = true;
                DeleteMember();
                return;
            }
        }

        private void GetMembers()
        {
            List<Member> members = (List<Member>)Application["MemberList"];
            List<Member> activeMembers = members.Where(m => !m.isDeleted).ToList();
            Response.Clear();
            Response.ContentType = "application/json";
            JavaScriptSerializer seri = new JavaScriptSerializer();
            if(members != null)
            {
                Response.StatusCode = 200;
                Response.Write(seri.Serialize(members));
                Context.ApplicationInstance.CompleteRequest();
                return;
            }
            else
            {
                Response.StatusCode = 404;
                return;
            }
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

        private void AddMember()
        {
            List<Member> members = (List<Member>)Application["MemberList"];
            string requestBody;
            using (StreamReader reader = new StreamReader(Request.InputStream))
            {
                requestBody = reader.ReadToEnd();
            }
            JavaScriptSerializer seri = new JavaScriptSerializer();
            Member newMember = seri.Deserialize<Member>(requestBody);
            if(newMember != null)
            {
                members.Add(newMember);
                Response.StatusCode = 200;
                Application["MemberList"] = members;
                return;
            }
            else
            {
                Response.StatusCode = 400;
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
                members[members.IndexOf(member)] = updatedMember;
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
                member.isDeleted = true;
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