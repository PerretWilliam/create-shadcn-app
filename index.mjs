#!/usr/bin/env node
import { execa } from "execa";
import prompts from "prompts";
import fs from "fs/promises";
import fsSync from "fs";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main entry point for the ShadCN app creator
 */
async function main() {
  try {
    // Entry banner
    console.log(
      chalk.cyanBright("\n🚀 React + Tailwind v4 + ShadCN App Creator\n")
    );

    // === 1) User prompts ===
    const response = await prompts([
      {
        type: "text",
        name: "project",
        message: "Project name:",
        initial: "my-app",
        validate: (value) => {
          if (!value || !value.trim()) return "Project name is required";
          if (!/^[a-z0-9-_]+$/i.test(value)) {
            return "Project name can only contain letters, numbers, hyphens, and underscores";
          }
          return true;
        },
      },
      {
        type: "select",
        name: "pm",
        message: "Choose a package manager:",
        choices: [
          { title: "npm", value: "npm" },
          { title: "pnpm", value: "pnpm" },
          { title: "yarn", value: "yarn" },
          { title: "bun", value: "bun" },
        ],
        initial: 0,
      },
    ]);

    const { project, pm, theme } = response;

    if (!project) {
      console.log(chalk.yellow("\n⚠️  Operation canceled."));
      process.exit(0);
    }

    // === 2) Handle existing directory ===
    await handleExistingDirectory(project);

    // === 3) Create Vite project ===
    await createViteProject(project, pm);

    // === 4) Setup Tailwind CSS v4 ===
    await setupTailwind(pm);

    // === 5) Configure TypeScript ===
    await configureTypeScript();

    // === 6) Setup Vite configuration ===
    await setupVite(pm);

    // === 7) Initialize ShadCN ===
    await initializeShadCN(theme);

    // === Done ===
    console.log(
      chalk.greenBright(`\n✅ Project "${project}" created successfully!\n`)
    );
    console.log(chalk.yellowBright("📦 Next steps:\n"));
    console.log(chalk.white(`   cd ${project}`));
    console.log(chalk.white(`   ${pm} run dev\n`));
  } catch (error) {
    console.error(chalk.red("\n❌ An error occurred:"), error.message);
    process.exit(1);
  }
}

/**
 * Handle existing directory conflicts
 */
async function handleExistingDirectory(projectName) {
  let project = projectName;

  while (true) {
    const targetDir = path.resolve(process.cwd(), project);

    if (!fsSync.existsSync(targetDir)) {
      break;
    }

    const entries = await fs.readdir(targetDir);
    const nonEmpty = entries.length > 0;

    const { action } = await prompts({
      type: "select",
      name: "action",
      message: `The folder "${project}" already exists${
        nonEmpty ? " and is not empty" : ""
      }. What would you like to do?`,
      choices: [
        { title: "Overwrite (delete then recreate)", value: "overwrite" },
        { title: "Choose another name", value: "rename" },
        { title: "Cancel", value: "cancel" },
      ],
    });

    if (action === "cancel" || action === undefined) {
      console.log(chalk.yellow("\n⚠️  Operation canceled."));
      process.exit(0);
    }

    if (action === "rename") {
      const { newName } = await prompts({
        type: "text",
        name: "newName",
        message: "New project name:",
        initial: `${project}-app`,
        validate: (v) => {
          if (!v || !v.trim()) return "Name cannot be empty";
          if (!/^[a-z0-9-_]+$/i.test(v)) {
            return "Project name can only contain letters, numbers, hyphens, and underscores";
          }
          return true;
        },
      });
      project = newName.trim();
      continue;
    }

    if (action === "overwrite") {
      const { sure } = await prompts({
        type: "confirm",
        name: "sure",
        message: `⚠️  Confirm deletion of "${project}"? This action is irreversible.`,
        initial: false,
      });

      if (!sure) continue;

      await fs.rm(targetDir, { recursive: true, force: true });
      console.log(chalk.gray(`   Folder "${project}" deleted.`));
      break;
    }
  }

  return project;
}

/**
 * Create Vite project with React, TypeScript, and SWC
 */
async function createViteProject(project, pm) {
  console.log(
    chalk.yellow(
      `\n📦 Creating project "${project}" with ${pm} (React + TS + SWC)...\n`
    )
  );

  const args =
    pm === "npm"
      ? [
          "create",
          "vite@latest",
          project,
          "--",
          "--template",
          "react-swc-ts",
          "--no-install",
          "--no-run",
        ]
      : [
          "create",
          "vite@latest",
          project,
          "--template",
          "react-swc-ts",
          "--no-install",
          "--no-run",
        ];

  await execa(pm, args, {
    stdio: ["ignore", "inherit", "inherit"],
    reject: true,
  });

  process.chdir(project);
  console.log(chalk.green("   ✓ Vite project created"));
}

/**
 * Setup Tailwind CSS v4
 */
async function setupTailwind(pm) {
  console.log(chalk.yellow("\n🎨 Installing Tailwind CSS v4...\n"));

  await execa(pm, ["install", "tailwindcss", "@tailwindcss/vite"], {
    stdio: "inherit",
  });

  console.log(chalk.green("   ✓ Tailwind CSS installed"));

  // Create styles directory
  await fs.mkdir("src/styles", { recursive: true });

  // Remove default CSS files
  const filesToRemove = ["src/App.css", "src/index.css"];
  for (const file of filesToRemove) {
    try {
      await fs.unlink(file);
      console.log(chalk.gray(`   ✓ Removed: ${file}`));
    } catch (error) {
      // File doesn't exist, ignore
    }
  }

  // Create new styles file
  await fs.writeFile("src/styles/index.css", '@import "tailwindcss";\n');
  console.log(chalk.green("   ✓ Created: src/styles/index.css"));

  // Update App.tsx
  const appContent = `export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold">Hello, world! 👋</h1>
    </div>
  );
}
`;

  if (fsSync.existsSync("src/App.tsx")) {
    await fs.writeFile("src/App.tsx", appContent);
    console.log(chalk.green("   ✓ Updated: src/App.tsx"));
  }

  // Update main.tsx
  if (fsSync.existsSync("src/main.tsx")) {
    let mainContent = await fs.readFile("src/main.tsx", "utf8");
    mainContent = mainContent.replace(
      /['"]\.\/index\.css['"]/,
      "'./styles/index.css'"
    );
    await fs.writeFile("src/main.tsx", mainContent);
    console.log(chalk.green("   ✓ Updated: src/main.tsx"));
  }
}

/**
 * Configure TypeScript with path aliases
 */
async function configureTypeScript() {
  console.log(chalk.yellow("\n⚙️  Configuring TypeScript...\n"));

  // Root tsconfig.json
  const rootTsConfig = {
    files: [],
    references: [
      { path: "./tsconfig.app.json" },
      { path: "./tsconfig.node.json" },
    ],
    compilerOptions: {
      baseUrl: ".",
      paths: { "@/*": ["./src/*"] },
    },
  };

  await fs.writeFile("tsconfig.json", JSON.stringify(rootTsConfig, null, 2));
  console.log(chalk.green("   ✓ Updated: tsconfig.json"));

  // tsconfig.app.json: merge without overwriting
  const tsconfigAppPath = "tsconfig.app.json";
  if (fsSync.existsSync(tsconfigAppPath)) {
    let raw = await fs.readFile(tsconfigAppPath, "utf8");

    // Remove comments before parsing
    raw = raw.replace(/\/\*[\s\S]*?\*\//g, "");
    raw = raw.replace(/\/\/.*/g, "");

    const currentConfig = JSON.parse(raw);

    currentConfig.compilerOptions = {
      ...(currentConfig.compilerOptions || {}),
      baseUrl: ".",
      paths: { "@/*": ["./src/*"] },
      jsx: "react-jsx",
      allowImportingTsExtensions: true,
    };

    await fs.writeFile(tsconfigAppPath, JSON.stringify(currentConfig, null, 2));
    console.log(chalk.green("   ✓ Updated: tsconfig.app.json"));
  }
}

/**
 * Setup Vite configuration with Tailwind and path aliases
 */
async function setupVite(pm) {
  console.log(chalk.yellow("\n⚡ Configuring Vite...\n"));

  await execa(pm, ["install", "-D", "@types/node"], { stdio: "inherit" });
  console.log(chalk.green("   ✓ @types/node installed"));

  const viteConfig = `import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
`;

  await fs.writeFile("vite.config.ts", viteConfig);
  console.log(chalk.green("   ✓ Updated: vite.config.ts"));
}

/**
 * Initialize ShadCN UI
 */
async function initializeShadCN(theme) {
  console.log(chalk.yellow("\n🎭 Initializing ShadCN UI...\n"));

  await execa("npx", ["shadcn@latest", "init", "-y"], { stdio: "inherit" });
  console.log(chalk.green("   ✓ ShadCN UI initialized"));

  // Apply theme if specified
  const componentsPath = path.resolve("components.json");
  if (fsSync.existsSync(componentsPath) && theme) {
    try {
      const configContent = await fs.readFile(componentsPath, "utf8");
      const config = JSON.parse(configContent);
      config.style = theme;
      await fs.writeFile(componentsPath, JSON.stringify(config, null, 2));
      console.log(chalk.green(`   ✓ Applied ShadCN theme: ${theme}`));
    } catch (error) {
      console.log(
        chalk.gray("   ⚠️  Could not apply custom theme. Using default.")
      );
    }
  }
}

// Run the main function
main().catch((error) => {
  console.error(chalk.red("\n❌ Fatal error:"), error);
  process.exit(1);
});
