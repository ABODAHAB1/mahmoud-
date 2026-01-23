document.addEventListener('DOMContentLoaded', function(){

  /* الساعة بتوقيت القاهرة بالأرقام العربية */
  function updateClockCairo(){
    const el = document.getElementById('site-clock');
    if(!el) return;
    const now = new Date();
    const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Cairo' };
    const timeStr = new Intl.DateTimeFormat('ar-EG', opts).format(now);
    el.textContent = timeStr;
  }
  updateClockCairo();
  setInterval(updateClockCairo, 1000);

  /* زر الترجمة */
  const translations = {
    ar: { 'site-title':'باقات تصميم المواقع','site-sub':'اختر الباقة المناسبة لك وأضف الإضافات التي تحتاجها','order':'اطلب الآن' },
    en: { 'site-title':'Website Packages','site-sub':'Choose the right package and add the extras you need','order':'Order Now' }
  };
  const langBtn = document.getElementById('lang-toggle');
  let lang = document.documentElement.lang || 'ar';
  if(langBtn){
    langBtn.textContent = (lang==='ar')?'EN':'ع';
    langBtn.addEventListener('click', ()=>{
      lang = (lang==='ar')?'en':'ar';
      document.documentElement.lang = lang;
      langBtn.textContent = (lang==='ar')?'EN':'ع';
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(translations[lang] && translations[lang][key]){
          el.textContent = translations[lang][key];
        }
      });
      document.querySelectorAll('.order-btn').forEach(btn=>{
        btn.textContent = translations[lang]['order'];
      });
    });
  }

  /* صورة شخصية fallback
