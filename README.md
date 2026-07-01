# &ltPassOP/&gt - Your Own Password Manager

PassOP is a secure, clean, and responsive web-based password manager application. Built using the modern MERN stack, it allows users to save, edit, delete, and easily copy credentials (website URLs, usernames, and passwords) while maintaining a local state-synchronized UX alongside a MongoDB backend database.

## 🚀 Live Demo
Check out the live deployment here: **[Live Demo Link](https://your-vercel-or-live-link.vercel.app)** *(Update this link with your actual Vercel/hosting URL!)*

---

## ✨ Features

* **Full CRUD Operations:** Seamlessly Create, Read, Update, and Delete password entries.
* **Instant Clipboard Copy:** Clickable animated icons to instantly copy URLs, usernames, or passwords.
* **Password Visibility Toggle:** Built-in eye/eye-cross toggle functionality using React Refs to hide or reveal plain text passwords in the input field.
* **Visual Password Masking:** Table entries securely mask passwords dynamically using character-length repetition (`*`).
* **Interactive UI:** Enhanced with responsive Tailwind CSS gradients, customized layouts, and micro-animations via `lord-icon`.
* **Toast Notifications:** Smooth contextual alerts powered by `react-toastify` for successful saves, updates, deletions, and copy actions.
* **Robust Backend Isolation:** Communicates asynchronously with an Express backend connected to a MongoDB database layer.

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (Vite)
* **Tailwind CSS** (Responsive UI & background grid styling)
* **React Toastify** (Toast notifications)
* **UUIDv4** (Unique client-side identifier generation)

### Backend & Database
* **Node.js** & **Express.js**
* **MongoDB** (via official `mongodb` native driver)
* **CORS** & **Body-Parser** middleware

---

## 📦 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
* Ensure you have **Node.js** installed.
* Ensure you have a local **MongoDB** instance running on `mongodb://localhost:27017`.

### Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/MSaifUdDin-999/Password_Manager.git
cd Password_Manager

```

2. **Backend Setup**
* Navigate to your backend directory (or stay in the root if combined).
* Install dependencies:
```bash
npm install express mongodb cors body-parser

```


* Start the backend server with hot-reloading:
```bash
node --watch server.js

```


* The server will run on `http://localhost:3000`.


3. **Frontend Setup**
* Open a new terminal instance.
* Install frontend dependencies:
```bash
npm install

```


* Run the Vite development server:
```bash
npm run dev

```





---

## 📝 API Endpoints (Express Server)

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/` | Retrieves all stored credentials from the MongoDB collection. |
| **POST** | `/` | Inserts a new credential document into the database. |
| **DELETE** | `/` | Removes a credential matching the request body criteria. |
