# Contributing to Quotes API 🤝

Thank you for your interest in contributing to Quotes API! We welcome contributions from everyone and are grateful for every contribution, no matter how small.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Adding New Quotes](#adding-new-quotes)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be respectful** and inclusive of differing viewpoints and experiences
- **Be collaborative** and help others learn and grow
- **Focus on the community** and what is best for everyone
- **Show empathy** towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/quotes.git
   cd quotes
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## 🔄 Development Process

### Workflow Overview

1. **Check existing issues** or create a new one
2. **Fork and clone** the repository
3. **Create a feature branch** from `main`
4. **Make your changes** following our standards
5. **Test your changes** thoroughly
6. **Commit using conventional commits**
7. **Push to your fork** and create a Pull Request
8. **Respond to review feedback**

### Branch Naming Convention

Use descriptive branch names that follow this pattern:

```
<type>/<short-description>

Examples:
feature/add-new-quotes
fix/rate-limiting-bug
docs/update-api-documentation
refactor/improve-error-handling
```

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured commit messages.

### Commit Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples

```bash
feat(api): add category filtering to quotes endpoint
fix(ui): resolve mobile dock positioning issue
docs: update API documentation with examples
style: format code according to prettier config
refactor(rate-limit): improve memory management
```

## 🔍 Pull Request Process

### Before Submitting

- [ ] Your branch is up to date with the latest `main`
- [ ] All tests pass (`npm run lint`, `npm run type-check`, `npm run build`)
- [ ] Your code follows our coding standards
- [ ] You've updated documentation if needed
- [ ] You've added tests for new functionality

### Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested these changes locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Include screenshots for UI changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Use the latest version** of the project
3. **Provide clear reproduction steps**

### Issue Types

- **🐛 Bug Report**: Something isn't working
- **✨ Feature Request**: Suggest a new feature
- **📚 Documentation**: Improve or add documentation
- **❓ Question**: Ask for help or clarification

## 🎨 Coding Standards

### TypeScript

- Use **strict TypeScript** configuration
- Define proper **interfaces** for all data structures
- Avoid `any` type - use proper typing
- Use **async/await** instead of Promises where appropriate

### React/Next.js

- Use **functional components** with hooks
- Follow **React best practices**
- Use **Next.js App Router** conventions
- Implement proper **error boundaries**

### Styling

- Use **Tailwind CSS** for styling
- Follow **mobile-first** approach
- Use **semantic class names**
- Maintain **consistent spacing** using Tailwind's scale

### Code Quality

```typescript
// ✅ Good
interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

const fetchQuote = async (id: number): Promise<Quote> => {
  const response = await fetch(`/api/quotes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quote');
  }
  return response.json();
};

// ❌ Bad
const fetchQuote = async (id: any) => {
  const response = await fetch(`/api/quotes/${id}`);
  return response.json();
};
```

## 📚 Adding New Quotes

### Guidelines for Quote Contributions

1. **Verify Attribution**: Ensure quotes have proper, accurate attribution
2. **No Anonymous Quotes**: All quotes must have a verified author
3. **Quality Over Quantity**: Focus on meaningful, inspirational content
4. **Appropriate Categories**: Use existing categories or suggest new ones
5. **Indonesian Language**: Quotes should be in Indonesian or properly translated

### Quote Data Structure

```typescript
{
  id: number,        // Unique identifier
  text: string,      // The quote text in Indonesian
  author: string,    // Verified author name
  category: string   // Appropriate category
}
```

### Adding Quotes Process

1. **Research and verify** the quote attribution
2. **Add to** `src/data/quotes.ts`
3. **Follow the existing** ID sequence
4. **Use appropriate** category
5. **Test locally** to ensure no errors
6. **Submit PR** with proper description

## 🧪 Testing Guidelines

### Before Submitting

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Manual testing
npm run dev
```

### Manual Testing Checklist

- [ ] All API endpoints work correctly
- [ ] UI is responsive on mobile and desktop
- [ ] Slideshow functionality works
- [ ] Theme switching works
- [ ] Rate limiting behaves correctly
- [ ] Error handling works properly

## 📖 Documentation

### When to Update Documentation

- Adding new features
- Changing API behavior
- Fixing bugs that affect API usage
- Adding new configuration options

### Documentation Locations

- **README.md**: Project overview and basic usage
- **API Documentation**: `/src/app/docs/` directory
- **Code Comments**: Inline documentation for complex logic
- **CHANGELOG.md**: Version history and changes

## 🎯 Development Tips

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Prettier - Code formatter**
- **ESLint**

### Helpful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🤝 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: Direct contact with maintainers

## 📞 Contact

- **Repository**: [https://github.com/liu-purnomo/quotes](https://github.com/liu-purnomo/quotes)
- **Issues**: [GitHub Issues](https://github.com/liu-purnomo/quotes/issues)
- **Maintainer**: [@liu-purnomo](https://github.com/liu-purnomo)

---

## 🙏 Recognition

Contributors who make significant contributions will be:

- Added to the **Contributors** section in README
- Mentioned in **release notes**
- Given appropriate **GitHub repository permissions**

Thank you for contributing to Quotes API! 🌟

---

> **Note**: This contributing guide is a living document. Feel free to suggest improvements!