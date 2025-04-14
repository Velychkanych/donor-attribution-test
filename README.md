# Donor Attribution Tracking (Test Task)

This repository implements a **donor attribution system** that captures UTM parameters, a unique session identifier (`client_id`), and the donation amount — even when the payment is processed via a third-party provider (simulated as Wayforpay).

✅ All services are fully deployed and ready for review.

---

## 🔗 Live Demo

| Component    | Link                                                                 |
|--------------|----------------------------------------------------------------------|
| 🌐 Frontend   | [donor-attribution-test.vercel.app](https://donor-attribution-test.vercel.app/?utm_source=facebook&utm_medium=cpc&utm_campaign=ukraine_support) |
| 🛠 Backend    | [donor-backend.onrender.com/events](https://donor-backend-jfpw.onrender.com/events) |
| 📁 GitHub Repo | [github.com/Velychkanych/donor-attribution-test](https://github.com/Velychkanych/donor-attribution-test) |

---

## 🧰 Tech Stack

- **Frontend:** HTML + Vanilla JS + CSS (session tracking via `localStorage`)
- **Backend:** Node.js (Express) — Webhook simulation and event logging
- **Hosting:**
    - [Vercel](https://vercel.com) for frontend
    - [Render](https://render.com) for backend

---

## ⚙️ How It Works

1. A user arrives at the website via a link with UTM parameters:
  ```js
https://donor-attribution-test.vercel.app/?utm_source=facebook&utm_medium=cpc&utm_campaign=ukraine_support
```

2. The frontend script:
- Parses UTM parameters from the URL
- Generates a unique `client_id`
- Stores all session data in `localStorage`

3. The user enters a donation amount and clicks “Donate”

4. The following data is sent via `POST` to the backend:
- `client_id`
- `utm_source`, `utm_medium`, `utm_campaign`
- `amount`

5. The backend stores all events in memory and exposes them via:
```js
https://donor-backend-jfpw.onrender.com/events
```

6. Events can be cleared for testing via:
```js
https://donor-backend-jfpw.onrender.com/reset
```


---

## 🧪 How to Test

1. Visit the frontend with UTM parameters:
   [Click to open](https://donor-attribution-test.vercel.app/?utm_source=facebook&utm_medium=cpc&utm_campaign=ukraine_support)

2. Enter any amount (e.g. `100`) and click **Donate**

3. View saved events:
   [Backend Events Viewer](https://donor-backend-jfpw.onrender.com/events)

You should see your `client_id`, `utm_*`, and `amount`.

---

## 📁 Project Structure

```text
donor-attribution-test/ 
├── frontend/ 
│ ├── index.html # Main donation page 
│ ├── script.js # UTM logic and form handling 
│ └── styles.css # Styled and responsive form layout 
├── backend/ 
│ ├── index.js # Node.js server with Webhook + event storage 
│ └── package.json # Project dependencies and run script
├── README.md 
```


---

## 🔍 Key Features

- Captures and retains:
    - `utm_source`, `utm_medium`, `utm_campaign`
    - `client_id` per session
    - `amount` input from user
- Persists data in memory for simplicity
- Backend API for viewing and resetting events
- Fully deployed frontend + backend
- Scalable and extendable to BigQuery / GA4 / Meta Conversions API


---

## ⚠️ Note on Backend Cold Start (Render Free Tier)

The backend is deployed on [Render's free tier](https://render.com/docs/free), which automatically puts inactive services to sleep after a short period of inactivity.

**What this means:**

- The **first request** from the frontend to the backend (e.g. submitting a donation from [`donor-attribution-test.vercel.app`](https://donor-attribution-test.vercel.app/?utm_source=facebook&utm_medium=cpc&utm_campaign=ukraine_support)) may take **5–15 seconds** to respond.
- This behavior is expected and documented in [Render’s official documentation](https://render.com/docs/free#web-services).
- Once the backend has "warmed up", all following requests will be fast and responsive.

✅ Please wait patiently on the first interaction.  
✅ You will know the request has been processed **once you see a confirmation `alert()` message** on the frontend.

---

## 👤 Author

**Yurii Velychkanych**  
GitHub: [@Velychkanych](https://github.com/Velychkanych)

---

## ✅ Status

**The task has been completed, deployed, and is fully functional. Ready for review.**
