function timkiem() {
  var tukhoa = document.getElementById("searchInput").value.toLowerCase();
  var cachang = document.getElementById("productBody").getElementsByTagName("tr");

  for (var i = 0; i < cachang.length; i++) {
    var ma = cachang[i].cells[0].textContent.toLowerCase();
    var ten = cachang[i].cells[2].textContent.toLowerCase();

    if (ma.indexOf(tukhoa) != -1 || ten.indexOf(tukhoa) != -1) {
      cachang[i].style.display = "";
    } else {
      cachang[i].style.display = "none";
    }
  }
}

// Bấm nút xóa: hỏi lại, đồng ý thì xóa dòng đó khỏi bảng
function xoa(nut) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    var hang = nut.parentNode.parentNode;   
    hang.parentNode.removeChild(hang);     
  }
  return false;   
  // Khi làm ASP: bỏ phần trên, chỉ cần viết: return confirm("...");
  // bấm OK thì trình duyệt tự đi tới DeleteProduct?id=... để server xóa trong database
}