import { defineConfig } from "tsup";
import * as fs from "fs";
import * as path from "path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    hooks: "src/hooks/index.ts",
    components: "src/components/index.ts",
    utils: "src/utils/index.ts",
  },
  format: ["esm"],
  tsconfig: "tsconfig.lib.json",
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  minify: false,
  splitting: false,
  external: [
    "react",
    "react-dom",
    "three",
    "next",
    "howler",
    "idb-keyval",
    "zustand",
    "immer",
  ],
  onSuccess: async () => {
    const distDir = path.resolve(process.cwd(), "dist");
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Merge index.css into dist/style.css for universal styling
    const indexCss = path.resolve(distDir, "index.css");
    const srcCss = path.resolve(process.cwd(), "src/style.css");
    const distCss = path.resolve(distDir, "style.css");

    let combinedCss = "";
    if (fs.existsSync(srcCss)) {
      combinedCss += fs.readFileSync(srcCss, "utf8") + "\n";
    }
    if (fs.existsSync(indexCss)) {
      combinedCss += fs.readFileSync(indexCss, "utf8");
    }
    fs.writeFileSync(distCss, combinedCss);

    // Create .d.ts compatibility re-exports for TypeScript environments
    const subpaths = ["index", "hooks", "components", "utils"];
    for (const sub of subpaths) {
      const dtsPath = path.resolve(distDir, `${sub}.d.ts`);
      fs.writeFileSync(dtsPath, `export * from "./${sub}.d.mts";\n`);
    }
  },
});
