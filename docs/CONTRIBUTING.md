# Contributing to Create ShadCN App

First off, thank you for considering contributing to Create ShadCN App! 🎉

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, package manager)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the feature
- **Use case** explaining why it would be useful
- **Possible implementation** if you have ideas

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**:
   ```bash
   node index.mjs
   ```
5. **Commit** with a clear message:
   ```bash
   git commit -m "Add: description of your changes"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

## Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/williamperret/create-shadcn-app.git
   cd create-shadcn-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Test locally:
   ```bash
   node index.mjs
   ```

## Coding Standards

### JavaScript/Node.js

- Use **ES modules** (import/export)
- Use **async/await** for asynchronous operations
- Add **comments** for complex logic
- Use **meaningful variable names**
- Follow **functional programming** principles where appropriate

### Code Style

- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings (except when using template literals)
- Add **JSDoc comments** for functions

Example:

```javascript
/**
 * Description of what the function does
 * @param {string} param1 - Description of param1
 * @returns {Promise<void>}
 */
async function myFunction(param1) {
  // Implementation
}
```

### Commit Messages

Use clear and descriptive commit messages:

- `Add: new feature or file`
- `Update: changes to existing functionality`
- `Fix: bug fix`
- `Refactor: code restructuring without behavior change`
- `Docs: documentation changes`
- `Style: formatting, missing semicolons, etc.`
- `Test: adding or updating tests`
- `Chore: maintenance tasks`

Examples:

```
Add: support for bun package manager
Fix: handle empty project names correctly
Update: improve error messages
Docs: add installation instructions to README
```

## Testing

Before submitting a PR, test the following scenarios:

1. **Fresh installation** with each package manager (npm, pnpm, yarn, bun)
2. **Existing directory** handling (overwrite, rename, cancel)
3. **Invalid inputs** (empty names, special characters)
4. **Generated project** runs successfully:
   ```bash
   cd your-test-app
   npm install
   npm run dev
   ```

## Questions?

Feel free to open an issue with the `question` label or contact the maintainer directly.

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing! 🚀
