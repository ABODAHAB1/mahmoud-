function openRequest(planName) {
  localStorage.setItem("selectedPlan", planName);
  window.location.href = "request.html";
}

function sendRequest() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const plan = localStorage.getItem("selectedPlan");

  if (!name || !contact) {
    alert("من فضلك املأ كل البيانات");
    return;
  }

  const message = `لقد وصلتك مهمة جديدة ✅\n\nالخطة: ${plan}\nالاسم: ${name}\nالتواصل: ${contact}`;

  // هنا لازم تضيف بيانات البوت بتاعك
  const telegramUrl = `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>&text=${encodeURIComponent(message)}`;

  fetch(telegramUrl)
    .then(() => {
      alert("تم إرسال الطلب بنجاح 🎉");
    })
    .catch(() => {
      alert("حصل خطأ أثناء الإرسال");
    });
}
