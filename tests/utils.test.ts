import { describe, it, expect } from "vitest";
import { OneEuroFilter, OneEuroFilter3D } from "../src/utils/OneEuroFilter";
import { LZCompression } from "../src/utils/LZCompression";
import { XORCipher } from "../src/utils/XORCipher";
import { BiomechanicalPhysics } from "../src/utils/BiomechanicalPhysics";
import { BinarySerializer } from "../src/utils/BinarySerializer";

describe("Signal Processing: OneEuroFilter", () => {
  it("initializes with initial value and suppresses jitter", () => {
    const filter = new OneEuroFilter({ minCutoff: 1.0, beta: 0.007 });
    const val1 = filter.filter(10.0, 0.0);
    expect(val1).toBe(10.0);

    // High frequency noisy jitter spike
    const val2 = filter.filter(12.0, 0.016);
    expect(val2).toBeGreaterThan(10.0);
    expect(val2).toBeLessThan(12.0); // heavily damped
  });

  it("OneEuroFilter3D processes multi-axis vector coordinates", () => {
    const filter3D = new OneEuroFilter3D();
    const res = filter3D.filter({ x: 1.0, y: 2.0, z: 3.0 }, 0.0);
    expect(res).toEqual({ x: 1.0, y: 2.0, z: 3.0 });
  });

  it("resets filter history cleanly", () => {
    const filter = new OneEuroFilter();
    filter.filter(50, 0.0);
    filter.reset();
    const afterReset = filter.filter(100, 1.0);
    expect(afterReset).toBe(100);
  });
});

describe("Storage Optimization: LZCompression", () => {
  it("compresses and roundtrips arbitrary string payloads", () => {
    const testString = JSON.stringify({
      user: "MurimScholar",
      stats: { qi: 90, hp: 100 },
      inventory: ["Blade of the Abyss", "Plum Blossom Elixir", "Shadow Boots"],
    });

    const compressed = LZCompression.compress(testString);
    expect(typeof compressed).toBe("string");
    expect(compressed.length).toBeGreaterThan(0);

    const decompressed = LZCompression.decompress(compressed);
    expect(decompressed).toBe(testString);
  });

  it("handles empty and single character strings safely", () => {
    expect(LZCompression.compress("")).toBe("");
    expect(LZCompression.decompress("")).toBe("");
    expect(LZCompression.decompress(LZCompression.compress("A"))).toBe("A");
  });

  it("benchmark reports positive ratio and timing metrics", () => {
    const largeJson = JSON.stringify(Array.from({ length: 50 }, (_, i) => ({ id: i, name: `Entity_${i}` })));
    const stats = LZCompression.benchmark(largeJson);
    expect(stats.originalBytes).toBeGreaterThan(0);
    expect(stats.compressedBytes).toBeGreaterThan(0);
    expect(stats.compressionTimeMs).toBeGreaterThanOrEqual(0);
  });
});

describe("Credential Security: XORCipher", () => {
  it("encodes and decodes strings using symmetric bitwise masking", () => {
    const text = "AUTHENTICATED_SESSION_KEY_2026";
    const key = "MurimSecretSalt";
    const encoded = XORCipher.encode(text, key);
    expect(encoded).not.toBe(text);

    const decoded = XORCipher.decode(encoded, key);
    expect(decoded).toBe(text);
  });

  it("calculates 32-bit FNV-1a checksums consistently", () => {
    const checksum1 = XORCipher.checksum("Hello World");
    const checksum2 = XORCipher.checksum("Hello World");
    const checksumDiff = XORCipher.checksum("Hello World!");
    expect(checksum1).toBe(checksum2);
    expect(checksum1).not.toBe(checksumDiff);
    expect(checksum1.length).toBe(8);
  });

  it("detects payload tampering using signature verification", () => {
    const data = { role: "admin", clearance: 5 };
    const packet = XORCipher.pack(data, "Key");

    // Unpack clean
    const cleanResult = XORCipher.unpack(packet, "Key");
    expect(cleanResult.valid).toBe(true);
    expect(cleanResult.data).toEqual(data);

    // Tampered payload
    const tamperedPacket = { ...packet, payload: packet.payload.slice(0, -4) + "AAAA" };
    const tamperedResult = XORCipher.unpack(tamperedPacket, "Key");
    expect(tamperedResult.valid).toBe(false);
  });
});

describe("Kinematics: BiomechanicalPhysics", () => {
  it("calculates 3D Euclidean distances accurately", () => {
    const d = BiomechanicalPhysics.distance({ x: 0, y: 0, z: 0 }, { x: 3, y: 4, z: 0 });
    expect(d).toBeCloseTo(5.0);
  });

  it("calculates joint angles between 3 spatial nodes", () => {
    const a = { x: 0, y: 1, z: 0 };
    const b = { x: 0, y: 0, z: 0 };
    const c = { x: 1, y: 0, z: 0 };
    const angle = BiomechanicalPhysics.calculateJointAngle(a, b, c);
    expect(angle).toBeCloseTo(90.0);
  });

  it("computes instantaneous velocity, acceleration, and kinetic energy", () => {
    const engine = new BiomechanicalPhysics(4.0); // 4 kg mass
    engine.processFrame({ x: 0, y: 0, z: 0 }, 0.0);
    // Move 0.1m in 0.016s -> ~6.25 m/s
    const f2 = engine.processFrame({ x: 0, y: 0, z: -0.1 }, 0.016);
    expect(f2.speed).toBeGreaterThan(5.0);
    expect(f2.kineticEnergy).toBeGreaterThan(50.0); // 0.5 * 4 * v^2
  });

  it("classifies strike archetypes from velocity vectors", () => {
    const shoulder = { x: 0, y: 1.4, z: 0 };
    const elbow = { x: 0.1, y: 1.4, z: -0.2 };
    const wrist = { x: 0.1, y: 1.4, z: -0.6 };

    const jab = BiomechanicalPhysics.classifyStrike(shoulder, elbow, wrist, { x: 0, y: 0, z: -4.0 });
    expect(["Jab", "Cross"]).toContain(jab);

    const uppercut = BiomechanicalPhysics.classifyStrike(shoulder, elbow, wrist, { x: 0, y: 3.5, z: -0.5 });
    expect(uppercut).toBe("Uppercut");
  });
});

describe("Serialization: BinarySerializer", () => {
  it("serializes and deserializes session state with magic header validation", () => {
    const session = {
      name: "DragonSculptSession",
      material: "DigitalClay",
      transform: {
        position: [1.2, 0.0, -3.4] as [number, number, number],
        rotation: [0, 1.57, 0] as [number, number, number],
        scale: [1, 1, 1] as [number, number, number],
      },
      vertexOffsets: new Float32Array([0.1, 0.2, 0.3, -0.4, 0.5, 0.6]),
    };

    const buffer = BinarySerializer.serialize(session);
    expect(buffer.byteLength).toBeGreaterThan(24);

    const restored = BinarySerializer.deserialize(buffer);
    expect(restored.name).toBe("DragonSculptSession");
    expect(restored.material).toBe("DigitalClay");
    expect(restored.transform.position).toEqual([1.2, 0.0, -3.4]);
    for (let i = 0; i < session.vertexOffsets.length; i++) {
      expect(restored.vertexOffsets[i]).toBeCloseTo(session.vertexOffsets[i], 5);
    }
  });

  it("throws error when deserializing buffer with invalid magic header", () => {
    const corruptBuffer = new ArrayBuffer(32);
    const view = new DataView(corruptBuffer);
    view.setUint32(0, 0x12345678, false); // Wrong magic header

    expect(() => BinarySerializer.deserialize(corruptBuffer)).toThrow(/magic mismatch/);
  });
});
