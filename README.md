# Kontess Frontend

A React-based frontend for **Kontess**, a hackathon and contest management platform. It provides a full-featured UI for participants, judges, organizers, and admins to manage events, teams, tasks, grading, and communications through an intuitive dashboard interface.

## Tech Stack

- **Framework:** React 16
- **UI Library:** Material UI
- **State Management:** Component state + localStorage
- **HTTP Client:** Axios
- **Authentication:** JWT (stored in session)
- **Real-time:** Firebase Realtime Database
- **Routing:** React Router v5
- **Styling:** SCSS with light/dark theme support
- **Deployment:** Firebase Hosting / AWS CodeDeploy

## Features

- **Authentication:** Login, registration, password reset, email-based account activation
- **Role-based Dashboards:** Separate views for Admin, Participant, and Judge roles
- **Team Management:** Create teams, invite members, manage join requests, view team details
- **Event Management:** Create and track hackathon events
- **Task System:** Task creation (admin), submission (participant), grading (judge)
- **Judging Platform:** Dedicated judge interface for grading and mentoring
- **Notifications:** Real-time notifications and announcements
- **Dark/Light Theme:** Toggle between dark and light modes
- **Google Login:** OAuth-based social login support

## Prerequisites

- Node.js 14+
- npm 6+

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/kon_frontend.git
   cd kon_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase and API configuration
   ```

## Environment Variables

| Variable                                  | Description                     | Default                |
|-------------------------------------------|---------------------------------|------------------------|
| `NODE_PATH`                               | Module resolution path          | `src`                  |
| `SKIP_PREFLIGHT_CHECK`                    | Skip CRA preflight check       | `true`                 |
| `REACT_APP_API_URL`                       | Backend API base URL            | `http://localhost:8000` |
| `REACT_APP_FIREBASE_API_KEY`              | Firebase API key                | (required)             |
| `REACT_APP_FIREBASE_AUTH_DOMAIN`          | Firebase auth domain            | (required)             |
| `REACT_APP_FIREBASE_DATABASE_URL`         | Firebase database URL           | (required)             |
| `REACT_APP_FIREBASE_PROJECT_ID`           | Firebase project ID             | (required)             |
| `REACT_APP_FIREBASE_STORAGE_BUCKET`       | Firebase storage bucket         | (required)             |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`  | Firebase messaging sender ID    | (required)             |
| `REACT_APP_FIREBASE_APP_ID`               | Firebase app ID                 | (required)             |
| `REACT_APP_FIREBASE_MEASUREMENT_ID`       | Firebase measurement ID         | (optional)             |

## How to Run

### Development
```bash
make dev
```
The app will be available at `http://localhost:3000`.

### Production Build
```bash
make build
```

### Docker
```bash
make docker-build
make docker-run
```

## Screenshots

_Screenshots can be added here to showcase the dashboard, team management, and judging interfaces._

## Project Structure

```
kon_frontend/
├── public/                     # Static assets
├── src/
│   ├── App.js                  # Root component with routing
│   ├── App.css                 # Global styles
│   ├── config.js               # API base URL configuration
│   ├── firebase.js             # Firebase initialization
│   ├── PrivateRoute.js         # Auth-protected route wrapper
│   ├── app/
│   │   ├── containers/         # Page-level components
│   │   │   ├── admin-dashboard/
│   │   │   ├── UserDashBoard/
│   │   │   ├── jugde-plateform/
│   │   │   ├── team/
│   │   │   ├── task/
│   │   │   ├── notifications/
│   │   │   └── ...
│   │   └── services/           # API service layer
│   └── utils/                  # Helpers (session, requests)
├── latest/                     # Latest version
├── .github/workflows/          # CI/CD pipeline (AWS CodeDeploy)
├── package.json                # Dependencies and scripts
├── Dockerfile                  # Multi-stage Docker build
└── Makefile                    # Common development commands
```

## Related Repositories

- **Backend:** [kon_backend](https://github.com/<your-username>/kon_backend) - Django REST API for the Kontess platform

## License

This project is licensed under the MIT License.
