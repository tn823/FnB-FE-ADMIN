
# F&B Frontend Admin Project

## 📝 Project Description

This project is a Frontend Admin web application for managing an F&B system. It is built using React.js and is designed for admins to manage products, orders, and various other elements in the system efficiently.

**Admin Account:**
- Username: `tn823`
- Password: `0000`

---

## 🚀 Get Started

### Prerequisites

Before setting up the project, ensure you have the following:

- **Node.js**: Version 20 or higher (recommended: `nvm`)
- **npm**: Version 6+ (comes with Node.js)
- **VSCode**: Recommended for code editing
- **Extensions**:
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatter
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Linting tool
- **SSH setup**: Required for accessing and managing project code

### Installation Steps

Follow these steps to set up the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/tn823/FnB-FE-ADMIN.git
    cd FnB-FE-ADMIN
    ```

2. Install project dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

The code is organized in a structured format for easier maintenance:

```sh
src
|
+-- .husky            # Git hooks (e.g., for commit and push actions)
+-- .vscode           # VSCode configurations
+-- public            # Static files
+-- src               # Main source code
```

### Detailed Structure

```sh
src
+-- app               # Next.js routes
+-- assets            # Images and icons
+-- components        # Reusable components
+-- constants         # Shared constants
+-- hooks             # Custom hooks
+-- lib               # Preconfigured libraries
+-- services          # API services
+-- stores            # Global state management (Redux)
+-- types             # Type definitions
+-- utils             # Utility functions
```

---

## 🌳 Git Branch Naming Convention

To maintain consistency, please follow these branch naming conventions:

- **Feature Branch**: For new features, branch from `develop` and use the following pattern:
  ```bash
  feature/TaskNo_TaskName
  ```
  Example: `feature/PRO-10_Login`

- **Bug Fix Branch**: For bug fixes, branch from the appropriate base and use:
  ```bash
  fix/TaskNo_TaskName
  ```
  Example: `fix/PRO-10_Login`

- **Hotfix Branch**: For production bug fixes, branch from the production base and use:
  ```bash
  hotfix/TaskNo_TaskName
  ```
  Example: `hotfix/PRO-10_Login`

---

## 📁 Folder and File Naming Convention

- **Components**: Use `CamelCase` (e.g., `ProductList.js`)
- **Other files/folders**: Use `kebab-case` (e.g., `product-list.js`)
