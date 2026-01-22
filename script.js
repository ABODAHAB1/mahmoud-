// script.js - مدمج: ساعة رقمية، تبديل لغة، تحميل صورة شخصية، وتأثير أزرار
document.addEventListener('DOMContentLoaded', function(){

  /* ===== ساعة رقمية ===== */
  function updateClock(){
    const el = document.getElementById('site-clock');
    if(!el) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    el.textContent = `${hh}:${mm}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ===== تبديل اللغة البسيط ===== */
  const langBtn = document.getElementById('lang-toggle');
  let lang = document.documentElement.lang || 'ar';
  const translations = {
    ar: { 'site-sub': 'اختر الباقة المناسبة لك وأضف الإضافات التي تحتاجها', 'order': 'اطلب الآن' },
    en: { 'site-sub': 'Choose the right package and add the extras you need', 'order': 'Order Now' }
  };
  if(langBtn){
    langBtn.textContent = (lang === 'ar') ? 'EN' : 'ع';
    langBtn.addEventListener('click', function(){
      lang = (lang === 'ar') ? 'en' : 'ar';
      document.documentElement.lang = lang;
      langBtn.textContent = (lang === 'ar') ? 'EN' : 'ع';
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(translations[lang] && translations[lang][key]){
          el.textContent = translations[lang][key];
        }
      });
    });
  }

  /* ===== تحميل الصورة الشخصية مع fallback ===== */
  const profileImg = document.getElementById('profile-img');
  if(profileImg){
    const src = profileImg.getAttribute('src') || '';
    profileImg.addEventListener('error', function(){
      profileImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
           <rect width="100%" height="100%" fill="#2b2b2b"/>
           <text x="50%" y="50%" fill="#fff" font-size="48" font-family="Cairo, sans-serif" dominant-baseline="middle" text-anchor="middle">م</text>
         </svg>`
      );
    });
    if(src) profileImg.src = src;
  }

  /* ===== تعامل موحد مع الأزرار ===== */
  // تأثير بسيط عند الضغط على الأزرار (كودك الأصلي)
  document.querySelectorAll('.btn').forEach(button => {
    // نحتفظ بالوظيفة الأصلية (console) لكن نمنع تكرار الأحداث
    if(!button.dataset.hasClick){
      button.addEventListener('click', function(e){
        console.log("تم التوجه لصفحة الطلب...");
        // إذا الزر يحتوي href سيعمل تلقائياً، وإلا نوجه لصفحة الطلب
        const href = button.getAttribute('href');
        if(!href && button.classList.contains('order-btn')){
          e.preventDefault();
          window.location.href = 'request.html';
        }
      });
      button.dataset.hasClick = '1';
    }
  });

  // أزرار الطلب الخاصة (تضمن عمل الطلب أو فتح مودال لاحقاً)
  document.querySelectorAll('.order-btn, .btn-primary').forEach(btn=>{
    if(!btn.dataset.orderBound){
      btn.addEventListener('click', function(e){
        // إذا كان الزر رابطاً حقيقياً اترك المتصفح يتعامل معه
        const href = btn.getAttribute('href');
        if(!href){
          e.preventDefault();
          // هنا يمكن فتح مودال أو تمرير بيانات الباقة
          window.location.href = 'request.html';
        }
      });
      btn.dataset.orderBound = '1';
    }
  });

});

