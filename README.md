# Norma's Teaching Technical Test

## Index

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Test Instructions](#test-instructions)
- [API Endpoints](#api-endpoints)
- [Running with Docker](#running-with-docker)
- [Known Limitations & Future Improvements](#known-limitations--future-improvements)
- [Conclusion](#conclusion)

## Project Description

This technical test is designed for Norma's Teaching Online English academy.

It involves developing a REST API application using Node.js, pnpm, and TypeScript. The API will provide endpoints to manage a list of user favorites that are obtained from a search feature.

Key features include:
- **User Interaction**: Allow users to search and retrieve images.
- **Unsplash Integration**: The search endpoint connects to Unsplash's API to fetch images.
- **Favorites Management**: Enable users to add or remove images from their favorites list.
- **RESTful Architecture**: Follows standard REST practices to create a clean, maintainable API.

### Assumptions & Decisions

- **Modularity**: The project is organized into distinct modules (e.g., [`UsersModule`](src/users/users.module.ts), [`SearchModule`](src/search/search.module.ts), [`FavoritesModule`](src/favorites/favorites.module.ts)) to isolate functionality.
- **External Service Integration**: Integration with the Unsplash API is managed by the `HttpPrivateService` located in [`src/providers/http/http.service.ts`](src/providers/http/http.service.ts), with configuration via environment variables.
- **Security & Password Management**: Bcrypt is used for password hashing.
- **Database Choice**: PostgreSQL is utilized in both development and production environments with TypeORM handling entity interactions.

## Technologies Used

- **Framework**: [NestJS](https://docs.nestjs.com/) v11
- **Database ORM**: [TypeORM](https://typeorm.io/)
- **Database**: PostgreSQL
- **HTTP Client**: Axios (wrapped via NestJS's HttpModule)
- **Testing Framework**: Jest for unit and integration tests
- **Language**: TypeScript
- **Others**: ESLint, Prettier, Docker (with Docker Compose configuration)

## Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/JohnFScha/normas-teaching-technical-test.git
   cd normas-test
   ```

2. **Install Dependencies**

   The project uses pnpm (as configured in [pnpm-workspace.yaml](pnpm-workspace.yaml)). Run:

   ```sh
   pnpm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file at the project root with the following variables (modify values as needed):

   ```
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgres://postgres:your_postgres_password_here@localhost:5433/image_db
   ACCESS_KEY=your_access_key_here
   BASE_URL=https://api.unsplash.com/search/photos/
   ```

4. **Database Setup**

   Ensure PostgreSQL is running. You can use the provided [docker-compose.yaml](docker-compose.yaml) to start a PostgreSQL container:

   ```sh
   docker-compose up -d
   ```

5. **Build the Application**

   Build the project using pnpm:

   ```sh
   pnpm build
   ```

6. **Run the Application**

   - For development (with live reloading):

     ```sh
     pnpm start:dev
     ```

   - For production:

     ```sh
     pnpm start:prod
     ```

## Test Instructions

The project utilizes Jest for testing. To execute tests:

- **Run all tests:**

  ```sh
  pnpm test
  ```

- **Run tests in watch mode:**

  ```sh
  pnpm test:watch
  ```

- **Generate a Coverage Report:**

  ```sh
  pnpm test:cov
  ```

> [!IMPORTANT]
> For the end to end to run correctly, be sure you start on an empty database.

- **Run the app e2e test:**

  ```sh
  pnpm test:e2e
  ```

## API Endpoints

The application exposes several endpoints to interact with users, favorites, and image searches.

### Users Endpoint

- **GET /users**: Retrieve a list of all users.
- **GET /users/:id**: Retrieve details of a specific user by providing the `id` in the URL.
- **POST /users**: Create a new user. The request body must include:
  - `firstName` (string)
  - `lastName` (string)
  - `email` (string; must be unique)
  - `password` (string)
  - Optional: `isActive` (boolean, defaults to `true`)
  - Optional: `favorites` (array)
- **DELETE /users/:id**: Delete an existing user by ID.

### Favorites Endpoint

- **GET /favorites**: Retrieve a list of all favorites.
- **POST /favorites**: Create a new favorite. The request body must include:
  - `description` (string)
  - `imageUrl` (string)
  - `userId` (string) to link the favorite to a user
  - `createdAt` (Date) indicating when the favorite was created
- **DELETE /favorites/:id**: Remove a favorite by its ID.

### Search Endpoint

- **GET /search**: Search for images.
  - **Query Parameters:**
    - `query` (string): The search term.
    - `page` (number): The page number for paginated results.

The `/search` endpoint uses an external service (e.g. the Unsplash API via the `HttpPrivateService`) and returns a list of images with properties such as `id`, `width`, `height`, `urls`, and `description`.

## Running with Docker

The application is containerized using Docker. To deploy the app using Docker:

1. **Build and Start Containers**

   Ensure Docker is installed on your machine. Then run:

   ```sh
   docker-compose up -d
   ```

   This command builds the Docker image using the included `Dockerfile`, starts the NestJS app container along with the PostgreSQL container, and maps the necessary ports.

2. **Verify Container Health**

   Check the status of the running containers with:

   ```sh
   docker ps
   ```

   You can also inspect the logs to ensure the app is running correctly:

   ```sh
   docker-compose logs -f app
   ```

3. **Stopping Containers**

   To stop the running containers, run:

   ```sh
   docker-compose down
   ```

## Known Limitations & Future Improvements

- **Error Handling**: Current error handling can be improved with more granular logging and detailed error responses.
- **API Rate Limiting**: Enhanced management of Unsplash API rate limits would be beneficial to reduce potential downtime.
- **User Authorization**: There is room to incorporate advanced user authorization mechanisms such as JWT and role-based access controls for better security.
- **Validation Enhancements**: More robust input validation can be added using advanced DTO patterns and validation libraries.
- **Performance Scalability**: Future iterations could optimize database queries, add caching strategies such as redis, and improve index configurations for a growing data set.
- **Documentation**: Augmenting documentation, for example, with in-depth JSDoc annotations for each module and integration point will help new developers onboard faster.