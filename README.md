# 🧑‍💻FocusFlow -  Smart Task Tracker 

**FocusFlow** is a powerful full-stack web application built to help users efficiently plan, prioritize, and manage their daily tasks. Designed with a clean and responsive interface, TaskWise empowers users with deadline alerts, smart filters, and a visually intuitive dashboard that makes productivity feel effortless.


---

## 🚀 Tech Stack

- **Frontend**: HTML, CSS , JS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: Netlify (Frontend), Render (Backend)

---

## 🛠️ Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/ankitadubey2004/FocusFlow
cd "FocusFlow"
```

2. Install frontend dependencies:
```bash
cd DashBoard
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a .env file inside the novexus-backend folder:
```bash
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```


5. Start the backend:
```bash
cd backend
npm run dev
```
 

6. Start the frontend:
```bash
cd ../DashBoard
npm run dev
```

---


## 🔗 Live Site
[Live Site](https://focusflowstasktracker.netlify.app/)

---

## 🔐 MongoDB Note
- MongoDB credentials are stored securely in the .env file.
- .env is ignored in version control to keep your database secure.
- Example used in code: mongoose.connect(process.env.MONGO_URI)

--- 


## ✅ Features
- 🔐User Authentication (Login/Signup)
- 📌Task Management (Add, Edit, Delete, Tag)
- ⚡Deadline Alerts & Visual Indicators
- 📅Calendar Integration (View tasks by date)
- 🔍Sort & Filter by Priority or Deadline
- 🔐MongoDB used for data persistence

--- 




