const backendUrl = "https://donor-backend-jfpw.onrender.com/webhook";

// 1. Зберігаємо UTM + client_id в localStorage при завантаженні
(function saveUTMToLocalStorage() {
    const getParam = (name) => new URLSearchParams(window.location.search).get(name);

    const sessionData = {
        utm_source: getParam('utm_source'),
        utm_medium: getParam('utm_medium'),
        utm_campaign: getParam('utm_campaign'),
        gclid: getParam('gclid'),
        fbclid: getParam('fbclid'),
        referrer: document.referrer || null,
        timestamp: new Date().toISOString(),
        client_id: crypto.randomUUID(),
    };

    localStorage.setItem("donor_session_data", JSON.stringify(sessionData));
    console.log("✅ Session data saved:", sessionData);
})();

// 2. Submit форми — надсилаємо дані у бекенд
document.getElementById("donateForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const data = JSON.parse(localStorage.getItem("donor_session_data") || "{}");

    const amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Будь ласка, введіть коректну суму.");
        return;
    }

    const payload = {
        client_id: data.client_id || "",
        utm_source: data.utm_source || "",
        utm_medium: data.utm_medium || "",
        utm_campaign: data.utm_campaign || "",
        amount: amount
    };

    fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
        .then(res => res.json())
        .then(data => {
            alert("Донат збережено! ✅");
            console.log("🔄 Server response:", data);
        })
        .catch(err => {
            alert("Помилка при надсиланні 😢");
            console.error(err);
        });
});
