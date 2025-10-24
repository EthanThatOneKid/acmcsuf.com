// for common variables and functions in workshops

// semester shortcuts
export const sSc = new Map<string, string>();
sSc.set("fa24", "Fall 2024");
sSc.set("sp25", "Spring 2025");
sSc.set("fa25", "Fall 2025");
sSc.set("sp26", "Spring 2026");

// Mapping team color
export const colorMap = new Map<string, string>();
colorMap.set("general", "var(--acm-blue)");
colorMap.set("algo", "var(--acm-purple)");
colorMap.set("ai", "var(--acm-emerald)");
colorMap.set("dev", "var(--acm-bluer)");
colorMap.set("gamedev", "var(--acm-red)");
colorMap.set("nodebuds", "var(--acm-red)");
colorMap.set("icpc", "var(--acm-orange)");
colorMap.set("design", "var(--acm-pink)");
colorMap.set("oss", "var(--acm-turquoise)");

// team shortcuts to display in general
export const tSc = new Map<string, string>();
tSc.set("general", "General");
tSc.set("os", "Open Source");
tSc.set("oss", "Open Source");
tSc.set("algo", "Algo");
tSc.set("ai", "AI");
tSc.set("dev", "Dev");
tSc.set("nodebuds", "Nodebuds");
tSc.set("gamedev", "Game Dev");
tSc.set("icpc", "ICPC");
tSc.set("design", "Design");
