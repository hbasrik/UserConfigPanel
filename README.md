# PanelCase Application

PanelCase is a web-based application with a **Vue.js** frontend and a **Node.js** backend. The frontend provides a dashboard and login interfaces for users, while the backend handles the admin panel and Firebase integration for database.

## Technologies

### Frontend
- Vue.js
- Vue Router
- Firebase

### Backend
- Node.js
- Firebase Admin SDK

 ## Features

### 1. **User Authentication:**
   - Users can sign in and out using their credentials.
   - Firebase authentication is integrated to manage user login.

### 2. **Dashboard Interface:**
   - A responsive and interactive dashboard where users can view and manage configurations.
   - Accessible after user login, with various administrative functions.

### 3. **Admin Panel:**
   - Admins can manage users, view analytics, and control specific app functionalities from a secure admin panel in the backend.
   - Admin panel is connected to Firebase for secure data handling.

### 4. **CRUD Operations:**
   - Perform **Create**, **Read**, **Update**, and **Delete** operations on the data displayed in the dashboard.
   - These operations are fully integrated with the backend, allowing real-time data updates.


- ### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/panelcase.git
   cd ./panelcase
    
2. Navigate to the `/backend` folder.
   ```bash
   npm install
   node index.js
   
3. Navigate to the `/frontend` folder.
   ```bash
   npm install
   npm run serve

