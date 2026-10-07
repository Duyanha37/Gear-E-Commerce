function kiemtra() {
  var ten = document.getElementById("inTen").value;
  var danhmuc = document.getElementById("inDanhmuc").value;
  var gia = parseInt(document.getElementById("inGia").value);
  var kho = parseInt(document.getElementById("inKho").value);

  if (ten == "" || danhmuc == "") {
    document.getElementById("loi").innerHTML = "Vui lòng nhập tên sản phẩm và danh mục!";
    return false;
  }
  if (isNaN(gia) || isNaN(kho) || gia < 0 || kho < 0) {
    document.getElementById("loi").innerHTML = "Giá bán và kho phải là số không âm!";
    return false;
  }

  // ----- Phần demo (vì chưa có ASP) -----
  alert("Lưu thành công!");
  window.location.href = "AdminProduct.html";
  return false;
  // Khi làm ASP: xóa 3 dòng demo ở trên và thay bằng: return true;
  // lúc đó form sẽ gửi dữ liệu (kèm file ảnh) lên server để lưu
}