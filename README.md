
# F&B Frontend Admin Project

## 📝 Project Description

This project is a Frontend Admin web application for managing an F&B system. It is built using React.js and is designed for admins to manage products, orders, and various other elements in the system efficiently.

**Admin Account:**
- Username: `tn823`
- Password: `0000`

---

## 🚀 Get Started

### Prerequisites:

- **Node.js**: Version 20 or higher (recommend using `nvm`)
- **Yarn**: Version 1.22 or higher
- **VSCode**: Recommended for code editing
- **Extensions**:
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Linting
- **SSH setup**: For accessing and managing project code

### Installation

To set up the project locally, please follow these steps:

1. Clone the repository:

    \`\`\`bash
    git clone https://github.com/tn823/FnB-FE-ADMIN.git
    \`\`\`

2. Install dependencies using Yarn:

    \`\`\`bash
    npm install
    \`\`\`

3. Start the development server:

    \`\`\`bash
    npm run dev
    \`\`\`

    The app will run in development mode at: [http://localhost:5173](http://localhost:5173)

---

## 🌳 Git Branch Naming Convention

### Feature Branch:
- Branches for new features should be created from the `develop` branch and follow this naming pattern:
  \`\`feature/TaskNo_TaskName\`\`
  
  Example: `feature/PRO-10_Login`

### Bug Fix Branch:
- Bug fix branches should follow this naming pattern:
  \`\`fix/TaskNo_TaskName\`\`
  
  Example: `fix/PRO-10_Login`

### Hotfix Branch:
- For production bug fixes, use the following naming pattern:
  \`\`hotfix/TaskNo_TaskName\`\`
  
  Example: `hotfix/PRO-10_Login`

---

## 📁 Folder and File Naming Convention

- **Components**: Use `CamelCase`.
- **Others (files/folders)**: Use `kebab-case`.
