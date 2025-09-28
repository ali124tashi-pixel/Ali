// Toasts
function showToast(message){ const id='t'+Date.now();
  const html=`<div id="${id}" class="toast align-items-center border-0 mb-2" role="alert">
    <div class="d-flex"><div class="toast-body">${message}</div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;
  $('#toastArea').append(html); const t=new bootstrap.Toast(document.getElementById(id),{delay:3000}); t.show(); }
// Validation
function setupValidation(sel){ const form=document.querySelector(sel); if(!form) return;
  form.addEventListener('submit',e=>{ e.preventDefault(); let ok=true;
    form.querySelectorAll('[required]').forEach(el=>{ if(!el.value.trim()){el.classList.add('is-invalid'); ok=false;} else{el.classList.remove('is-invalid'); el.classList.add('is-valid');} });
    showToast(ok?'تم الإرسال بنجاح ✅':'يُرجى تعبئة الحقول المطلوبة ⚠️'); if(ok){ form.reset(); form.querySelectorAll('.is-valid').forEach(el=>el.classList.remove('is-valid')); }}); }
// Ajax modal
function loadModal(url, target){ const m=new bootstrap.Modal(document.getElementById(target)); const body=document.querySelector('#'+target+' .modal-body'); body.innerHTML='<div class="skeleton"></div>';
  fetch(url).then(r=>r.text()).then(html=>body.innerHTML=html).catch(()=>body.innerHTML='<p class="text-danger">فشل التحميل</p>'); m.show(); }
document.addEventListener('DOMContentLoaded',()=>{ setupValidation('#contactForm'); setupValidation('#loginForm'); setupValidation('#registerForm'); });
