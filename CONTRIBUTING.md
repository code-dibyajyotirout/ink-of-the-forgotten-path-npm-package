# Contributing Guidelines

Thank you for your interest in contributing to Ink of the Forgotten Path. We welcome contributions from developers, researchers, and systems architects.

## Architectural Principles
1. High Performance: The client runtime targets a consistent 60 FPS standard with sub-16.6ms frame pacing.
2. Zero Fluff: Code should be strictly documented, strongly typed, and backed by automated unit tests.
3. Modular Packaging: Core components, hooks, and signal processing utilities must maintain clean modular entrypoints.
4. Professional Standard: Emojis are strictly prohibited across code, comments, commit messages, and documentation.

## Development Workflow
1. Fork and clone the repository.
2. Install frontend and library dependencies:
   ```bash
   npm ci
   ```
3. Set up the local backend environment (optional if working on client only):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r backend/requirements.txt
   ```
4. Verify tests pass prior to submitting changes:
   ```bash
   npm run typecheck
   npm run test
   npm run lint
   npm run test:backend
   ```
5. Ensure production library builds with zero errors:
   ```bash
   npm run build:lib
   ```

## Pull Request Process
1. Create a dedicated topic branch from `main`.
2. Ensure every commit message follows Conventional Commits format without emojis (e.g., `feat(engine): optimize AABB spatial pruning kernel`).
3. Add or update unit tests covering new logic in `tests/` or `backend/tests/`.
4. Submit your pull request with a descriptive summary of architectural trade-offs.
