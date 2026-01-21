document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("requestForm");
  if (!form) return;

  const button = form.querySelector("button");

  // قراءة العرض من الرابط (query string)
  const urlParams = new URLSearchParams(window.location.search);
  const offerParam = urlParams.get("offer");
  if (offerParam) {
    const offerSelect = document.getElementById("offer");
    if (offerSelect) offerSelect.value = offerParam;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const offer = document.getElementById("offer").value.trim();
    const name = document.getElementById("name").value.trim();
    const country = document.getElementById("country").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!name || !country || !contact) {
      button.classList.add("shake");
      setTimeout(() => button.classList.remove("shake"), 500);
      showPopup("⚠️ من فضلك املأ جميع البيانات قبل الإرسال", "error");
      return;
    }

    const message = `طلب جديد من ستور أبوالدهب:\nالعرض: ${offer}\nالاسم: ${name}\nالدولة: ${country}\nالتواصل: ${
