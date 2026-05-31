# AlgoVista - Interactive DSA Visualizer

A full-stack web application to visualize data structures and algorithms, built with React (frontend) and Spring Boot (backend).

## Features

- **Data Structures**: Array, Linked List, Stack, Queue, Binary Search Tree
- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Searching Algorithms**: Binary Search
- **Visualization Controls**: Custom input, start/pause/reset, animation speed control
- **Learning Features**: Algorithm descriptions, time/space complexity, Java code snippets
- **UI**: Dark/light mode, responsive design, sidebar navigation

## Tech Stack

- Frontend: React, React Router, CSS
- Backend: Java Spring Boot, Spring Data JPA
- Database: MySQL
- Build Tools: Maven (backend), Vite (frontend)

## Project Structure

```
Algorithm Flow Visualizer/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/algovista/algovista_backend/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   ├── config/
│   │   │   │   └── AlgovistaBackendApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql
│   │   └── test/
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── contexts/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── App.css
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Setup Instructions

### Prerequisites

- Java 17 or later
- Node.js 16 or later
- MySQL 8 or later
- Maven

### Backend Setup

1. **Create MySQL Database**

   ```sql
   CREATE DATABASE algovista;
   ```

2. **Update Database Configuration**

   Edit `backend/src/main/resources/application.properties` to match your MySQL credentials:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/algovista?useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

3. **Initialize Database**

   The `schema.sql` file contains sample data and will be automatically executed by Spring Boot.

4. **Run the Backend**

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   The backend will start at `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

   The frontend will start at `http://localhost:5173`

## API Endpoints

### Algorithms

- `GET /api/algorithms` - Get all algorithms
- `GET /api/algorithms/{id}` - Get algorithm by ID
- `GET /api/algorithms/category/{category}` - Get algorithms by category
- `POST /api/algorithms` - Create new algorithm

### Code Snippets

- `GET /api/code-snippets` - Get all code snippets
- `GET /api/code-snippets/{id}` - Get code snippet by ID
- `GET /api/code-snippets/algorithm/{algorithmId}` - Get snippets by algorithm ID
- `POST /api/code-snippets` - Create new code snippet

## License

MIT
