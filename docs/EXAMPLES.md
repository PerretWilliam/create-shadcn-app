# Usage Examples

This guide provides practical examples of using `create-shadcn-app` in different scenarios.

## Basic Usage

### Create a New App

```bash
npx create-shadcn-app
```

Follow the interactive prompts:

1. Enter your project name (e.g., `my-awesome-app`)
2. Choose your package manager (npm, pnpm, yarn, or bun)

### Create with NPM

```bash
npx create-shadcn-app
# Select: npm
```

### Create with PNPM

```bash
npx create-shadcn-app
# Select: pnpm
```

### Create with Yarn

```bash
npx create-shadcn-app
# Select: yarn
```

### Create with Bun

```bash
npx create-shadcn-app
# Select: bun
```

## After Creation

### Start Development Server

```bash
cd my-awesome-app
npm run dev
```

Your app will be available at `http://localhost:5173`

### Add ShadCN Components

```bash
# Add a button component
npx shadcn@latest add button

# Add multiple components at once
npx shadcn@latest add button card dialog input

# Browse all available components
npx shadcn@latest add
```

### Example: Building a Simple Card Component

After creating your app and adding components:

```bash
npx shadcn@latest add card button
```

Then in your `src/App.tsx`:

```typescript
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Your App</CardTitle>
          <CardDescription>
            Built with React, Tailwind CSS v4, and ShadCN UI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Advanced Scenarios

### Creating Multiple Projects

```bash
# Create first project
npx create-shadcn-app
# Enter: project-one
# Choose: npm

# Create second project
npx create-shadcn-app
# Enter: project-two
# Choose: pnpm
```

### Handling Existing Directories

If you try to create a project in an existing directory:

```bash
npx create-shadcn-app
# Enter: existing-folder
# You'll get options:
# 1. Overwrite (delete then recreate) - ⚠️ Be careful!
# 2. Choose another name
# 3. Cancel
```

### Building for Production

```bash
# Build your app
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist/` folder.

### Customizing Path Aliases

Your project is pre-configured with `@/*` aliases. Here's how to use them:

```typescript
// ✅ Good - Using path alias
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ❌ Avoid - Relative imports
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
```

### Adding Custom Fonts

1. Add font files to `public/fonts/`
2. Update `src/styles/index.css`:

```css
@import "tailwindcss";

@font-face {
  font-family: "MyFont";
  src: url("/fonts/MyFont.woff2") format("woff2");
}

body {
  font-family: "MyFont", sans-serif;
}
```

### Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My Awesome App
```

Access in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
```

## Common Workflows

### Adding a Dark Mode Toggle

```bash
# Add required components
npx shadcn@latest add dropdown-menu

# Create a theme provider component
# See: https://ui.shadcn.com/docs/dark-mode/vite
```

### Setting Up React Router

```bash
npm install react-router-dom

# Create your routes
# Update App.tsx with Router configuration
```

### Adding Forms with Validation

```bash
npx shadcn@latest add form input button
npm install react-hook-form zod @hookform/resolvers
```

### State Management with Zustand

```bash
npm install zustand
```

## Troubleshooting Examples

### Port Already in Use

```bash
# Option 1: Kill the process
lsof -ti:5173 | xargs kill -9

# Option 2: Use a different port
npm run dev -- --port 3000
```

### TypeScript Path Alias Not Working

If imports with `@/*` don't work in your IDE:

1. Restart your TypeScript server (VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server")
2. Check that your IDE recognizes `tsconfig.json`

### Tailwind Classes Not Working

Make sure you:

1. Imported styles in `main.tsx`: `import './styles/index.css'`
2. Have `@import "tailwindcss";` in your CSS file

## Next Steps

- 📖 [ShadCN UI Documentation](https://ui.shadcn.com/)
- 🎨 [Tailwind CSS Documentation](https://tailwindcss.com/)
- ⚡ [Vite Documentation](https://vitejs.dev/)
- ⚛️ [React Documentation](https://react.dev/)

---

Need more help? [Open an issue](https://github.com/williamperret/create-shadcn-app/issues) on GitHub!
