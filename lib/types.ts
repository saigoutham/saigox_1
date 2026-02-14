// ═══ Photo ═══
export interface Photo {
  id: string;
  title: string;
  category: "wildlife" | "landscape" | "macro" | "portrait" | "architecture" | "street" | "travel";
  location: string;
  date: string;
  src: string;
  width: number;
  height: number;
  featured?: boolean;
}

// ═══ Mission / Case Study ═══
export interface MissionResult {
  metric: string;
  value: string;
  description: string;
}

export interface Mission {
  slug: string;
  codename: string;
  title: string;
  company: string;
  period: string;
  category: string;
  tags: string[];
  brief: string;
  approach: string[];
  results: MissionResult[];
  learnings: string[];
}

// ═══ Award ═══
export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
}

// ═══ Visitor Store ═══
export interface Visitor {
  developedPhotos: string[];
  hasSeenPreloader: boolean;
}

// ═══ Timeline Entry ═══
export interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  category: "gaming" | "business" | "education" | "data";
  highlights: string[];
}

// ═══ Impact Number ═══
export interface ImpactNumber {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
}

// ═══ Realm ═══
export interface Realm {
  id: number;
  name: string;
  subtitle: string;
  accent: string;
  accentDim: string;
  accentGlow: string;
}

// ═══ Relic (Act I) ═══
export interface Relic {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
  category: "data" | "recognition" | "education";
  easterEgg?: string;
}

// ═══ Skill Tree (Act II) ═══
export interface SkillNode {
  id: string;
  branch: string;
  title: string;
  subtitle: string;
  metrics: { value: string; label: string }[];
  position: { x: number; y: number };
}

export interface SkillBranch {
  id: string;
  name: string;
  color: string;
  nodes: SkillNode[];
}

// ═══ Character Stat ═══
export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  description: string;
  evidence: string[];
  color: string;
}

// ═══ Realm Store ═══
export interface RealmVisitor {
  developedPhotos: string[];
  hasSeenPreloader: boolean;
  relicsDiscovered: string[];
  skillsRevealed: string[];
  discoveredEasterEggs: string[];
  soundEnabled: boolean;
  visitCount: number;
}
