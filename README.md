# Full Stack Chess Player Data Application

## Overview

This repository contains the implementation of a full-stack chess player data application. The application is designed to efficiently retrieve, process, and display data from the Lichess.org API. The backend is built using Node.js and MongoDB, while the frontend is developed with React.

## Table of Contents

- [Backend Setup](#backend-setup)
  - [API Project Setup](#api-project-setup)
  - [API Integration and Data Processing](#api-integration-and-data-processing)
  - [Efficiency Requirement](#efficiency-requirement)
  - [Endpoints Definition](#endpoints-definition)
  - [Database Design](#database-design)
  - [Testing and Documentation](#testing-and-documentation)
- [Frontend Setup](#frontend-setup)
  - [Dashboard Development](#dashboard-development)
  - [Performance Optimization](#performance-optimization)
  - [User Authentication and Error Handling](#user-authentication-and-error-handling)
- [Additional Considerations](#additional-considerations)
  - [Code Quality](#code-quality)
  - [Security Considerations](#security-considerations)

## Backend Setup

### API Project Setup

1. Clone the repository:

   ```bash
   git clone [https://github.com/black-sheepp/lichess-api]
   ```

2. Navigate to the backend directory:

   ```bash
   cd /backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### API Integration and Data Processing

1. Ensure MongoDB is installed and running.

2. Run the API server:

   ```bash
   npm start
   ```

### Efficiency Requirement

Efficiency strategies are implemented to optimize data processing time. Refer to the [Performance Optimization](#performance-optimization) section for details.

### Endpoints Definition

- **GET /top-players**: Retrieves a list of the top 50 classical chess players.
- **GET /player/{username}/rating-history**: Retrieves the 30-day rating history for a specified player.
- **GET /players/rating-history-csv**: Generates and provides a CSV file with the rating history for the top 50 players.

### Database Design

The MongoDB database is designed to store player usernames and their respective rating histories. Refer to the schema in the `models` directory.

### Testing and Documentation

1. Run tests:

   ```bash
   npm start
   ```

2. Access API documentation using Swagger:

   Open your browser and navigate to `http://localhost:3000/`.

## Frontend Setup

### Dashboard Development

1. Navigate to the frontend directory:

   ```bash
   cd /frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
2. Run client:

   ```bash
   npm run dev 
   ```

### Performance Optimization

Optimization strategies are applied for efficient data fetching and state management. Refer to the [Performance Optimization](#performance-optimization) section for details.

### User Authentication and Error Handling

1. Implement user login/logout functionality.

2. Add error handling and display appropriate user feedback.

## Additional Considerations

### Code Quality

Focus on writing clean, well-documented, and organized code. Adhere to best coding practices.

### Security Considerations

Implement security measures for both the API and frontend. Ensure secure data transmission and storage. Consider authentication best practices.

---

Feel free to reach out for any further assistance or clarification. Happy coding!
