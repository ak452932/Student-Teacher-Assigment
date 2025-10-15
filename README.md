# Student-Teacher Assignment Portal

A full-stack web application that enables teachers to publish assignments and students to submit answers, view grades, and track progress. Built with React, Node.js, Express, and MongoDB.

## Features

### For Teachers
- Create and publish assignments
- View student submissions
- Mark submissions as reviewed
- Add, edit, and delete grades (role-restricted)

### For Students
- View published assignments
- Submit answers before due date
- View submitted answers and grades
- Role-based access to prevent unauthorized actions

## Tech Stack

- Frontend: React, Axios, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JWT-based login
- Role Management: Student vs Teacher access control

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ak452932/Student-Teacher-Assigment.git
cd Student-Teacher-Assigment

Install dependencies
Backend
cd server
npm install

Front-end
cd client
npm install

Set up environment variables
Create a .env file in the server folder
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the App.
Backend
npm start

Frontend

npm start

Role-Based Access
- Students can only view and submit assignments.
- Teachers can manage assignments, submissions, and grades.
- Unauthorized actions are blocked both on frontend and backend.


Student-Teacher-Assigment/
├── client/         React frontend
│   └── src/
│       └── components/
│           └── StudentDashboard.js
├── server/         Node.js backend
│   └── controllers/
│       └── submissionController.js
│   └── models/
│   └── routes/
│   └── middleware/

Future Enhancements
- Assignment grading system
- Notifications for due dates
- Admin dashboard
- File uploads for submissions



---

Once you've saved this as `README.md` in your project folder, you can push it to GitHub using:

```bash
git add README.md
git commit -m "Add README with project overview and setup instructions"
git push
