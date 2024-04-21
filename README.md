# Counter-App

## Description

Counter-App is a basic full-stack application designed to demonstrate the integration of a React frontend with a Flask backend, all orchestrated with Docker Compose. The application uses MySQL as its database, providing a comprehensive example of how these technologies can work together.

## Technologies Used

- **Frontend**: React with Vite
- **Backend**: Flask
- **Database**: MySQL
- **DevOps**: Docker Compose

## Development Instructions

To get the Counter-App running locally, follow these steps (P.S you will need [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer):

1. **Clone the repository**

   ```bash
   git clone https://github.com/EtienneBissonnette/Counter-App.git
   cd Counter-App

   ```

2. **Build the Docker containers**

   ```bash
   docker compose up --build -d

   ```

3. **Create a secrets folder with aligned credentials in .env.dev**

   - Create a folder named `secrets` at the root of the project.
   - Add a `db_password.txt` file with the user password inside.
   - Add a `db_root_password.txt` file with the root password inside.
   - Make sure the password used in the backend (`.env.dev`) aligns with the secrets.

4. **Access Application**
   - Open your web browser and navigate to `http://localhost:8080` to view the app.

## Usage

Once installed, the app will present a simple user interface where users can increment a counter attached to their account. This serves as a basic example of interacting with a full-stack environment through Docker.
