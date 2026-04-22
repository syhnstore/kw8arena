const scriptURL = "https://script.google.com/macros/s/AKfycbyWcMsA8yHqWkYDFFu4q23Cr0utC7F6Y6KHnNRtM_gf7eniJ7wRAACzM1ZbkD-DZhW8/exec";
let editIndex = null;
let pendingData = null;
let isSubmitting = false;

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

  // simpan sementara
  pendingData = data;

  // tampilkan ke overlay
  setLoadingData(data);

  // tampilkan overlay
  showLoading();
});

function confirmSubmit() {
  if (isSubmitting) return;
  isSubmitting = true;
  isSubmitting = false;

  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const spinner = document.getElementById("sendingSpinner");

  // 🔒 disable tombol
  confirmBtn.disabled = true;
  cancelBtn.disabled = true;

  confirmBtn.innerText = "Mengirim...";
  confirmBtn.style.opacity = "0.7";

  // 🔥 tampilkan spinner
  spinner.style.display = "block";

  let list = getData();

  if (editIndex !== null) {
    list[editIndex] = pendingData;
    editIndex = null;
  } else {
    list.push(pendingData);
  }

  saveData(list);

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(pendingData)
  })
  .then(res => res.text())
  .then(() => {
    showToast("✅ Data berhasil dikirim");
    playSuccessSound();
  })
  .catch(() => {
    showToast("❌ Gagal kirim data", "#ef4444");
  })
  .finally(() => {
    hideLoading();

    // reset tombol
    confirmBtn.disabled = false;
    cancelBtn.disabled = false;
    confirmBtn.innerText = "Konfirmasi";
    spinner.style.display = "none";

    form.reset();
    resetGantangan();
    resetKelas();
    loadData();
  });
}

function cancelSubmit() {
  pendingData = null;
  hideLoading();
}

// init
loadData();

function showToast(message, color = "#22c55e") {
  const toast = document.querySelector(".toast");

  toast.innerText = message;
  toast.style.background = color;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

const sound = new Audio("universfield-new-notification-017-352293.mp3");

function playSuccessSound() {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

sound.play().catch(() => {});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

function showLoading() {
  document.getElementById("loading").classList.add("show");
}

function hideLoading() {
  document.getElementById("loading").classList.remove("show");
}

const submitBtn = document.querySelector("button[type='submit']");

function showLoading() {
  document.getElementById("loading").classList.add("show");
  submitBtn.disabled = true;
}

function hideLoading() {
  document.getElementById("loading").classList.remove("show");
  submitBtn.disabled = false;
}

function setLoadingData(data) {
  document.getElementById("loadGantangan").innerText = data.gantangan;
  document.getElementById("loadKelas").innerText = data.kelas;
  document.getElementById("loadMerah").innerText = data.merah;
  document.getElementById("loadBiru").innerText = data.biru;
  document.getElementById("loadKuning").innerText = data.kuning;
}

function loadGantanganGrid() {
  const grid = document.getElementById("gantanganGrid");
  const input = document.getElementById("gantangan");

  for (let i = 1; i <= 60; i++) {
    const btn = document.createElement("button");
    btn.type = "button";

    const nomor = String(i).padStart(2, "0");

    btn.textContent = nomor;

    btn.onclick = () => {
      input.value = nomor;

      document.getElementById("selectedText").innerText = "NO. GANTANGAN = " + nomor;
      document.getElementById("selectedGantangan").style.display = "flex";

      grid.style.display = "none";
    };

    grid.appendChild(btn);
  }
}

function resetGantangan() {
  document.getElementById("gantangan").value = "";
  document.getElementById("selectedGantangan").style.display = "none";
  document.getElementById("gantanganGrid").style.display = "grid";
}

// jalankan saat load
loadGantanganGrid();

function loadKelasGrid() {
  const grid = document.getElementById("kelasGrid");
  const input = document.getElementById("kelas");

  const kelasList = ["A", "B", "C", "D", "E"];

  kelasList.forEach(k => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = k;

    btn.onclick = () => {
      input.value = k;

      document.getElementById("selectedKelasText").innerText = "SESI / PUTARAN = " + k;
      document.getElementById("selectedKelas").style.display = "flex";

      grid.style.display = "none";
    };

    grid.appendChild(btn);
  });
}

function resetKelas() {
  document.getElementById("kelas").value = "";
  document.getElementById("selectedKelas").style.display = "none";
  document.getElementById("kelasGrid").style.display = "grid";
}

// jalankan
loadKelasGrid();
