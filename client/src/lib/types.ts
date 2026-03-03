export interface Industry {
  _id: string;
  slug: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  position: { x: number; y: number };
  size?: { rx: number; ry: number };
  children: District[];
}

export interface District {
  name: string;
  slug: string;
  stacks: TechStack[];
}

export interface TechStack {
  name: string;
  icon: string;
  url: string;
  category?: string;
  dependencies?: string[];
}

export interface LearningResource {
  name: string;
  url: string;
  type: 'free' | 'paid';
}

export interface LearningStep {
  order: number;
  title: string;
  description: string;
  estimatedHours: number;
  resources: LearningResource[];
}

export interface Course {
  provider: string;
  name: string;
  url: string;
  rating: number;
  type: 'free' | 'paid';
  timeToMarket?: string;
  postGradSalary?: number;
}

export interface Role {
  _id: string;
  slug: string;
  name: string;
  description: string;
  industrySlug: string;
  districtSlug?: string;
  learningPath?: LearningStep[];
  courses?: Course[];
}

export interface User {
  _id: string;
  email: string;
  displayName: string;
}

export interface Pin {
  _id: string;
  targetType: "role" | "industry";
  targetId: string;
  notes: string;
}

export interface RoleSalaryResponse {
  tableId: string;
  source: string;
  live: boolean;
  roleSlug: string;
  roleName: string;
  occupationCode: string | null;
  occupationLabel: string | null;
  sectorCode: string | null;
  sectorLabel: string | null;
  year: string | null;
  averageMonthly: number | null;
  median: number | null;
  p25: number | null;
  p75: number | null;
  error?: string;
}
