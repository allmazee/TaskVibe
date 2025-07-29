# TaskVibe

TaskVibe is a A RESTful task management app with JWT-based authentication, powered by Spring Boot, PostgreSQL, and React. It allows users to register, log in, create, edit, delete, and sort tasks with a clean and intuitive interface.

![app screenshot](https://github.com/allmazee/TaskVibe/blob/main/misc/images/image-1.png)

## Features

- **Authentication and Authorization**:
  - User registration and login with JWT tokens.
  - Automatic redirection to the login page when the JWT token expires.
  - "Logout" button for secure sign-out.
- **Task Management**:
  - Create tasks with a title, description, and creation date.
  - View a list of tasks with color-coded age indicators (green for new, yellow for medium, red for old).
  - Sort tasks by creation date (ascending or descending).
  - View and edit task details.
  - Delete tasks
- **User Interface**:
  - Clean, minimalistic design with a white background, shadows, and hover/click animations.
  - Responsive forms for task input and editing.
  - Visual task age indicators with colored bars.

## Technology Stack

### Backend

- **Spring Boot**: Core framework for building the REST API.
- **Spring Security**: JWT-based authentication and authorization.
- **Spring Data JPA**: Data management with PostgreSQL.
- **PostgreSQL**: Relational database for storing users and tasks.
- **Liquibase**: Database schema migrations.
- **Maven**: Dependency management and build tool.

### Frontend

- **React**: Library for building the user interface.
- **React Router**: Client-side routing for task lists, task details, and authentication pages.
- **Axios**: HTTP client for API requests.
- **React Icons**: Icons for sorting, deleting, and logout actions.
- **date-fns**: Date formatting utilities.
- **CSS**: Custom styling with animations, shadows, and color indicators.

### Other

- **JWT**: Secure token-based authentication.
- **Swagger**: API documentation (available at `/swagger-ui.html`).

## Setup and Installation

### Prerequisites

- **Java 17+**: For the backend.
- **Maven**: For building the backend.
- **Node.js 16+**: For the frontend.
- **PostgreSQL**: For the database.
- **Git**: For cloning the repository.

### Steps

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/allmazee/taskvibe.git
   cd taskvibe
   ```

2. **Set up the backend**:
   
   ```bash
   cd taskvibe-backend
   ```
   
   - Configure PostgreSQL:
     
     ```sql
     psql -U postgres
     CREATE DATABASE taskvibe;
     ```
   
   - Run the backend:
     
     ```bash
     mvn clean install
     mvn spring-boot:run
     ```
   
   - Check the API: `http://localhost:8080/swagger-ui.html`.

3. **Set up the frontend**:
   
   ```bash
   cd taskvibe-front
   npm install
   npm start
   ```
   
   - Open `http://localhost:3000` in your browser.

### Testing

Test the API using the following `curl` commands. Replace `<JWT_TOKEN>` with the token obtained from the sign-in request.

* **Register a new user**:
  
  ```bash
  curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
  ```

* **Sign in to obtain a JWT token**:
  
  ```bash
  curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
  ```

* **Get all tasks**:
  
  ```bash
  curl -X GET http://localhost:8080/api/todos \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

* **Create a new task**:
  
  ```bash
  curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"title":"New Task","description":"Task description"}'
  ```

* **Get a task by ID**:
  
  ```bash
  curl -X GET http://localhost:8080/api/todos/1 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

* **Update a task**:
  
  ```bash
  curl -X PUT http://localhost:8080/api/todos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"title":"Updated Task","description":"Updated description"}'
  ```

* **Delete a task**:
  
  ```bash
  curl -X DELETE http://localhost:8080/api/todos/1 \
  -H "Authorization: Bearer <JWT_TOKEN>"
  ```

## Future Improvements

- Add task search by title or description.
- Implement notifications for tasks with approaching due dates.
- Set up tests (Jest/React Testing Library for frontend, JUnit for backend).
