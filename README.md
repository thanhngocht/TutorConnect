# TutorConnect – Online Tutor Matching and Class Management System

This project is a comprehensive online education platform designed to connect students with tutors and support an interactive learning environment. Students can search for tutors and submit course registration requests, while tutors review and select suitable class requests based on their expertise and availability. The system includes core functionalities such as user management, robust course and class management, an integrated e-learning module, payment processing, and a flexible learning environment that effectively supports both students and tutors.

## ✨ Key Features

-   **User Management:** Handles user registration, login, and role-based access control for `students` and `tutors`.
-   **Tutor Search & Class Request:** Enables students to search for tutors and submit class requests, which are reviewed and accepted by tutors.
-   **E-learning Module:** Facilitates the delivery of educational content, tracking of student progress, and interactive learning experiences within the platform.

-   **Payment Processing:** Integrates a payment gateway to handle tuition fees securely.
-   **CV Upload:** Allows users to upload and manage their personal CVs/resumes.

### 🎬 Application Preview




## 🛠️ Tech Stack

### Backend

- **Language**: Python
- **Framework**: FastAPI
- **Architecture**: Microservices
- **Database**: Supabase
- **Components**:
    - **Gateway**: `localhost:8000` - The main entry point for the API, directing requests to the corresponding microservices.
    - **Authentication Service**: `localhost:8001` - Handles authentication, login, and registration.
    - **User Service**: `localhost:8002` - Manages user information.
    - **Academic Service**: `localhost:8003` - Manages academic matters like courses and tutors.
    - **Learning Service**: `localhost:8004` - Supports functions related to the learning process.
    - **Payment Service**: `localhost:8005` - Processes payment transactions.

### Frontend

- **Language**: JavaScript
- **Framework**: React (using Vite)
- **Libraries**:
    - `axios`: For sending HTTP requests to the backend.
    - `react-router-dom`: For managing page navigation.
- **Interface**: A modern user interface built with React components.

## 🚀 Setup and Launch

### Backend

1. **Install dependencies**:
   - Navigate to the `backend` directory.
   - Run the following command to install the required libraries:
     ```bash
     pip install -r requirements.txt
     ```

2. **Run the services**:
   - The backend is designed to run as individual microservices. You can run each service by navigating to its directory and running the `uvicorn` command. For example, to run the `auth` service:
     ```bash
     cd auth
     uvicorn main:app --host 0.0.0.0 --port 8001
     ```
   - Do the same for the other services with their respective ports. The recommended way is to use the provided shell script.
     ```bash
     chmod +x start_all.sh
     ./start_all.sh
     ```

### Frontend

1. **Install dependencies**:
   - Navigate to the `frontend` directory.
   - Run the following command:
     ```bash
     npm install
     ```

2. **Run the application**:
   - After the installation is complete, run the following command to start the React application:
     ```bash
     npm run dev
     ```
   - The application will be available at `http://localhost:5173`.

## 🏗️ System Architecture

- **Backend**: Follows a microservices architecture where each service handles a specific function and communicates through an API Gateway. This makes the system flexible, scalable, and easy to maintain.
- **Frontend**: A Single Page Application (SPA) built with React. The frontend communicates with the backend via the API Gateway.