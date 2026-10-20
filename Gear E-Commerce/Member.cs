namespace Gear_E_Commerce
{
    public class Member
    {
        // 1. Constructor mặc định không tham số (giúp tạo đối tượng new Member() không bị lỗi)
        public Member()
        {
            this.isDeleted = false;
        }

        // 2. Constructor đầy đủ tham số
        public Member(string memberID, string Role, string FullName, string Username, string Password, string Email, string Phone)
        {
            this.memberID = memberID;
            this.Role = Role;
            this.FullName = FullName;
            this.Username = Username;
            this.Password = Password;
            this.Email = Email;
            this.Phone = Phone;
            this.isDeleted = false; // Đưa vào đây giúp tránh hoàn toàn lỗi C# 5 (CS8026)
        }

        public string memberID { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool isDeleted { get; set; }
    }
}