// script.js - ساعة بتوقيت مصر (أرقام عربية)، تبديل لغة، مودال طلب، تحميل صورة مع fallback

document.addEventListener('DOMContentLoaded', function(){

  /* ===== الساعة بتوقيت القاهرة وبأرقام عربية (24 ساعة) ===== */
  function updateClockCairo(){
    const el = document.getElementById('site-clock');
    if(!el) return;
    const now = new Date();
    // نستخدم Intl لتحديد timeZone القاهرة
    const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Cairo' };
    // نعرض بالأرقام العربية للمستخدم المصري
    const timeStr = new Intl.DateTimeFormat('ar-EG', opts).format(now);
    el.textContent = timeStr;
  }
  updateClockCairo();
  setInterval(updateClockCairo, 1000);

  /* ===== تبديل اللغة (AR <-> EN) مع استبدال نصوص data-i18n ===== */
  const translations = {
    ar: {
      'site-title': 'باقات تصميم المواقع',
      'site-sub': 'اختر الباقة المناسبة لك وأضف الإضافات التي تحتاجها',
      'order': 'اطلب الآن',
      'pkg-personal-title': 'موقع شخصي',
      'pkg-personal-desc': 'صفحة تعريفية + معرض أعمال + تواصل',
      'pkg-smallco-title': 'موقع شركة صغير',
      'pkg-smallco-desc': 'رئيسية + خدمات + من نحن + تواصل',
      'pkg-mediumco-title': 'موقع شركة متوسط',
      'pkg-mediumco-desc': 'كل ما سبق + مدونة/أخبار + معرض صور',
      'pkg-shop-simple-title': 'متجر إلكتروني بسيط',
      'pkg-shop-simple-desc': 'منتجات + سلة + تواصل',
      'pkg-shop-adv-title': 'متجر إلكتروني متقدم',
      'pkg-shop-adv-desc': 'منتجات + سلة + دفع أونلاين + حسابات مستخدمين',
      'addons-title': '✨ الإضافات المدفوعة'
    },
    en: {
      'site-title': 'Website Packages',
      'site-sub': 'Choose the right package and add the extras you need',
      'order': 'Order Now',
      'pkg-personal-title': 'Personal Website',
      'pkg-personal-desc': 'Profile page + portfolio + contact',
      'pkg-smallco-title': 'Small Company Website',
      'pkg-smallco-desc': 'Home + Services + About + Contact',
      'pkg-mediumco-title': 'Medium Company Website',
      'pkg-mediumco-desc': 'All above + Blog/News + Gallery',
      'pkg-shop-simple-title': 'Simple E‑commerce',
      'pkg-shop-simple-desc': 'Products + Cart + Contact',
      'pkg-shop-adv-title': 'Advanced E‑commerce',
      'pkg-shop-adv-desc': 'Products + Cart + Online Payment + Accounts',
      'addons-title': '✨ Paid Add-ons'
    }
  };

  const langBtn = document.getElementById('lang-toggle');
  let lang = document.documentElement.lang || 'ar';
  if(langBtn){
    langBtn.textContent = (lang === 'ar') ? 'EN' : 'ع';
    langBtn.addEventListener('click', function(){
      lang = (lang === 'ar') ? 'en' : 'ar';
      document.documentElement.lang = lang;
      langBtn.textContent = (lang === 'ar') ? 'EN' : 'ع';
      // تبديل النصوص
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(translations[lang] && translations[lang][key]){
          el.textContent = translations[lang][key];
        }
      });
      // تحديث أزرار الطلب (عناصر بدون data-i18n)
      document.querySelectorAll('.order-btn').forEach(btn=>{
        btn.textContent = translations[lang] && translations[lang]['order'] ? translations[lang]['order'] : btn.textContent;
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

  /* ===== مودال الطلب البسيط ===== */
  const modal = document.getElementById('order-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel');
  const modalPackage = document.getElementById('modal-package');
  const orderForm = document.getElementById('order-form');

  function openModal(packageName){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    modalPackage.textContent = packageName || 'طلب خدمة';
    // ضبط لغة الزر داخل الموديال
    const submitBtn = modal.querySelector('button[type="submit"]');
    if(submitBtn) submitBtn.textContent = (lang === 'ar') ? 'إرسال الطلب' : 'Send Order';
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
  }

  // ربط أزرار "اطلب الآن"
  document.querySelectorAll('.order-btn').forEach(btn=>{
    btn.addEventListener('click', function(e){
      e.preventDefault();
      const pkg = btn.dataset.package || btn.textContent || 'طلب خدمة';
      openModal(pkg);
    });
  });

  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modalCancel) modalCancel.addEventListener('click', closeModal);
  // إغلاق عند الضغط خارج اللوحة
  if(modal){
    modal.addEventListener('click', function(e){
      if(e.target === modal) closeModal();
    });
  }

  // إرسال الطلب (هنا نجهز البيانات ويمكن لاحقًا ربط واتساب/تليجرام أو API)
  if(orderForm){
    orderForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(orderForm);
      const payload = {
        package: modalPackage.textContent,
        name: formData.get('name'),
        phone: formData.get('phone'),
        details: formData.get('details')
      };
      // حالياً نعرض في console ثم نغلق المودال. لاحقًا يمكن إرسال عبر API أو فتح واتساب.
      console.log('طلب جديد:', payload);
      // مثال: فتح واتساب مع رسالة جاهزة (تعليق - يحتاج رقمك)
      // const waNumber = '20XXXXXXXXX';
      // const waText = encodeURIComponent(`طلب خدمة: ${payload.package}\nالاسم: ${payload.name}\nالهاتف: ${payload.phone}\nالتفاصيل: ${payload.details}`);
      // window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');

      // إظهار تأكيد بسيط ثم إغلاق
      alert((lang === 'ar') ? 'تم إرسال الطلب. سنتواصل معك قريبًا.' : 'Order sent. We will contact you soon.');
      orderForm.reset();
      closeModal();
    });
  }

  /* ===== تأثير بسيط عند الضغط على الأزرار (console) ===== */
  document.querySelectorAll('.btn').forEach(button => {
    if(!button.dataset.hasClick){
      button.addEventListener('click', function(){
        console.log("زر تم الضغط عليه:", button.textContent.trim());
      });
      button.dataset.hasClick = '1';
    }
  });

});

