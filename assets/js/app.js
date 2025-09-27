document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const welcomeToastEl = document.getElementById('welcomeToast');
  if (welcomeToastEl) new bootstrap.Toast(welcomeToastEl,{delay:3000}).show();

  const authForm = document.getElementById('authForm');
  if (authForm){
    authForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      if (!authForm.checkValidity()) {
        authForm.classList.add('was-validated');
        return;
      }
      new bootstrap.Modal('#okModal').show();
    });
    const btnCreate = document.getElementById('btnCreate');
    if (btnCreate){
      btnCreate.addEventListener('click', ()=>{
        new bootstrap.Modal('#createModal').show();
      });
    }
    const confirmCreate = document.getElementById('confirmCreate');
    if (confirmCreate){
      confirmCreate.addEventListener('click', async ()=>{
        await new Promise(r=>setTimeout(r, 700));
        localStorage.setItem('assemble-user','created');
        bootstrap.Modal.getInstance(document.getElementById('createModal')).hide();
        new bootstrap.Modal('#okModal').show();
      });
    }
  }

  document.querySelectorAll('.choose-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const type = btn.dataset.type;
      localStorage.setItem('assemble-type', type);
      const imgMap = {sedan:'assets/images/sedan.jpg', family:'assets/images/family.jpg', truck:'assets/images/truck.jpg'};
      const prevImg = document.getElementById('previewImg');
      if (prevImg) prevImg.src = imgMap[type];
      const pm = document.getElementById('previewModal');
      if (pm) new bootstrap.Modal(pm).show();
    });
  });

  const colorWrap = document.getElementById('colorSwatches');
  if (colorWrap){
    const img = document.getElementById('carImage');
    const type = localStorage.getItem('assemble-type') || 'sedan';
    fetch('assets/data/colors.json').then(r=>r.json()).then(data=>{
      const colors = data[type] || data['sedan'];
      colors.forEach((c,i)=>{
        const d = document.createElement('div');
        d.className = 'sw';
        d.style.background = c.hex;
        d.title = c.name;
        if (i===0) d.classList.add('active');
        d.addEventListener('click', ()=>{
          document.querySelectorAll('#colorSwatches .sw').forEach(s=>s.classList.remove('active'));
          d.classList.add('active');
          img.src = `assets/images/${type}_color_${c.id}.png`;
        });
        colorWrap.appendChild(d);
      });
    });

    const base = 18000;
    const priceEl = document.getElementById('price');
    const toggles = ['leatherSeats','sunroof','ambient'].map(id=>document.getElementById(id));
    const updatePrice = ()=>{
      let p = base;
      if (toggles[0].checked) p += 800;
      if (toggles[1].checked) p += 1200;
      if (toggles[2].checked) p += 300;
      priceEl.textContent = p.toLocaleString();
    };
    toggles.forEach(t=>t.addEventListener('change', updatePrice));
    updatePrice();

    document.getElementById('btnSaveConfig').addEventListener('click', ()=>{
      const conf = {
        type,
        color: document.querySelector('#colorSwatches .active')?.title,
        engine: document.getElementById('engine').value,
        gear: document.getElementById('gear').value,
        rims: document.getElementById('rims').value,
        interior: document.getElementById('interior').value,
        options: {
          leather: toggles[0].checked,
          sunroof: toggles[1].checked,
          ambient: toggles[2].checked
        },
        price: document.getElementById('price').textContent
      };
      localStorage.setItem('assemble-config', JSON.stringify(conf));
      const toast = document.getElementById('saveToast');
      if (toast) new bootstrap.Toast(toast).show();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      if (!contactForm.checkValidity()){
        contactForm.classList.add('was-validated');
        return;
      }
      await new Promise(r=>setTimeout(r,700));
      const modal = document.getElementById('sentModal');
      if (modal) new bootstrap.Modal(modal).show();
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }
});
