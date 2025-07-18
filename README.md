# Form Builder Application

This is a MERN stack (MongoDB, Express.js, React.js, Node.js) based Form Builder application developed as part of the assignment for the Full Stack Developer role at **Pepper Cloud**.

The goal of this application is to allow users to create, edit, view, and submit dynamic forms with customizable input fields.

---

## 🚀 Features

### ✅ Core Features
- Create new forms with custom fields
- Edit previously created forms
- View form in read-only or fillable mode
- Support for input types:  
  - Email  
  - Text  
  - Password  
  - Number  
  - Date  
- Display inputs in rows and 2 columns format
- Maximum 20 input fields per form
- Delete individual fields while editing
- Title and placeholder for each input
- Form submission with input validations

### 🎁 Bonus Features 
- Drag-and-drop to rearrange inputs during form creation/editing
- Group inputs into sections 
---

## 🧪 Tech Stack

| Technology | Usage |
|------------|--------|
| React.js   | Frontend |
| Express.js | Backend API |
| MongoDB    | Database |
| Node.js    | Server |
| HTML/CSS   | Layout and styling |

---

## 📁 Folder Structure

<pre>
project-root/
│
├── backend/              # Express API
│   ├── models/           # Mongoose models
│   ├── routes/           # Form APIs
│   ├── controllers/      # Logic handlers
│   ├── config/           # DB config and environment
│   └── index.js          # Entry point
│
├── frontend/             # React App
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── pages/        # Home, Create, Edit, View
│   │   ├── App.js        # App Router
│   │   └── index.js      # Entry point
│   ├── package.json      # Frontend dependencies
│   └── .gitignore
│
└── README.md             # This file
</pre>

---

## 🛠️ Getting Started

###  Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or cloud)
- npm

---

### 🔧 Backend Setup

```bash
cd backend
npm install
npm start
```

##.env

```
DB=mongodb://localhost:27017/form-builder
PORT=3050
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📹 Demo Video
Here’s a walkthrough of the assignment and features:

👉 https://drive.google.com/file/d/1uaVlElc1MKsq_yPRv503FsRYlVVPdf0y/view?usp=drive_link

---

## 📬 Contact
ARIKATLA HEMANTH KUMAR  
📧 arikatlahemanthkumar@gmail.com  
📞 +91-9492906798

This project was developed as a submission for the coding assignment at Pepper Cloud. The focus was on problem solving, UI building, and understanding core MERN stack principles. 