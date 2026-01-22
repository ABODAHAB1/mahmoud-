// تأثير بسيط عند الضغط على الأزرار
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        console.log("تم التوجه لصفحة الطلب...");
    });
});

// يمكن إضافة منطق هنا لاحقاً إذا أردت حساب التكلفة الإجمالية ديناميكياً
