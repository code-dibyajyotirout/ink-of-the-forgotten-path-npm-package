# Security Policy

## Supported Versions
Security updates and patches are actively applied to the following release trains:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | Yes                |
| < 0.1.0 | No                 |

## Reporting Vulnerabilities
We take client and distributed service security seriously. If you discover a security vulnerability or exploit in this codebase:

1. Do NOT file a public issue on GitHub.
2. Email your technical report directly to: `dibyajyotirout21@gmail.com`
3. Include:
   - Reproduction steps and proof of concept.
   - Affected files and components.
   - Potential impact assessment (e.g., credential exposure, memory corruption, XSS vector).

We will acknowledge receipt within 48 hours and coordinate a coordinated disclosure timeline.

## Security Architecture Overview
- Client Obfuscation: Session tokens and local progress states are masked via symmetric bitwise XOR encoding and verified via 32-bit FNV-1a checksums (`src/utils/XORCipher.ts`).
- Storage Sanitization: State storage undergoes strict UTF-16 compression and JSON schema validation (`src/utils/LZCompression.ts`).
- Content Security Policy (CSP): Prevents unsanitized script injection and unsafe eval execution.
- WebAssembly Binary Integrity: Verifies SHA hashes on external WASM artifacts prior to instantiating compute contexts.
