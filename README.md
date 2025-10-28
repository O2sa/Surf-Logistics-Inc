# Setup Guides
![screenshot](surf.png)

A fullstack webiste building with mern stack for a shipping company.





## Run the project with docker
**Prerequisites:**
1. Docker
#### **Run this command in the root of the project**:
   ```bash
  docker compose up -d
  ```

## Run the project without docker
**Prerequisites:**

1.  **Node.js and pnpm (or yarn)**
2.  **MongoDB Database**

----
\
 **Open a terminal or command prompt and navigate to the root directory of the project using `cd`**


## Installing Client Dependencies and Building the Project

**Steps:**


**4. Install Client Dependencies:**

- Navigate to the 'client' directory in your root folder.
- Run the following command in your terminal:
  ```bash
  pnpm install
  ```
  This will install all the necessary dependencies for your React application.

**5. Build the Project:**

- To run the react app:
  ```bash
  pnpm run dev
  ```

## Installing Server Dependencies and Running the Server

**1. Install Server Dependencies:**

- Navigate to the 'server' directory in your root folder.
- **Setting Up Environment Variables:**


    **1.  Create a new file named `.env` in the root directory of your server folder './server'. This file will store your environment variables:**

    - In your server folder, create a new file named `.env`.

    **2. Add environment variables:**

    - Paste the following content into the `.env` file, replacing the placeholders with your actual values:

    ```
    MONGO_URL=mongodb://localhost:27017/final_surf
    JWT_SECRET=YOUR_JWT_SECRET
    JWT_LIFETIME=30d
    NODE_ENV=production
    PORT=5000
    ```

    **3. Save and restart the server:**

    **4. Make sure that the Mongo databases work on the outlet 27017 and if you want to adjust the location of the database, adjust the "MONGO_URL" variable in the file "server/.env"**

    - Save the `.env` file and restart your Node.js server. The environment variables should now be accessible in your code.



- Run the following command in your terminal:
  ```bash
  pnpm install
  ```
  This will install the required dependencies for your Node.js server.

**2. Run the Server:**

- Once the server dependencies are installed, start the server using the following command:
  ```bash
  pnpm start
  ```
  This will start your Node.js server, listening on the specified port (usually `5000` by default, but check your `.env` file for the exact port).



**Important Notes:**

- **Environment Variables:** Ensure you have set up your environment variables correctly as described in the previous guide.
- **Database Connection:** If your server uses a database (e.g., MongoDB), make sure it's running and properly configured.
- **Other Dependencies:** If your project has additional dependencies or configurations, follow the specific instructions provided in your project's documentation.


