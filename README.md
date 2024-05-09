# Payroll Web App

This React application empowers you to streamline employee management, ensure accurate salary processing, and provide effortless access to salary history.

## Authentication

- Secure login and registration are facilitated by Auth0.

## Backend and Database

- JSON Server serves as a mock API, providing simulated data interaction.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your system.

### Project Setup

1. Clone or download the project repository.
2. Navigate to the project directory in your terminal.
3. Install dependencies:

   ```bash
   npm install
   ```
## Running the App Separate Terminals: 
Open two separate terminal windows.

Terminal 1 (Database):

```bash
npm run db
```
Use code with caution.
This command starts the mock API using JSON Server.

Terminal 2 (Frontend):

```bash
npm run dev
```

This command starts the development server for the React app.

## Important Note:

The application runs on port 5173. Avoid modifying this port configuration. otherwise Auth0 will not work.