document.addEventListener('DOMContentLoaded', function(){

  /* زر الترجمة يغير كل النصوص */
  const translations = {
    ar: {
      'Website Packages': 'باقات تصميم المواقع',
      'Choose the right package and add the extras you need': 'اختر الباقة المناسبة لك وأضف الإضافات التي تحتاجها',
      'Simple E-commerce Store': 'متجر إلكتروني بسيط',
      'Products + Cart + Contact': 'منتجات + سلة + تواصل',
      'Pages: 5-7': 'عدد الصفحات: 5-7',
      'Delivery: 14 days': 'مدة التسليم: 14 يوم',
      'Medium Company Website': 'موقع شركة متوسط',
      'All above + Blog/News + Gallery': 'كل ما سبق + مدونة/أخبار + معرض صور',
      'Pages: 6-8': 'عدد الصفحات: 6-8',
      'Delivery: 10 days': 'مدة التسليم: 10 أيام',
      'Small Company Website': 'موقع شركة صغير',
      'Main + Services + About + Contact': 'رئيسية + خدمات + من نحن + تواصل',
      'Pages: 4-5': 'عدد الصفحات: 4-5',
      'Delivery: 7 days': 'مدة التسليم: 7 أيام',
      'Personal Website': 'موقع شخصي',
      'Intro + Portfolio + Contact': 'صفحة تعريفية + معرض أعمال + تواصل',
      'Pages: 3': 'عدد الصفحات: 3',
      'Delivery: 5 days': 'مدة التسليم: 5 أيام',
      'Order Now': 'اطلب الآن'
    },
    en: {
      'باقات تصميم المواقع': 'Website Packages',
      'اختر الباقة المناسبة لك وأضف الإضافات التي تحتاجها': 'Choose the right package and add the extras you need',
      'متجر إلكتروني بسيط': 'Simple E-commerce Store',
      'منتجات + سلة + تواصل': 'Products + Cart + Contact',
      'عدد الصفحات: 5-7': 'Pages: 5-7',
      'مدة التسليم: 14 يوم': 'Delivery: 14 days',
      'موقع شركة متوسط': 'Medium Company Website',
      'كل ما سبق + مدونة/أخبار + معرض صور': 'All above + Blog/News + Gallery',
      'عدد الصفحات: 6-8': 'Pages: 6-8',
      'مدة التسليم: 10 أيام': 'Delivery: 10 days',
      'موقع شركة صغير': 'Small Company Website',
      'رئيسية + خدمات + من نحن + تواصل': 'Main + Services + About + Contact',
      'عدد الصفحات: 4-5': 'Pages: 4-5',
      'مدة التسليم: 7 أيام': 'Delivery: 7 days',
      'موقع شخصي': 'Personal Website',
      'صفحة تعريفية + معرض أعمال + تواصل': 'Intro + Portfolio + Contact',
      'عدد الصفحات: 3': 'Pages: 3',
      'مدة التسليم: 5 أيام': 'Delivery: 5 days',
      'اطلب الآن': 'Order Now'
    }
  };

  const langBtn = document.getElementById('lang-toggle');
  let lang = document.documentElement.lang || 'ar';

  if(langBtn){
    langBtn.textContent = (lang==='ar') ? 'translate' : 'عربي';
    langBtn.addEventListener('click', ()=>{
      lang = (lang==='ar') ? 'en' : 'ar';
      document.documentElement.lang = lang;
      langBtn.textContent = (lang==='ar') ? 'translate' : 'عربيٍ';

      document.querySelectorAll('*').forEach(el=>{
        const txt = el.textContent.trim();
        if(translations[lang] && translations[lang][txt]){
          el.textContent = translations[lang][txt];
        }
      });
    });
  }

  /* صورة شخصية fallback */
  const profileImg = document.getElementById('profile-pic');
  if(profileImg){
    profileImg.addEventListener('error', ()=>{
      profileImg.src = 'images/default-avatar.png';
    });
  }

  /* إعداد Firebase + عداد الزوار */
  const firebaseConfig = {
    apiKey: "AIzaSyDg3HhwgnQQn_JOjXCGyCQP8YHF5FN8bE0",
    authDomain: "abodahab-4d14e.firebaseapp.com",
    projectId: "abodahab-4d14e",
    storageBucket: "abodahab-4d14e.appspot.com",
    messagingSenderId: "442622031382",
    appId: "1:442622031382:web:38c1f156f43a683eb56737"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  const counterRef = db.collection("visits").doc("counter");

  async function updateCounterAndShow() {
    try {
      await counterRef.set(
        { count: firebase.firestore.FieldValue.increment(1) },
        { merge: true }
      );
      const snap = await counterRef.get();
      const data = snap.data() || { count: 1 };
      const el = document.getElementById("visit-counter");
      if(el) el.textContent = "عدد الزوار: " + data.count;
    } catch (e) {
      const el = document.getElementById("visit-counter");
      if(el) el.textContent = "خطأ في العداد";
      console.error("Counter error:", e);
    }
  }

  updateCounterAndShow();

});
