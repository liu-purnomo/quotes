# Contributing to Indonesian Quotes API

Thank you for your interest in contributing to the Indonesian Quotes API project! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Pull Request Process](#pull-request-process)
- [Adding New Quotes](#adding-new-quotes)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. By participating, you are expected to uphold this code. Please report unacceptable behavior to Liu Purnomo at [hi@liupurnomo.com](mailto:hi@liupurnomo.com).

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
   ```bash
   git clone https://github.com/YOUR-USERNAME/quotes.git
   cd quotes
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Create a branch for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Make your changes
6. Run the development server to test your changes
   ```bash
   npm run dev
   ```

## Development Workflow

1. Make sure your code follows the [Coding Standards](#coding-standards)
2. Write or update tests if necessary
3. Ensure all tests pass
4. Update documentation if needed
5. Commit your changes with a descriptive commit message

## Coding Standards

### General Guidelines

- Use TypeScript for all code
- Add English comments to explain complex logic
- Follow the existing code style and structure
- Use meaningful variable and function names
- Keep functions small and focused on a single task

### TypeScript Style Guide

- Use interfaces for object types
- Use proper type annotations
- Avoid using `any` type when possible
- Use async/await for asynchronous operations

### Component Guidelines

- Use functional components with hooks
- Keep components small and reusable
- Use proper prop typing with interfaces
- Follow the "one component per file" rule

### CSS/Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow mobile-first approach for responsive design
- Use semantic class names when custom CSS is needed

### API Endpoint Guidelines

- Follow RESTful principles
- Include proper error handling
- Add CORS headers to all endpoints
- Document all endpoints in the API documentation

## Submitting Changes

1. Push your changes to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
2. Submit a pull request to the main repository
3. Ensure the PR description clearly describes the problem and solution
4. Include any relevant issue numbers in the PR description

## Pull Request Process

1. Update the README.md or documentation with details of changes if needed
2. The PR will be reviewed by maintainers
3. Address any requested changes from the code review
4. Once approved, your PR will be merged

## Adding New Quotes

If you want to add new quotes to the database:

1. Open the `src/data/quotes.ts` file
2. Add new quote objects following the existing format
3. Ensure each quote has a unique ID
4. Make sure to include the author and category
5. For categories, use existing ones or add new ones if necessary

Example of adding a new quote:

```typescript
{
  id: 16, // Make sure to use the next available ID
  text: "Your inspirational quote in Indonesian",
  author: "Author Name",
  category: "category" // Use existing categories: motivasi, pendidikan, inspirasi
}
```

Thank you for contributing to the Indonesian Quotes API project!

## Contact

If you have any questions or need further assistance, please contact the project maintainer:

Liu Purnomo - [hi@liupurnomo.com](mailto:hi@liupurnomo.com)

Project Link: [https://github.com/liu-purnomo/quotes](https://github.com/liu-purnomo/quotes)