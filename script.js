// فتح صفحة الطلب request.html مع تمرير اسم الباقة كـ query parameter
function openRequest(packageName){
  // ترميز الاسم ليتوافق مع URL
  const encoded = encodeURIComponent(packageName);
  // فتح في تبويب جديد مع تمرير الباقة
  window.open(`request.html?package=${encoded}`, '_blank');
}

// عند تحميل request.html يمكن قراءة الباقة من الرابط وعرضها تلقائياً
function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// إذا كنا في صفحة الطلب، نعرض اسم الباقة في العنصر المناسب
document.addEventListener('DOMContentLoaded', function(){
  const pkg = getQueryParam('package');
  if(pkg){
    const titleEl = document.getElementById('requested-package');
    if(titleEl) titleEl.textContent = decodeURIComponent(pkg);
  }
});
