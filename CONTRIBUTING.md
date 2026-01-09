# Contributing to Rajesh Kanakamedala's Portfolio

First off, thanks for taking the time to contribute! 🎉

This is a personal portfolio project, but I welcome feedback, bug reports, and suggestions for improvement.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report.

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples** to demonstrate the steps.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Explain why this enhancement would be useful** to most users.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`pnpm test`).
5. Run the linter (`pnpm lint`).
6. Issue that pull request!

## Development

### Setup

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

### Test

```bash
pnpm test
```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Coding Standards

- **TypeScript**: Use strict typing. Avoid `any`.
- **Tailwind**: Use utility classes. Avoid arbitrary values (`[...]`) if a theme variable exists.
- **Components**: Use functional components with typed props.
