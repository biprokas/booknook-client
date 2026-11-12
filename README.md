# BookNook — Your Little Library

BookNook is a small online library management platform where readers can discover books, share their own collections, borrow books, and manage their borrowing activities.

## 🌐 Live Website

**Live URL:** Add your deployed website URL here.

## ✨ Key Features

- **User Authentication:** Register and log in using email/password or Google.
- **Browse Books:** Explore all available books in a responsive book collection.
- **Book Details:** View book information, descriptions, authors, and availability.
- **Add Books:** Upload book covers and add books to the library.
- **My Books:** Manage your uploaded books with edit and delete functionality.
- **Borrow Books:** Borrow available books and select a return date.
- **My Borrows:** View borrowed books and return them.
- **Profile Management:** Update your profile name and profile image.
- **Responsive Design:** Enjoy the application on desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

**Frontend:**

- Next.js
- React
- JavaScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- Swiper
- Sonner

**Backend:**

- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)

**Other Services:**

- Google OAuth
- ImgBB image hosting

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
cd booknook-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the frontend root directory.

Add the required variables:

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=bookNook
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Never commit your actual secrets or environment files.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Start the backend

Open the separate backend project, install its dependencies, configure its `.env` file, and run:

```bash
npm install
npm run dev
```

Make sure MongoDB is connected and the backend is running on port 5000.

## 📁 Project Structure

```text
booknook-client/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── public/
├── .env.local
└── README.md
```

## 👨‍💻 Author

**Bipro Prokas**

GitHub: [https://github.com/biprokas](https://github.com/biprokas)
