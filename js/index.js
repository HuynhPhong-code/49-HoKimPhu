// Hàm hiển thị popup đăng nhập
function showLoginPopup() {
  document.getElementById("login-popup").style.display = "flex";
}

// Hàm ẩn popup đăng nhập
function hideLoginPopup() {
  document.getElementById("login-popup").style.display = "none";
}

// Hàm chuyển hướng tới trang đăng nhập
function redirectToLogin() {
  hideLoginPopup();
  window.location.href = "html/login-register.html";  // Chỉnh sửa đường dẫn
}

// Hàm kiểm tra trạng thái đăng nhập
function checkLogin(callback) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    showLoginPopup();
    return;
  }
  callback();
}

// Hiệu ứng hover cho các nút call-button và chat-button
document.querySelectorAll(".call-button, .chat-button").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#3A78C2";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = button.classList.contains("call-button")
      ? "#4A90E2"
      : "#00AEEF";
  });
});

// Xử lý nút "Đặt món" (btn-success)
document.querySelectorAll(".btn-success").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    checkLogin(() => {
      const title = button.getAttribute("data-title");
      const price = button.getAttribute("data-price");
      const image = button.getAttribute("data-image");
      const description = button.getAttribute("data-description");

      if (!title || !price || !image || !description) {
        console.error("Missing product data attributes");
        alert("Lỗi: Thiếu thông tin sản phẩm!");
        return;
      }

      const url = `html/thanh-toan.html?title=${encodeURIComponent(
        title
      )}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(
        image
      )}&description=${encodeURIComponent(description)}&quantity=1`;  // Chỉnh sửa đường dẫn

      window.location.href = url;
    });
  });
});

// Xử lý nút "Thêm vào giỏ hàng" (add-to-cart)
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    checkLogin(() => {
      const title = button.getAttribute("data-title");
      const price = button.getAttribute("data-price");
      const image = button.getAttribute("data-image");
      const description = button.getAttribute("data-description");
      const quantity = 1;

      if (!title || !price || !image || !description) {
        console.error("Missing product data attributes");
        alert("Lỗi: Thiếu thông tin sản phẩm!");
        return;
      }

      const cartItem = {
        title,
        price,
        image,
        description,
        quantity,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.title === cartItem.title);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    });
  });
});

// Xử lý danh sách món ăn từ localStorage
document.addEventListener("DOMContentLoaded", function () {
  const menuList = document.getElementById("menu-list");
  const monAnList = JSON.parse(localStorage.getItem("monAnList")) || [];

  // Hàm thêm món ăn vào giỏ hàng
  function themVaoGio(index) {
    const monAn = monAnList[index];
    let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
    gioHang.push(monAn);
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
    alert("Đã thêm vào giỏ hàng!");
  }

  // Hiển thị danh sách món ăn
  monAnList.forEach((monAn, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <img src="${monAn.hinhAnh}" alt="${monAn.ten}">
        <h3>${monAn.ten}</h3>
        <p>${monAn.moTa}</p>
        <p><strong>Giá:</strong> ${monAn.gia} VNĐ</p>
        <button class="them-gio" data-index="${index}">Thêm vào giỏ</button>
    `;
    menuList.appendChild(li);
  });

  // Xử lý sự kiện thêm vào giỏ hàng
  menuList.addEventListener("click", function (e) {
    if (e.target.classList.contains("them-gio")) {
      const index = e.target.getAttribute("data-index");
      checkLogin(() => {
        themVaoGio(index);
      });
    }
  });

  // Xử lý nút "Đặt món"
  const btnDatMon = document.getElementById("btnDatMon");
  if (btnDatMon) {
    btnDatMon.addEventListener("click", () => {
      checkLogin(() => {
        window.location.href = "html/thanh-toan.html";  // Chỉnh sửa đường dẫn
      });
    });
  }
});
