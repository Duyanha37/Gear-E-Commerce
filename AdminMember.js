function timkiem() {
  var tukhoa = document.getElementById("searchInput").value.toLowerCase();
  var cachang = document.getElementById("memberBody").getElementsByTagName("tr");

  for (var i = 0; i < cachang.length; i++) {
    var ten = cachang[i].cells[1].textContent.toLowerCase();
    var email = cachang[i].cells[2].textContent.toLowerCase();

    if (ten.indexOf(tukhoa) != -1 || email.indexOf(tukhoa) != -1) {
      cachang[i].style.display = "";
    } else {
      cachang[i].style.display = "none";
    }
  }
}

function xoa(nut) {
  if (confirm("Bạn có chắc muốn xóa thành viên này?")) {
    var hang = nut.parentNode.parentNode;   
    hang.parentNode.removeChild(hang);      
  }
  return false;   
  // Khi làm ASP: bỏ phần trên, chỉ cần viết: return confirm("...");
  // bấm OK thì trình duyệt tự đi tới DeleteMember?id=... để server xóa trong database
}