
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const price = urlParams.get('price');
  const image = urlParams.get('image');
  const description = urlParams.get('description');

  document.querySelector('.product-detail .col-md-6 h2').textContent = title || 'Tên sản phẩm';
  document.querySelector('.product-detail .text-success.fs-4').textContent = `Giá: ${price || 'Chưa có giá'}`;
  document.querySelector('.product-detail .col-md-6 .img-fluid').src = image || '../img/default-product.jpg';
  document.querySelector('.product-detail .col-md-6 .mt-4 p').textContent = description || 'Chưa có mô tả';

  const thumbnails = document.querySelectorAll('.product-detail .mt-3 img');
  thumbnails.forEach(thumbnail => {
      thumbnail.src = image || '../img/default-product.jpg';
  });
  const mainImage = document.getElementById('main-image');
  document.querySelectorAll('.product-detail .mt-3 img').forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
          mainImage.src = thumbnail.src;
      });
  });

  document.getElementById('add-to-cart').addEventListener('click', () => {
      const quantity = parseInt(document.getElementById('quantity').value) || 1;
      const cartItem = {
          title: title || 'Tên sản phẩm',
          price: price || 'Chưa có giá',
          image: image || '../img/default-product.jpg',
          description: description || 'Chưa có mô tả',
          quantity: quantity
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingItem = cart.find(item => item.title === cartItem.title);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
  });


(function () {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = `
                window.__CF$cv$params = {
                    r: '93a58961487d53f6',
                    t: 'MTc0NjMzNTg5Ny4wMDAwMDA='
                };
                var a = document.createElement('script');
                a.nonce = '';
                a.src = '/cdn-cgi/challenge-platform/scripts/jsd/main.js';
                document.getElementsByTagName('head')[0].appendChild(a);
            `;
            b.getElementsByTagName('head')[0].appendChild(d);
        }
    }

    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);

        if (document.readyState !== 'loading') {
            c();
        } else if (window.addEventListener) {
            document.addEventListener('DOMContentLoaded', c);
        } else {
            var e = document.onreadystatechange || function () { };
            document.onreadystatechange = function (b) {
                e(b);
                if (document.readyState !== 'loading') {
                    document.onreadystatechange = e;
                    c();
                }
            };
        }
    }
})();


(function () {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = `
                window.__CF$cv$params = {
                    r: '93a64c535dbd53b2',
                    t: 'MTc0NjM0Mzg4Mi4wMDAwMDA='
                };
                var a = document.createElement('script');
                a.nonce = '';
                a.src = '/cdn-cgi/challenge-platform/scripts/jsd/main.js';
                document.getElementsByTagName('head')[0].appendChild(a);
            `;
            b.getElementsByTagName('head')[0].appendChild(d);
        }
    }

    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);

        if (document.readyState !== 'loading') {
            c();
        } else if (window.addEventListener) {
            document.addEventListener('DOMContentLoaded', c);
        } else {
            var e = document.onreadystatechange || function () { };
            document.onreadystatechange = function (b) {
                e(b);
                if (document.readyState !== 'loading') {
                    document.onreadystatechange = e;
                    c();
                }
            };
        }
    }
})();

