namespace Gear_E_Commerce
{
    public class Member
    {
        public Member(string memberID, string Role, string FullName, string Username, string Password, string Email, string Phone)
        {
            this.memberID = memberID;
            this.Role = Role;
            this.FullName = FullName;
            this.Username = Username;
            this.Password = Password;
            this.Email = Email;
            this.Phone = Phone;
            this.Status = "Active";
            this.isDeleted = false;
        }

        public string memberID { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }
        public bool isDeleted { get; set; }
    }
}