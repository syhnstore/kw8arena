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

  setLoadingText("Memperbarui data...");
  showLoadingOverlay();

  if (!d.gantangan || !d.kelas) return;

  // isi value input
  gantangan.value = d.gantangan;
  kelas.value = d.kelas;
  merah.value = d.merah;
  biru.value = d.biru;
  kuning.value = d.kuning;

  // 🔥 SET TAMPILAN GANTANGAN
  document.getElementById("selectedText").innerText =
    "NO. GANTANGAN = " + d.gantangan;

  document.getElementById("selectedGantangan").style.display = "flex";
  document.getElementById("gantanganGrid").style.display = "none";

  // 🔥 SET TAMPILAN KELAS
  document.getElementById("selectedKelasText").innerText =
    "SESI / PUTARAN = " + d.kelas;

  document.getElementById("selectedKelas").style.display = "flex";
  document.getElementById("kelasGrid").style.display = "none";

  editIndex = i;
}

// 🗑️ Hapus Satu Data
function hapusData(i) {
  const list = getData();
  const data = list[i];

  showToast("⏳ Menghapus...", "#f59e0b");

  // tampilkan loading
  setLoadingText("Sedang menghapus data server...");
  showLoadingOverlay();

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      id: data.id,
      action: "delete"
    })
  })
  .then(res => res.text())
  .then(result => {
    if (result === "deleted") {

      setTimeout(() => {
        list.splice(i, 1);
        saveData(list);
        loadData();

        showToast("🗑️ Berhasil dihapus", "#22c55e");
      }, 1000); // delay 1 detik
    }
    else {
      showToast("❌ Gagal dihapus", "#ef4444");
    }

  })
  .catch(() => {
    showToast("❌ Koneksi error", "#ef4444");
  })
  .finally(() => {
    hideLoadingOverlay();
    setLoadingText("Mengirim data ke server");
  });
}

function deleteAllData() {
  if (!confirm("Yakin ingin hapus SEMUA data?")) return;

  // tampilkan loading
  setLoadingText("Menghapus semua data...");
  showLoadingOverlay();

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "deleteAll" })
  })
  .then(res => res.text())
  .then(result => {

    if (result === "all deleted") {

      // ⏳ delay biar spreadsheet benar-benar update
      setTimeout(() => {
        localStorage.removeItem("data");
        loadData();

        showToast("🔥 Semua data berhasil dihapus", "#22c55e");
      }, 1000);

    } else {
      showToast("❌ Gagal hapus semua data", "#ef4444");
    }

  })
  .catch(() => {
    showToast("❌ Koneksi error", "#ef4444");
  })
  .finally(() => {
    hideLoadingOverlay();
    setLoadingText("Mengirim data ke server");
  });
}

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();

  if (!gantangan.value || !kelas.value) {
    showToast("⚠️ Pilih gantangan & sesi dulu", "#f59e0b");
    return;
  }

  if (!merah.value && !biru.value && !kuning.value) {
    showToast("⚠️ Minimal isi 1 nilai stick", "#f59e0b");
    return;
  }

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
  showConfirm();
});

function confirmSubmit() {
  if (isSubmitting) return;
  isSubmitting = true;

  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // disable tombol
  confirmBtn.disabled = true;
  cancelBtn.disabled = true;

  confirmBtn.innerText = "Mengirim...";

  // pindah overlay
  hideConfirm();
  setLoadingText("Mengirim data ke server...");
  showLoadingOverlay();

  let list = getData();

  if (editIndex !== null) {
    list[editIndex] = pendingData;
    editIndex = null;
  } else {
    list.push(pendingData);
  }

  saveData(list);

  setLoadingText("Memperbarui data...");

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(pendingData)
  })
  .then(() => {
    playSuccessSound();
    showSuccessAnimation();
  })
  .catch(() => {
    showToast("❌ Gagal kirim data", "#ef4444");
  })
  .finally(() => {
    hideLoadingOverlay();
    setLoadingText("Mengirim data ke server");

    confirmBtn.disabled = false;
    cancelBtn.disabled = false;
    confirmBtn.innerText = "Konfirmasi";

    form.reset();
    resetGantangan();
    resetKelas();
    loadData();

    isSubmitting = false;
  });
}

function cancelSubmit() {
  pendingData = null;
  hideConfirm();
}

function showSuccessAnimation() {
  const el = document.getElementById("successOverlay");

  el.classList.add("show");
  lockScroll();

  setTimeout(() => {
    el.classList.remove("show");
    unlockScroll();
  }, 2000);
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

let sound;

document.addEventListener("click", () => {
  if (!sound) {
    sound = new Audio("https://raw.githubusercontent.com/syhnstore/kw8arena/main/assets/sound/notif.mp3");
    sound.volume = 1;
  }
}, { once: true });

function playSuccessSound() {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

const submitBtn = document.querySelector("button[type='submit']");

function showConfirm() {
  document.getElementById("confirmOverlay").classList.add("show");
  lockScroll();
}

function hideConfirm() {
  document.getElementById("confirmOverlay").classList.remove("show");
  unlockScroll();
}

function showLoadingOverlay() {
  document.getElementById("loadingOverlay").classList.add("show");
  lockScroll();
}

function hideLoadingOverlay() {
  document.getElementById("loadingOverlay").classList.remove("show");
  unlockScroll();
}

function setLoadingData(data) {
  document.getElementById("loadGantangan").innerText = data.gantangan;
  document.getElementById("loadKelas").innerText = data.kelas;
  document.getElementById("loadMerah").innerText = data.merah;
  document.getElementById("loadBiru").innerText = data.biru;
  document.getElementById("loadKuning").innerText = data.kuning;
}

function setLoadingText(text) {
  document.getElementById("loadingText").innerText = text;
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

function lockScroll() {
  document.body.classList.add("no-scroll");
}

function unlockScroll() {
  document.body.classList.remove("no-scroll");
}

// jalankan
loadKelasGrid();

document.addEventListener("touchmove", function(e) {
  if (document.body.classList.contains("no-scroll")) {
    e.preventDefault();
  }
}, { passive: false });

function searchData() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const list = getData();
  const tbody = document.getElementById("tableBody");

  tbody.innerHTML = "";

  const filtered = list.filter(d => 
    d.gantangan.toLowerCase().includes(keyword) ||
    d.kelas.toLowerCase().includes(keyword)
  );

  filtered.forEach(d => {
    const index = list.findIndex(x => x.id === d.id);

    tbody.innerHTML += `
      <tr>
        <td>${d.gantangan}</td>
        <td>${d.kelas}</td>
        <td>${d.merah}</td>
        <td>${d.biru}</td>
        <td>${d.kuning}</td>
        <td>
          <button onclick="editData(${index})" class="edited">Edit</button>
          <button onclick="hapusData(${index})" class="erase">Hapus</button>
        </td>
      </tr>
    `;
  });
}
