function kiemtra() {
  var ten = document.getElementById("inTen").value;
  var email = document.getElementById("inEmail").value;

  if (ten == "" || email == "") {
    document.getElementById("loi").innerHTML = "Vui lòng nhập đầy đủ họ tên và email!";
    return false;
  }
  if (email.indexOf("@") == -1) {
    document.getElementById("loi").innerHTML = "Email không hợp lệ!";
    return false;
  }
    //  Phần demo (vì chưa có ASP) 
  alert("Lưu thành công!");
  window.location.href = "AdminMember.html";
  return false;
  // Khi làm ASP: xóa 3 dòng demo ở trên và thay bằng: return true;
}