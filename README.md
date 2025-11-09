# 🚀 Create ShadCN App

A modern CLI tool to scaffold a React application with **Tailwind CSS v4**, **ShadCN UI**, **TypeScript**, and **SWC** in seconds.

[![npm version](https://img.shields.io/npm/v/create-shadcn-app.svg)](https://www.npmjs.com/package/create-shadcn-app)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## ✨ Features

- 🎨 **Tailwind CSS v4** - Latest version with the new Vite plugin
- 🎭 **ShadCN UI** - Beautiful, accessible components
- ⚡ **Vite** - Lightning-fast development server
- 🔷 **TypeScript** - Full type safety
- 🚀 **SWC** - Super-fast TypeScript/JavaScript compiler
- 📦 **Multiple Package Managers** - Support for npm, pnpm, yarn, and bun
- 🎯 **Path Aliases** - Pre-configured `@/*` imports
- 🛠️ **Smart Setup** - Handles existing directories gracefully

## 🎯 Quick Start

```bash
# Using npx (recommended)
npx create-shadcn-app

# Using npm
npm create shadcn-app

# Using pnpm
pnpm create shadcn-app

# Using yarn
yarn create shadcn-app

# Using bun
bun create shadcn-app
```

## 📋 What It Does

This tool automatically:

1. ✅ Creates a new Vite project with React, TypeScript, and SWC
2. ✅ Installs and configures Tailwind CSS v4
3. ✅ Sets up ShadCN UI with proper configuration
4. ✅ Configures TypeScript with path aliases (`@/*`)
5. ✅ Creates a clean project structure
6. ✅ Sets up Vite with all necessary plugins

## 🏗️ Project Structure

```
your-app/
├── src/
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── styles/
│       └── index.css           # Global styles with Tailwind
├── public/                     # Static assets
├── components.json             # ShadCN configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App-specific TS config
├── tsconfig.node.json          # Node-specific TS config
└── package.json
```

## 🎨 Adding Components

After creating your app, you can add ShadCN components:

```bash
# Add a button component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog
```

## 🔧 Configuration

### Path Aliases

The project is pre-configured with path aliases:

```typescript
// Instead of this:
import { Button } from "../../components/ui/button";

// You can do this:
import { Button } from "@/components/ui/button";
```

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the new Vite plugin. Your styles are in `src/styles/index.css`:

```css
@import "tailwindcss";
```

### TypeScript

Full TypeScript support with strict mode and path aliases configured out of the box.

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint your code
npm run lint
```

## 📦 Package Managers

This CLI supports multiple package managers:

- **npm** - Node Package Manager (default)
- **pnpm** - Fast, disk space efficient package manager
- **yarn** - Classic package manager
- **bun** - All-in-one JavaScript runtime

The tool will use your selected package manager for all installations.

## 🤔 Why This Tool?

While `create-vite` is excellent, setting up Tailwind CSS v4 + ShadCN UI involves several manual steps:

1. Installing Tailwind CSS v4 with the new Vite plugin
2. Configuring TypeScript path aliases
3. Setting up ShadCN UI
4. Reorganizing CSS structure
5. Updating imports

This tool automates all of these steps, saving you 10-15 minutes of setup time per project.

## 🔄 Handling Existing Directories

If a directory with your project name already exists, the CLI will:

- ✅ Let you choose to **overwrite** it (with confirmation)
- ✅ Let you **rename** your project
- ✅ Let you **cancel** the operation

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### TypeScript Errors

If you see TypeScript errors after setup:

```bash
# Restart your TypeScript server in VS Code
# Command Palette (Cmd+Shift+P) > "TypeScript: Restart TS Server"
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Perret William**

- Website: [william-perret.fr](https://william-perret.fr)
- Email: william.perret@hotmail.com

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://react.dev/) - The library for web and native user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) - Beautifully designed components
- [SWC](https://swc.rs/) - Super-fast TypeScript / JavaScript compiler

## 📚 Resources

- [ShadCN UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

Made with ❤️ by [William Perret](https://william-perret.fr)
