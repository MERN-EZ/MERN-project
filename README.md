# InfoTech

<div align="center" style="margin-bottom: 40px;">

  <div style="display: flex; align-items: center; justify-content: center;">
    <img src="./public/assets/logo.png" alt="InfoTech Logo" width="100" height="100">
    <h1 style="margin-left: 20px;">InfoTech: Streamline Educational Processes</h1>
  </div>

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen)](https://nodejs.org/)
[![Made with React](https://img.shields.io/badge/made%20with-react-blue)](https://reactjs.org/)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](package.json)

</div>

InfoTech is a web application designed to streamline educational processes. It features user roles, custom hooks, and context providers to manage state and interactions efficiently.

## User Roles

The application supports multiple user roles, each with specific permissions and views:

- **Admin**: Manages the application and user accounts.
- **Student**: Accesses educational content and submits homework.
- **Guest**: Limited access to view content.
- **Teacher**: Manages lessons and homework.
- **Assistant**: Assists teachers and manages specific tasks.

## Functionality

### User Role Management

The user role is managed using the `UserRoleContext` in `src/context/UserRoleContext.js`.

### Custom Hooks

The application uses several custom hooks to manage API requests and user authentication:

- **useLogin**: Handles user login and authentication. Defined in `src/hooks/useLogin.js`.
- **useGetRequest**: Fetches data from the backend. Defined in `src/hooks/useGetRequest.js`.
- **usePostRequest**: Sends data to the backend. Defined in `src/hooks/usePostRequest.js`.
- **usePutRequest**: Updates data on the backend. Defined in `src/hooks/usePutRequest.js`.
- **useDeleteRequest**: Deletes data from the backend. Defined in `src/hooks/useDeleteRequest.js`.

### Context Providers

The application uses context providers to manage global state:

- **UserContext**: Manages user details and authentication state. Defined in `src/context/UserContext.js`.
- **UserRoleContext**: Manages user roles. Defined in `src/context/UserRoleContext.js`.
- **DatabaseContext**: Manages database connections and state. Defined in `src/context/DatabaseContext.js`.
-

## Setup

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd MERN-project
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Create a `.env` file**:

   ```sh
   touch .env
   ```

4. **Add environment variables to the `.env` file**:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Start the development server**:
   ```sh
   npm start
   ```

## Scripts

The application includes several scripts located in the `src/scripts` directory:

- **getLocalIP.js**: Retrieves the local IP address and saves it to the `.env` file if not already present. Defined in `src/scripts/getLocalIP.js`.
- **pull-all.sh**: Fetches all remote branches and updates local branches accordingly. Defined in `src/scripts/pull-all.sh`.

## Conclusion

InfoTech is a robust educational platform with role-based access, custom hooks for API interactions, and context providers for state management. Follow the setup instructions to get started and explore the various features and functionalities.
