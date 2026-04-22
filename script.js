const scriptURL = "https://script.google.com/macros/s/AKfycbyWcMsA8yHqWkYDFFu4q23Cr0utC7F6Y6KHnNRtM_gf7eniJ7wRAACzM1ZbkD-DZhW8/exec";
let editIndex = null;

// 🔑 ID unik
function generateID(kelas, gantangan) {
  const list = JSON.parse(localStorage.getItem("data")) || [];

  // filter berdasarkan kelas
  const filtered = list.filter(item => item.kelas === kelas);

  // cari nomor terbesar yang sudah ada
  let max = 0;

  filtered.forEach(item => {
    const num = parseInt(item.id.split("-")[1]);
    if (!isNaN(num) && num > max) {
      max = num;
    }
  });

  const next = max + 1;

  return `${gantangan}${kelas}-${String(next).padStart(3, "0")}`;
}

// 💾 ambil data
function getData() {
  return JSON.parse(localStorage.getItem("data")) || [];
}

// 💾 simpan
function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

// 📊 tampilkan
function loadData() {
  const list = getData();
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  list.forEach((d, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${d.gantangan}</td>
        <td>${d.kelas}</td>
        <td>${d.merah}</td>
        <td>${d.biru}</td>
        <td>${d.kuning}</td>
        <td>
          <button onclick="editData(${i})" style="background: #3b82f6;">Edit</button>
          <button onclick="hapusData(${i})" style="background: #ef4444;">Hapus</button>
        </td>
      </tr>
    `;
  });
}

// ✏️ edit
function editData(i) {
  const d = getData()[i];

  gantangan.value = d.gantangan;
  kelas.value = d.kelas;
  merah.value = d.merah;
  biru.value = d.biru;
  kuning.value = d.kuning;

  editIndex = i;
}

// 🗑️ hapus
function hapusData(i) {
  let list = getData();
  const data = list[i];

  // kirim delete ke server
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      id: data.id,
      action: "delete"
    })
  });

  list.splice(i, 1);
  saveData(list);
  loadData();
}

// 🚀 submit
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();

  let list = getData();

  const data = {
    id: editIndex !== null ? list[editIndex].id : generateID(kelas.value, gantangan.value),
    gantangan: gantangan.value,
    kelas: kelas.value,
    merah: merah.value,
    biru: biru.value,
    kuning: kuning.value,
    action: "save"
  };

  if (editIndex !== null) {
    list[editIndex] = data;
    editIndex = null;
  } else {
    list.push(data);
  }

  saveData(list);

  // kirim ke spreadsheet
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  form.reset();
  loadData();
});

// init
loadData();

function showToast(message, color = "#22c55e") {
  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.style.background = color;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function playSuccessSound() {
  const sound = document.getElementById("successSound");
  sound.currentTime = 0;
  sound.play();
}

fetch(scriptURL, {
  method: "POST",
  headers: {
    "Content-Type": "text/plain"
  },
  body: JSON.stringify(data)
})
.then(res => res.text())
.then(res => {
  showToast("✅ Data berhasil dikirim");
  playSuccessSound();
})
.catch(err => {
  showToast("❌ Gagal kirim data", "#ef4444");
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
