/* oxlint-disable */
export type BlockType = "hero" | "text" | "button" | "image" | "columns" | "divider";
export type DesignSystem = { name: string; description: string; colors: Record<string, string>; typography: Record<string, { fontFamily: string; fontSize: string; fontWeight: number; lineHeight: string }>; rounded: Record<string, string>; spacing: Record<string, string>; components: Record<string, Record<string, string>> };
export type Block = { id: string; type: BlockType; content: string; tone?: "ink" | "muted" | "accent"; align?: "left" | "center" | "right" };
export type Page = { id: string; name: string; path: string; blocks: Block[]; updatedAt: string };
export type Change = { id: string; actor: "human" | "agent"; action: string; detail: string; at: string };

export const designSystem: DesignSystem = {
  name: "Signal / Quiet Utility",
  description: "A focused visual language for building calm, structured interfaces with an agent and a human in the same workspace.",
  colors: { primary: "#202426", ink: "#202426", paper: "#F5F3EE", surface: "#FFFFFF", muted: "#6F7573", line: "#D9D7D0", accent: "#C8F169", accentInk: "#18200E" },
  typography: { display: { fontFamily: "Arial, Helvetica, sans-serif", fontSize: "56px", fontWeight: 700, lineHeight: "0.98" }, heading: { fontFamily: "Arial, Helvetica, sans-serif", fontSize: "24px", fontWeight: 700, lineHeight: "1.1" }, body: { fontFamily: "Arial, Helvetica, sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: "1.5" }, label: { fontFamily: "Arial, Helvetica, sans-serif", fontSize: "11px", fontWeight: 700, lineHeight: "1" } },
  rounded: { sm: "8px", md: "14px", lg: "22px", pill: "999px" }, spacing: { xs: "8px", sm: "12px", md: "20px", lg: "32px", xl: "48px" },
  components: { "button-primary": { backgroundColor: "{colors.primary}", textColor: "{colors.paper}", rounded: "{rounded.pill}", padding: "12px 18px" }, "button-accent": { backgroundColor: "{colors.accent}", textColor: "{colors.accentInk}", rounded: "{rounded.pill}", padding: "12px 18px" }, card: { backgroundColor: "{colors.surface}", textColor: "{colors.ink}", rounded: "{rounded.md}", padding: "{spacing.lg}" }, divider: { backgroundColor: "{colors.line}", textColor: "{colors.ink}", rounded: "{rounded.sm}", padding: "{spacing.xs}" }, caption: { backgroundColor: "{colors.surface}", textColor: "{colors.muted}", rounded: "{rounded.sm}", padding: "{spacing.xs}" } },
};

export const initialPage: Page = { id: "page_home", name: "Homepage", path: "/", updatedAt: "2026-09-01T12:00:00.000Z", blocks: [
  { id: "block_hero", type: "hero", content: "Build in the open.\nKeep the rules visible.", tone: "ink" },
  { id: "block_intro", type: "text", content: "A visual workspace where a person and an agent can shape the same interface without losing the design system.", tone: "muted" },
  { id: "block_columns", type: "columns", content: "Canvas||Contract||History", tone: "ink" },
  { id: "block_cta", type: "button", content: "Start with a clear brief", tone: "accent" },
] };

export function resolveToken(value: string, system: DesignSystem): string { const match = value.match(/^\{(colors|rounded|spacing)\.([\w-]+)\}$/); if (!match) return value; return system[match[1] as "colors" | "rounded" | "spacing"][match[2]] ?? value; }
export function validateDesign(system: DesignSystem, page: Page) {
  const errors: string[] = [], warnings: string[] = [], hex = /^#[0-9A-Fa-f]{6}$/;
  Object.entries(system.colors).forEach(([key, value]) => { if (!hex.test(value)) errors.push(`colors.${key} must be a six-digit hex color`); });
  const serialized = JSON.stringify(system.components);
  Object.entries(system.colors).forEach(([key]) => { if (!serialized.includes(`{colors.${key}}`)) warnings.push(`colors.${key} is not referenced by a component`); });
  Object.entries(system.components).forEach(([component, values]) => Object.entries(values).forEach(([property, value]) => { if (value.startsWith("{") && resolveToken(value, system) === value) errors.push(`${component}.${property} references an unknown token`); }));
  const contrast = contrastRatio(system.colors.accent, system.colors.accentInk); if (contrast < 4.5) warnings.push(`button-accent contrast is ${contrast.toFixed(2)}:1; WCAG AA recommends 4.5:1`);
  if (!page.blocks.length) warnings.push("The selected page has no blocks");
  return { status: errors.length ? "FAILED" : warnings.length ? "WARNING" : "PASSED", errors, warnings, accentContrast: contrast };
}
function contrastRatio(a: string, b: string) { const luminance = (hex: string) => { const rgb = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255).map((value) => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4); return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; }; const [one, two] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (one + 0.05) / (two + 0.05); }
export function designMarkdown(system: DesignSystem) { const lines = ["---", `name: ${system.name}`, `description: ${system.description}`, "colors:", ...Object.entries(system.colors).map(([key, value]) => `  ${key}: \"${value}\"`), "typography:", ...Object.entries(system.typography).flatMap(([key, value]) => [`  ${key}:`, `    fontFamily: ${value.fontFamily}`, `    fontSize: ${value.fontSize}`, `    fontWeight: ${value.fontWeight}`, `    lineHeight: ${value.lineHeight}`]), "rounded:", ...Object.entries(system.rounded).map(([key, value]) => `  ${key}: ${value}`), "spacing:", ...Object.entries(system.spacing).map(([key, value]) => `  ${key}: ${value}`), "components:", ...Object.entries(system.components).flatMap(([key, values]) => [`  ${key}:`, ...Object.entries(values).map(([name, value]) => `    ${name}: \"${value}\"`)]), "---"]; return `${lines.join("\n")}\n\n## Overview\n\n${system.description}\n\n## Colors\n\nInk and paper form the stable foundation. The accent is reserved for primary actions and agent presence.\n\n## Typography\n\nTypography is compact and utilitarian.\n\n## Layout\n\nUse the spacing scale and avoid arbitrary values.\n\n## Components\n\nComponent entries bridge the editor and generated interfaces.\n\n## Do's and Don'ts\n\n- Do use tokens for color, spacing, radius, and component styling.\n- Don't introduce one-off values without updating the contract.\n`; }
