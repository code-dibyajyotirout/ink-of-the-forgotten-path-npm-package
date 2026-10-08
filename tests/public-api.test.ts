import { describe, it, expect } from "vitest";
import * as RootExports from "../src/index";
import * as HookExports from "../src/hooks/index";
import * as ComponentExports from "../src/components/index";
import * as UtilExports from "../src/utils/index";

describe("NPM Public API Surface Validation", () => {
  it("exports core utilities from root", () => {
    expect(RootExports.OneEuroFilter).toBeDefined();
    expect(RootExports.LZCompression).toBeDefined();
    expect(RootExports.XORCipher).toBeDefined();
    expect(RootExports.BiomechanicalPhysics).toBeDefined();
    expect(RootExports.BinarySerializer).toBeDefined();
  });

  it("exports core hooks from root and ./hooks", () => {
    expect(RootExports.useOneEuroFilter).toBeDefined();
    expect(HookExports.useOneEuroFilter).toBeDefined();
    expect(RootExports.useBiomechanicalPhysics).toBeDefined();
    expect(HookExports.useBiomechanicalPhysics).toBeDefined();
    expect(RootExports.useDeviceCapability).toBeDefined();
    expect(HookExports.useDeviceCapability).toBeDefined();
    expect(RootExports.useCloudSaveTransfer).toBeDefined();
    expect(RootExports.useTouchControls).toBeDefined();
    expect(RootExports.useGameStore).toBeDefined();
  });

  it("exports core components from root and ./components", () => {
    expect(RootExports.RecruiterPortal).toBeDefined();
    expect(ComponentExports.RecruiterPortal).toBeDefined();
    expect(RootExports.GameCanvas).toBeDefined();
    expect(ComponentExports.GameCanvas).toBeDefined();
    expect(RootExports.HUD).toBeDefined();
    expect(ComponentExports.HUD).toBeDefined();
    expect(RootExports.CombatActionBar).toBeDefined();
  });

  it("exports game data and engine systems from root", () => {
    expect(RootExports.GameEngine).toBeDefined();
    expect(RootExports.PROFESSIONS).toBeDefined();
    expect(RootExports.SaveManager).toBeDefined();
    expect(RootExports.KeybindingsManager).toBeDefined();
  });

  it("exports utility submodule from ./utils", () => {
    expect(UtilExports.OneEuroFilter).toBeDefined();
    expect(UtilExports.OneEuroFilter3D).toBeDefined();
    expect(UtilExports.LZCompression).toBeDefined();
    expect(UtilExports.XORCipher).toBeDefined();
    expect(UtilExports.BiomechanicalPhysics).toBeDefined();
    expect(UtilExports.BinarySerializer).toBeDefined();
  });
});
