 // Hàm tính giá trị số từ chuỗi giá
 function parsePrice(price) {
    if (price === "Liên hệ") return 0;
    return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
  }

  // Hàm hiển thị danh sách sản phẩm trong giỏ hàng
  function displayCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const selectAllCheckbox = document.getElementById("select-all");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartList.innerHTML = "";
    if (cart.length === 0) {
      cartList.innerHTML =
        '<p class="empty-cart">Giỏ hàng của bạn đang trống!</p>';
      totalPriceElement.textContent = "0 VNĐ";
      selectAllCheckbox.disabled = true;
      return;
    }

    selectAllCheckbox.disabled = false;
    cart.forEach((item, index) => {
      const imagePath = item.image.startsWith("../img/")
        ? item.image
        : `../img/${item.image}`;
      const itemTotal = parsePrice(item.price) * item.quantity;
      if (item.selected) total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <input type="checkbox" class="select-item" data-index="${index}" ${
        item.selected ? "checked" : ""
      }>
                <img src="${imagePath}" alt="${item.title}">
                <div class="details">
                    <h5>${item.title}</h5>
                    <p>Giá: ${item.price}</p>
                    <div class="quantity-control">
                        <button class="decrease" data-index="${index}">-</button>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" readonly>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                    <p>Mô tả: ${item.description}</p>
                </div>
                <button class="remove-button" data-index="${index}">Xóa</button>
            `;
      cartList.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toLocaleString("vi-VN") + " VNĐ";
    selectAllCheckbox.checked = cart.every((item) => item.selected);

    // Thêm sự kiện cho checkbox từng sản phẩm
    document.querySelectorAll(".select-item").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const index = parseInt(checkbox.getAttribute("data-index"));
        cart[index].selected = checkbox.checked;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });

    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          displayCart();
        }
      });
    });

    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });

    selectAllCheckbox.addEventListener("change", () => {
      cart.forEach((item) => (item.selected = selectAllCheckbox.checked));
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map((item) => ({
      ...item,
      selected: item.selected !== undefined ? item.selected : true,
    }));
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();

    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const selectedItems = cart.filter((item) => item.selected);

      if (selectedItems.length === 0) {
        DD;
        alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
        return;
      }

      localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));

      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        localStorage.setItem("redirectUrl", "thanh-toan.html");
        window.location.href = "login-register.html";
      } else {
        window.location.href = "thanh-toan.html";
      }
    });
  });


  (function () {
    function c() {
      var b = a.contentDocument || a.contentWindow.document;
      if (b) {
        var d = b.createElement("script");
        d.innerHTML =
          "window.__CF$cv$params={r:'93a57b599ad7bf9a',t:'MTc0NjMzNTMyMy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
        b.getElementsByTagName("head")[0].appendChild(d);
      }
    }
    if (document.body) {
      var a = document.createElement("iframe");
      a.height = 1;
      a.width = 1;
      a.style.position = "absolute";
      a.style.top = 0;
      a.style.left = 0;
      a.style.border = "none";
      a.style.visibility = "hidden";
      document.body.appendChild(a);
      if ("loading" !== document.readyState) c();
      else if (window.addEventListener)
        document.addEventListener("DOMContentLoaded", c);
      else {
        var e = document.onreadystatechange || function () {};
        document.onreadystatechange = function (b) {
          e(b);
          "loading" !== document.readyState &&
            ((document.onreadystatechange = e), c());
        };
      }
    }
  })();

  (function () {
    function c() {
      var b = a.contentDocument || a.contentWindow.document;
      if (b) {
        var d = b.createElement("script");
        d.innerHTML =
          "window.__CF$cv$params={r:'93a58b8d2de9bf84',t:'MTc0NjMzNTk4Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
        b.getElementsByTagName("head")[0].appendChild(d);
      }
    }
    if (document.body) {
      var a = document.createElement("iframe");
      a.height = 1;
      a.width = 1;
      a.style.position = "absolute";
      a.style.top = 0;
      a.style.left = 0;
      a.style.border = "none";
      a.style.visibility = "hidden";
      document.body.appendChild(a);
      if ("loading" !== document.readyState) c();
      else if (window.addEventListener)
        document.addEventListener("DOMContentLoaded", c);
      else {
        var e = document.onreadystatechange || function () {};
        document.onreadystatechange = function (b) {
          e(b);
          "loading" !== document.readyState &&
            ((document.onreadystatechange = e), c());
        };
      }
    }
  })();

 function parsePrice(price) {
  if (price === "Liên hệ") return 0;
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

function displayCart() {
  const cartList = document.getElementById("cart-list");
  const totalPriceElement = document.getElementById("total-price");
  const selectAllCheckbox = document.getElementById("select-all");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML =
      '<p class="empty-cart">Giỏ hàng của bạn đang trống!</p>';
    totalPriceElement.textContent = "0 VNĐ";
    selectAllCheckbox.disabled = true;
    return;
  }

  selectAllCheckbox.disabled = false;
  cart.forEach((item, index) => {
    const imagePath = item.image.startsWith("../img/")
      ? item.image
      : `../img/${item.image}`;
    const itemTotal = parsePrice(item.price) * item.quantity;
    if (item.selected) total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
              <input type="checkbox" class="select-item" data-index="${index}" ${
      item.selected ? "checked" : ""
    }>
              <img src="${imagePath}" alt="${item.title}">
              <div class="details">
                  <h5>${item.title}</h5>
                  <p>Giá: ${item.price}</p>
                  <div class="quantity-control">
                      <button class="decrease" data-index="${index}">-</button>
                      <input type="number" value="${
                        item.quantity
                      }" min="1" readonly>
                      <button class="increase" data-index="${index}">+</button>
                  </div>
                  <p>Mô tả: ${item.description}</p>
              </div>
              <button class="remove-button" data-index="${index}">Xóa</button>
          `;
    cartList.appendChild(cartItem);
  });

  totalPriceElement.textContent = total.toLocaleString("vi-VN") + " VNĐ";
  selectAllCheckbox.checked = cart.every((item) => item.selected);

  document.querySelectorAll(".select-item").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const index = parseInt(checkbox.getAttribute("data-index"));
      cart[index].selected = checkbox.checked;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
  });

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      cart[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      }
    });
  });

  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
  });

  selectAllCheckbox.addEventListener("change", () => {
    cart.forEach((item) => (item.selected = selectAllCheckbox.checked));
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((item) => ({
    ...item,
    selected: item.selected !== undefined ? item.selected : true,
  }));
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();

  const checkoutButton = document.getElementById("checkout-button");
  checkoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const selectedItems = cart.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      DD;
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      localStorage.setItem("redirectUrl", "thanh-toan.html");
      window.location.href = "login-register.html";
    } else {
      window.location.href = "thanh-toan.html";
    }
  });
});


(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'93a57b599ad7bf9a',t:'MTc0NjMzNTMyMy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'93a58b8d2de9bf84',t:'MTc0NjMzNTk4Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
