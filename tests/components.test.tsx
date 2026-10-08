import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecruiterPortal } from "../src/components/RecruiterPortal";

describe("Component Rendering: RecruiterPortal", () => {
  it("renders the recruiter verification portal header", () => {
    render(<RecruiterPortal />);
    expect(screen.getByText(/Architectural Capability & Benchmark Inspector/i)).toBeDefined();
    expect(screen.getByText(/Overview & Architecture/i)).toBeDefined();
  });

  it("switches tabs cleanly to Biomechanical Physics and executes strike", () => {
    render(<RecruiterPortal />);
    const physicsTab = screen.getByRole("button", { name: /Biomechanical Physics/i });
    fireEvent.click(physicsTab);

    expect(screen.getByText(/Biomechanical Strike Kinematics Engine/i)).toBeDefined();
    const jabButton = screen.getByRole("button", { name: /Execute Jab \/ Cross/i });
    fireEvent.click(jabButton);

    expect(screen.getByText(/PEAK VELOCITY/i)).toBeDefined();
  });

  it("switches tabs to LZ-String Compression and runs benchmark", () => {
    render(<RecruiterPortal />);
    const compTab = screen.getByRole("button", { name: /LZ-String Compression/i });
    fireEvent.click(compTab);

    expect(screen.getByText(/In-Browser LZ-String UTF-16 Compression Benchmark/i)).toBeDefined();
    const runBtn = screen.getByRole("button", { name: /Execute Compression Benchmark/i });
    fireEvent.click(runBtn);

    expect(screen.getByText(/FOOTPRINT REDUCTION/i)).toBeDefined();
  });

  it("switches tabs to XOR Security and tests signature generation", () => {
    render(<RecruiterPortal />);
    const secTab = screen.getByRole("button", { name: /XOR Obfuscation & Security/i });
    fireEvent.click(secTab);

    expect(screen.getByText(/XOR Bitwise Obfuscation & Signature Verifier/i)).toBeDefined();
    const packBtn = screen.getByRole("button", { name: /Generate Obfuscated Packet/i });
    fireEvent.click(packBtn);

    expect(screen.getByText(/SIGNATURE MATCH - INTEGRITY CONFIRMED/i)).toBeDefined();
  });

  it("switches tabs to Resume Capability Matrix", () => {
    render(<RecruiterPortal />);
    const matrixTab = screen.getByRole("button", { name: /Resume Capability Matrix/i });
    fireEvent.click(matrixTab);

    expect(screen.getByText(/Resume Technical Capability Verification Mapping/i)).toBeDefined();
    expect(screen.getAllByText(/VERIFIED/i).length).toBeGreaterThan(3);
  });
});
