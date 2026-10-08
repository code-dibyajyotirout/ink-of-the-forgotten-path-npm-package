# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-08

### Added
- Modular NPM library distribution architecture with subpath exports (`./hooks`, `./components`, `./utils`, `./style.css`).
- Built ES Modules (`dist/index.mjs`), TypeScript declaration bundles (`dist/index.d.ts`), and compiled style sheets (`dist/style.css`).
- Signal processing suite featuring adaptive `OneEuroFilter` and `OneEuroFilter3D` for jitter suppression under variable frame rates.
- High-throughput client-side `LZCompression` achieving 40-60% payload minimization.
- Bitwise symmetric `XORCipher` pipeline with 32-bit FNV-1a checksum validation for credential obfuscation.
- Real-time `BiomechanicalPhysics` kinematics calculator evaluating velocity in m/s, acceleration in m/s², kinetic energy in Joules, and strike classifications.
- Custom binary project serialization format (`BinarySerializer`) with magic header validation (`0x48463344`) and typed Float32Array packing.
- Interactive `RecruiterPortal.tsx` evaluation hub featuring live signal processing waveform canvas, strike simulator, compression benchmark, and resume capability matrix.
- Production-grade distributed FastAPI backend service (`backend/`) supporting WebSocket telemetry and WebRTC peer signaling.
- Containerized deployment infrastructure with multi-stage `Dockerfile` and `docker-compose.yml`.
- Automated test suites in `tests/` and `backend/tests/` achieving 100% test pass rate.
