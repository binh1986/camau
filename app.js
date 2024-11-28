// Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmluaDg2IiwiYSI6ImNtM3A4dmIzNjBidXkya29oYm5ybDlwZDAifQ._etgaQdyfictlYxGJwX5rQ';

// Initialize Map
const map = new mapboxgl.Map({
  container: 'map', // ID của phần tử HTML chứa bản đồ
  style: 'mapbox://styles/mapbox/satellite-streets-v11', // Loại bản đồ
  center: [107.8, 12.8], // Tọa độ trung tâm
  zoom: 9, // Mức zoom
});

// Dữ liệu hộ dân
const households = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    address: "Trung Xuân - Đắk Nông",
    coord: [107.85, 12.85],
    analysis: "pH: Chua, Hữu cơ: Trung bình, Đạm: Trung bình, Lân: Nghèo, Kali: Nghèo",
    guidance: "Hữu cơ: 20kg/cây, NPK: 15.15.15 2.6kg/cây sau thu hoach, 2.5 kg NPK: 8.14.12 lúc ra hoa,2.6kg NPK: 16.17.17 lúc đậu trái, 2.7kg NPK 16.7.17 lúc vô cơm ",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    address: "Cư M'gar - Đắk Lắk",
    coord: [107.71, 12.71],
    analysis: "pH: Chua, Hữu cơ: Giàu, Đạm: Giàu, Lân: Trung bình, Kali: Trung bình",
    guidance: "Hữu cơ: 15kg/cây, NPK: 15.15.15 2.4kg/cây sau thu hoach, 2.3 kg NPK: 8.14.12 lúc ra hoa,2.4kg NPK: 16.17.17 lúc đậu trái, 2.5kg NPK 16.7.17 lúc vô cơm ",
  },
];
// Duyệt qua danh sách households và tạo marker
households.forEach((household) => {
  // Tạo marker và gắn vào bản đồ
  new mapboxgl.Marker()
      .setLngLat(household.coord) // Đặt tọa độ của marker
      .setPopup(
          new mapboxgl.Popup().setHTML(`
              <h3>${household.name}</h3>
              <p>Địa chỉ: ${household.address}</p>
          `) // Thông tin hiển thị khi click vào marker
      )
      .addTo(map); // Thêm marker vào bản đồ
});
// Tạo div bên phải để hiển thị thông tin
const infoBox = document.createElement('div');
infoBox.style.width = '300px';
infoBox.style.backgroundColor = '#f9f9f9';
infoBox.style.borderLeft = '1px solid #ddd';
infoBox.style.padding = '20px';
infoBox.style.position = 'absolute'; // Thay vì fixed, dùng absolute
infoBox.style.right = '0';
infoBox.style.top = '200px'; // Có thể tùy chỉnh khoảng cách từ trên
infoBox.style.boxShadow = '-2px 0 5px rgba(0, 0, 0, 0.1)';
infoBox.style.fontFamily = 'Arial, sans-serif';
infoBox.style.display = 'none'; // Ẩn ban đầu
document.body.appendChild(infoBox); // Thêm div vào body

// Hàm cập nhật thông tin vào div bên phải
function updateInfoBox(household) {
    infoBox.style.display = 'block'; // Hiển thị div khi có thông tin
    infoBox.innerHTML = `
        <h4>Thông tin chi tiết</h4>
        <p><strong>Họ tên:</strong> ${household.name}</p>
        <p><strong>Địa chỉ:</strong> ${household.address}</p>
        <p><strong>Kết quả phân tích:</strong>
         <ul>
            ${household.analysis
                .split(", ")
                .map((item) => `<li>${item}</li>`)
                .join("")}
        </ul>
        <p><strong>Hướng dẫn bón phân:</strong></p>
        <ul>
            ${household.guidance
                .split(", ")
                .map((item) => `<li>${item}</li>`)
                .join("")}
        </ul>
    `;
}

// Tạo marker và gắn sự kiện click
households.forEach((household) => {
    const marker = new mapboxgl.Marker({color:'red'})
        .setLngLat(household.coord)
        .setPopup(
            new mapboxgl.Popup().setHTML(`
                <h3>${household.name}</h3>
                <p>Địa chỉ: ${household.address}</p>
            `)
        )
        .addTo(map)
        .getElement()
        .addEventListener("click", () => {
            updateInfoBox(household); // Cập nhật thông tin vào info-box
        });
});