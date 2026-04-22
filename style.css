* {
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
}

body {
  margin: 0;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #fff;
}

.container {
  max-width: 100%;
  margin: auto;
  padding: 20px;
}

h2.inputdt {
  text-align: center;
  margin: 0px 0 20px 0;
}

h2.savedt {
  text-align: center;
  margin: -5px 0 20px 0;
}

/* 🔥 LAYOUT FLEX DESKTOP */
.main-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* BOX STYLE */
.form-box, .table-box {
  width: 100%;
  flex: 1;
  background: rgba(255,255,255,0.05);
  padding: 20px;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* FORM MODERN */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.input-group label {
  font-size: 13px;
  margin-bottom: 5px;
  color: #cbd5f5;
}

input, select {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(15,23,42,0.7);
  color: #fff;
  transition: 0.2s;
}

/* EFFECT FOCUS */
input:focus, select:focus {
  outline: none;
  border: 1px solid #22c55e;
  box-shadow: 0 0 0 2px rgba(34,197,94,0.3);
}

/* GRID KELAS */
.kelas-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 3px;
}

.kelas-grid button {
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: white;
  transition: 0.2s;
  margin: 0;
}

/* WARNA PER KELAS */
.kelas-grid button:nth-child(1) { background: rgba(239,68,68,0.4); } /* A */
.kelas-grid button:nth-child(2) { background: rgba(59,130,246,0.4); } /* B */
.kelas-grid button:nth-child(3) { background: rgba(34,197,94,0.4); } /* C */
.kelas-grid button:nth-child(4) { background: rgba(234,179,8,0.4); } /* D */
.kelas-grid button:nth-child(5) { background: rgba(168,85,247,0.4); } /* E */

.kelas-grid button:hover {
  transform: scale(1.05);
}

/* SELECTED BOX (reuse dari gantangan, tapi kita perkuat) */
.selected-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(34,197,94,0.2);
  padding: 12px;
  border-radius: 12px;
  margin-top: 8px;
}

.selected-box span {
  font-size: 16px;
  font-weight: bold;
}

/* GRID NILAI */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* BUTTON MODERN */
button {
  width: 100%;
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34,197,94,0.4);
}

/* 🔒 BUTTON DISABLED */
button:disabled {
  background: #64748b !important; /* abu-abu */
  cursor: not-allowed;
  opacity: 0.7;
  transform: none !important;
  box-shadow: none !important;
}

/* hilangkan efek hover */
button:disabled:hover {
  transform: none;
  box-shadow: none;
}

form {
  background: rgba(255,255,255,0.05);
  padding: 15px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

/* 🔥 TABLE MODERN */
table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
}

/* HEADER */
th {
  padding: 12px;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.1);
}

/* BODY */
td {
  padding: 10px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.08);
  transition: 0.2s;
}

/* HOVER ROW */
tr:hover td {
  background: rgba(255,255,255,0.08);
}

tr:nth-child(even) td {
  background-color: rgba(255,255,255,0.03);
}

/* 🔘 BUTTON DI TABLE */
td button {
  padding: 6px 10px;
  margin: 2px;
  border-radius: 8px;
  font-size: 12px;
  border: none;
  cursor: pointer;
}

/* RESPONSIVE SCROLL */
.table-wrapper {
  overflow-x: auto;
}

/* 🔥 TOAST NOTIF */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #22c55e;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
  opacity: 0;
  transform: translateY(-20px);
  transition: 0.5s;
  z-index: 999;
}

.toast.show {
  z-index: 1000;
  opacity: 1;
  transform: translateY(0);
}

/* 🔥 LOADING OVERLAY */
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  z-index: 2000;
}

.loading.show {
  opacity: 1;
  pointer-events: all;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255,255,255,0.2);
  border-top: 5px solid #22c55e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

/* BOX */
.loading-box {
  background: rgba(30,41,59,0.95);
  padding: 20px;
  border-radius: 16px;
  width: 90%;
  max-width: 320px;
}

.invoice .row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  font-size: 14px;
}

.invoice .row span:last-child {
  font-weight: bold;
  color: #22c55e;
}

/* TOTAL ROW */
.invoice .total {
  border-bottom: none;
}

/* BUTTON AREA */
.loading-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

/* BUTTON STYLE */
.btn-confirm {
  flex: 1;
  background: #22c55e;
}

.btn-cancel {
  flex: 1;
  background: #ef4444;
}

.sending-spinner {
  width: 30px;
  height: 30px;
  border: 4px solid rgba(255,255,255,0.2);
  border-top: 4px solid #22c55e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 15px auto 0;
}

.loading-box h3 {
  margin: 10px 0;
}

.loading-data {
  text-align: left;
  margin-top: 10px;
}

.loading-data p {
  margin: 4px 0;
  font-size: 14px;
}

.loading-data span {
  font-weight: bold;
  color: #22c55e;
}

.loading-text {
  margin-top: 10px;
  font-size: 13px;
  opacity: 0.8;
}

/* GRID */
.gantangan-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
  margin-top: 3px;
}

/* BUTTON ANGKA */
.gantangan-grid button {
  padding: 12px;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: white;
  transition: 0.2s;
  margin: 0;
}

.gantangan-grid button:hover {
  background: rgba(255,255,255,0.2);
}

/* BOX TERPILIH */
.selected-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(34,197,94,0.2);
  padding: 12px;
  border-radius: 12px;
  margin-top: 8px;
}

.selected-box span {
  font-size: 16px;
  font-weight: bold;
}

.selected-box button {
  background: #ef4444;
  padding: 6px 10px;
  font-size: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {

  .container {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  form {
    padding: 18px;
    border-radius: 14px;
  }

  input, select {
    font-size: 18px;
    padding: 18px;
    margin-top: 12px;
  }

  button {
    font-size: 18px;
    padding: 18px;
    margin-top: 14px;
  }

  table {
    font-size: 14px;
  }

  th, td {
    padding: 10px 5px;
  }

  td button {
    width: 100%;
    margin-top: 4px;
  }

}

@media (max-width: 768px) {

  .main-layout {
    flex-direction: column;
  }

  .grid-3 {
    grid-template-columns: 1fr;
  }

}

/* FOOTER */
.footer {
  margin-top: 30px;
  padding: 15px;
  text-align: center;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  border-top: 1px solid rgba(255,255,255,0.1);
}

/* biar tetap rapi di desktop */
@media (min-width: 768px) {
  .footer {
    margin-top: 40px;
  }
}
