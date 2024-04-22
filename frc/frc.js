// 'sebet' id'sine sahip tüm elementleri seçelim.
let addSebet = document.querySelectorAll('#sebet');

// Sepet tablosunun tbody elementini seçelim.
const tbody = document.querySelector('#tab');

// 'sebet' butonlarına tıklandığında çalışacak olay dinleyicisi ekleyelim.
for (let i = 0; i < addSebet.length; i++) {
    addSebet[i].addEventListener('click', function (e) {
        e.preventDefault(); // Varsayılan davranışı engelleyelim (sayfanın yeniden yüklenmesini önler).

        // Tıklanan butonun üst öğesinden ürün bilgilerini alalım.
        let Id = addSebet[i].parentElement.getAttribute('data-id');
        let Name = addSebet[i].previousElementSibling.previousElementSibling.innerText;
        let Image = addSebet[i].parentElement.firstElementChild.getAttribute('src');

        // localStorage'daki sebethtml dizisini kontrol edelim.
        let sebethtml = JSON.parse(localStorage.getItem('sebethtml')) || [];

        // Sepete ürünü ekleyelim.
        sebethtml.push({
            id: Id,
            name: Name,
            img: Image,
            count: 1 // Yeni eklenen ürünün sayısını 1 olarak belirleyelim.
        });

        // Güncellenmiş sepet bilgilerini localStorage'a kaydedelim.
        localStorage.setItem('sebethtml', JSON.stringify(sebethtml));

        // Sepet tablosunu güncelleyelim.
        updateBasketTable();
    });
}

// Sepet tablosunu güncelleyen fonksiyon
function updateBasketTable() {
    // localStorage'daki sebethtml dizisini kontrol edelim.
    let basket = JSON.parse(localStorage.getItem('sebethtml')) || [];

    // Tabloyu temizleyelim
    tbody.innerHTML = '';

    // Sepet boş değilse, her ürün için bir tablo satırı oluşturup tabloya ekleyelim.
    if (basket.length !== 0) {
        for (const product of basket) {
            let tr = document.createElement('tr');

            // Resim için bir hücre oluşturalım ve resmi içine ekleyelim.
            let tdImg = document.createElement('td');
            let img = document.createElement('img');
            img.setAttribute('src', product.img); // Resim yolunu belirleyelim.
            img.setAttribute('width', '150px'); // Resmin genişliğini ayarlayalım.
            tdImg.appendChild(img); // Resmi hücreye ekleyelim.

            // Ürün adı için bir hücre oluşturalım ve ismi içine ekleyelim.
            let tdName = document.createElement('td');
            tdName.innerText = product.name; // Ürün adını ayarlayalım.

            // Ürün sayısı için bir hücre oluşturalım ve sayacı içine ekleyelim.
            let tdCount = document.createElement('td');
            tdCount.innerText = product.count; // Ürün sayısını ayarlayalım.

            // Tablo satırına hücreleri ekleyelim.
            tr.append(tdImg, tdName, tdCount);

            // Tabloya satırı ekleyelim.
            tbody.appendChild(tr);
        }
    }
}

// Sayfa yüklendiğinde sepet tablosunu güncelleyelim.
updateBasketTable();
