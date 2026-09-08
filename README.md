# InfraSight AI 🇮🇳
### Predictive Infrastructure Project Monitoring & Early Warning System

> **InfraSight AI** is a government-grade digital infrastructure intelligence platform designed for the **Ministry of Statistics and Programme Implementation (MoSPI)** and the **Infrastructure and Project Monitoring Division (IPMD)**. It enables proactive monitoring, delay forecasting, cost-overrun prediction, and automated early warning signals for central and state mega-infrastructure projects.

---

## 🏛️ Core Features

- **Central Operations Dashboard**: High-level national KPI overview, project health indexes, budget burn rates, and ministry-wise monitoring.
- **Infrastructure Project Repository**: Centralized catalog of all national infrastructure assets with real-time status, contractor details, milestones, and expenditure tracking.
- **Portfolio Analytics & Variance Analysis**: Deep-dive financial analysis, planned vs. actual S-curves, timeline deviations, and sectoral breakdowns powered by Recharts.
- **AI Intelligence & Predictive Risk Engine**: Machine learning-assisted risk classification leveraging ensemble models (XGBoost) and Monte Carlo simulations for schedule and budget forecasting.
- **Early Warning Signal (EWS) Matrix**: Automated alerts for land acquisition bottlenecks, environmental clearances, procurement delays, and inter-departmental dependencies.
- **Official MoSPI Reports & Flash Briefings**: Standardized flash reports, executive summaries, and audit-ready documentation.
- **Role-Based Access Control (RBAC)**: Secure multi-tier governance for Super Admins, Ministry Reviewers, Project Directors, and Field Engineers.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Design Language**: Official Indian Digital Public Infrastructure (DPI) standard, 100% clean light mode, high contrast, and accessible typography.

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Server**: [Uvicorn](https://www.uvicorn.org/)
- **ML Architecture**: Predictive delay & overrun estimation models (XGBoost, Scikit-learn, Monte Carlo).

---

## 📁 Repository Structure

```text
InfraSight_AI/
├── backend/
│   └── app/
│       └── main.py          # FastAPI application entrypoint & health endpoints
├── public/
│   ├── logo-icon.png        # Official InfraSight emblem
│   └── logo.png             # Full logo asset
├── src/
│   ├── assets/              # Static branding and icon assets
│   ├── components/
│   │   ├── ui/              # Base UI components (Sidebar primitives, buttons, cards)
│   │   ├── Header.jsx       # Institutional top bar with search, alerts & auth
│   │   ├── Sidebar.jsx      # Collapsible government operations sidebar
│   │   ├── ProjectTable.jsx # High-density project data table
│   │   └── LoadingSkeleton.jsx
│   ├── context/
│   │   ├── ApiContext.jsx   # Project data and filtering state
│   │   └── AuthContext.jsx  # Authentication & session management
│   ├── lib/
│   │   ├── permissions.js   # RBAC definition and route permission maps
│   │   └── utils.js         # Tailwind class merging and formatters
│   ├── pages/
│   │   ├── LandingPage.jsx  # Public portal overview & national infrastructure metrics
│   │   ├── Dashboard.jsx    # Central Operations Dashboard
│   │   ├── RiskAnalysis.jsx # AI Intelligence & ML Risk Engine
│   │   ├── admin/           # Administrative user management
│   │   └── auth/            # Login, registration, and status screens
│   ├── App.jsx              # Main router & layout controller
│   ├── index.css            # Design tokens, fonts, and theme definitions
│   └── main.jsx             # React DOM root mounting
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **Python** (v3.10 or higher)

---

### 1. Frontend Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Vite Development Server**:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at: `http://localhost:5173` (or `http://localhost:5174`).

3. **Production Build**:
   ```bash
   npm run build
   ```

---

### 2. Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **Linux / macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install fastapi uvicorn
   ```

4. **Run FastAPI Server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   API Docs available at: `http://127.0.0.1:8000/docs`

---

## 🔐 Role-Based Access Hierarchy

| Role | Access Level | Description |
| :--- | :--- | :--- |
| **Super Admin** | Full System Access | Platform configuration, user approvals, role assignments |
| **MoSPI Officer / Reviewer** | National Portfolio | Access to all national project metrics, variance models, and audit reports |
| **Project Director / Manager** | Specific Projects | Update milestones, report operational impediments, submit variance claims |
| **Field Engineer** | Data Entry & Verification | Physical progress updates, geotagged proof submission, site sensor data |

---

## 📜 License & Compliance

Developed for the **Smart India Hackathon (SIH 2026)** under the Problem Statement for **Predictive Infrastructure Project Monitoring & Early Warning System**.
All designs strictly align with national digital guidelines and institutional design standards.
