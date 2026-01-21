document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("requestForm");
  if (!form) return;

  const button = form.querySelector("button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const offer = document.getElementById("offer").value.trim();
    const name = document.getElementById("name").value.trim();
    const country = document.getElementById("country").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // تحقق من البيانات
    if (!name || !country || !contact) {
      button.classList.add("shake");
      setTimeout(() => button.classList.remove("shake"), 500);
      showPopup("⚠️ من فضلك املأ جميع البيانات قبل الإرسال", "error");
      return;
    }

    // رسالة الطلب
    const message = `طلب جديد من ستور أبوالدهب:\nالعرض: ${offer}\nالاسم: ${name}\nالدولة: ${country}\nالتواصل: ${contact}`;
    const encoded = encodeURIComponent(message);

    // تأكيد قبل الإرسال
    const confirmSend = confirm("هل أنت متأكد من إرسال الطلب؟");
    if (confirmSend) {
      window.open(`https://t.me/z_o_w?text=${encoded}`, "_blank");
      showPopup("✅ تم إرسال طلبك بنجاح، سنتواصل معك قريبًا!", "success");
      form.reset();
    }
  });

  // دالة لعرض Popup أنيق بدل الـ alert
  function showPopup(text, type) {
    const popup = document.createElement("div");
    popup.className = `popup ${type}`;
    popup.textContent = text;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.classList.add("show");
    }, 50);

    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 300);
    }, 3000);
  }
});
/* Popup أنيق */
.popup {
  position: fixed;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: #0077aa;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 1rem;
  z-index: 9999;
}

.popup.show {
  bottom: 30px;
  opacity: 1;
}

.popup.success {
  background: #28a745;
}

.popup.error {
  background: #dc3545;
}
