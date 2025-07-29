## Running the Project with Docker

This project is set up to run in Docker using Node.js 20 (alpine) and can be managed via Docker Compose. Below are the project-specific instructions for building and running the application in a containerized environment.

### Requirements
- **Node.js version:** 20-alpine (as specified in the Dockerfile)
- **Dependencies:** Installed via `npm ci` using `package.json` and `package-lock.json`.

### Environment Variables
- No required environment variables are specified in the Dockerfile or docker-compose.yml by default.
- If your application requires environment variables, uncomment and configure the `env_file: ./.env` line in the `docker-compose.yml` and provide a `.env` file in the project root.

### Build and Run Instructions
1. **Build and start the application:**
   ```sh
   docker compose up --build
   ```
   This will build the Docker image and start the service defined as `javascript-app`.

2. **Accessing the application:**
   - The app will be available on [http://localhost:3000](http://localhost:3000) by default.

### Ports
- **3000:** Exposed by the container and mapped to the host (as per `docker-compose.yml`). Adjust if your app uses a different port.

### Special Configuration
- The Dockerfile creates a non-root user (`appuser`) for running the application, enhancing security.
- If you need to persist data or add volumes, uncomment and configure the `volumes` section in `docker-compose.yml`.
- For multi-service setups, you can uncomment and configure the `networks` section.

---

_If you update the application's port or add environment variables, ensure the Docker and Compose files are updated accordingly._