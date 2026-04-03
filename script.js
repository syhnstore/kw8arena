document.addEventListener('DOMContentLoaded', function(){

const el = id => document.getElementById(id);

function hitung(){
  let merah = Number(el('inputMerah').value);
  let sm = Number(el('stikMerah').value);
  let sb = Number(el('stikBiru').value);
  let sk = Number(el('stikKuning').value);
  let restart = Number(el('inputRestart').value);

  let totalMerah = merah * sm;
  let totalBiru = 40 * sb;
  let totalKuning = 10 * sk;

  el('totalMerah').value = totalMerah || 0;
  el('totalBiru').value = totalBiru || 0;
  el('totalKuning').value = totalKuning || 0;

  let before = totalMerah + totalBiru + totalKuning;
  el('before').value = before || 0;

  let after = before;
  if(restart > 0){
    while(after > restart){
      after -= restart;
    }
  }

  el('after').value = after || 0;
}

['inputMerah','stikMerah','stikBiru','stikKuning','inputRestart']
.forEach(id => el(id).addEventListener('input', hitung));

// SAVE FIX FINAL
el('btnSave').addEventListener('click', function(){
  let gantangan = el('gantangan').value;
  if(!gantangan){
    alert(('HARAP ISI BAGIAN INPUT YANG KOSONG') + '\n' + ('SEBELUM ANDA SIMPAN KE DATA PESERTA'));
    return;
  }

  let data = {
    gantangan,
    sesi: el('sesi').value,
    totalMerah: el('totalMerah').value,
    totalBiru: el('totalBiru').value,
    totalKuning: el('totalKuning').value,
    before: el('before').value,
    restart: el('inputRestart').value,
    after: el('after').value
  };

  let list = JSON.parse(localStorage.getItem('data') || '[]');
  list.push(data);
  localStorage.setItem('data', JSON.stringify(list));

  el('dropdown').addEventListener('change', showDetail);

  function showDetail(){
  let list = JSON.parse(localStorage.getItem('data') || '[]');
  let index = el('dropdown').value;
  if(index === ""){
    el('detail').innerHTML = '';
    return;
  }

  let d = list[index];

  el('detail').innerHTML = `
  <div style="margin-top:10px">
  <b>GANTANGAN:</b> ${d.gantangan}<br>
  <b>SESI:</b> ${d.sesi}<br><br>

  <b style="color: #fd6060;">MERAH:</b> ${d.totalMerah}<br>
  <b style="color: #6097fd;">BIRU:</b> ${d.totalBiru}<br>
  <b style="color: #fde060;">KUNING:</b> ${d.totalKuning}<br><br>

  <b>SEBELUM RESTART:</b> ${d.before}<br>
  <b>RESTART POINT:</b> ${d.restart}<br>
  <b>SETELAH RESTART:</b> ${d.after}
  </div>
  `;
}

  loadDropdown();
  alert('BERHASIL SIMPAN');
});

el('btnReset').addEventListener('click', ()=>{
  document.querySelectorAll('input').forEach(i=>i.value='');
});

el('btnDelete').addEventListener('click', ()=>{
  let list = JSON.parse(localStorage.getItem('data') || '[]');
  let index = el('dropdown').value;
  list.splice(index,1);
  localStorage.setItem('data', JSON.stringify(list));
  loadDropdown();
});

el('btnClear').addEventListener('click', ()=>{
  localStorage.removeItem('data');
  loadDropdown();
});

function loadDropdown(){
  let list = JSON.parse(localStorage.getItem('data') || '[]');
  let dd = el('dropdown');
  dd.innerHTML='';
  list.forEach((d,i)=>{
    let opt = document.createElement('option');
    opt.value=i;
    opt.text = `No.Gantangan ${d.gantangan} - Sesi ${d.sesi}`;
    dd.appendChild(opt);
  });
}

loadDropdown();

});
