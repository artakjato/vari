export interface Industry {
  _id: string; //id from the database
  slug: string; //URL-friendly name
  name: string; //dispalys name
  subtitle: string; //short description shown under the name
  color: string; //color for the bubble
  icon: string; //icon URL
  position: { x: number; y: number }; //where to place it on the SVG canvas
  children: District[]; //the districs inside the industry
}

export interface District {
  name: string;
  slug: string;
  stacks: TechStack[]; //the tech in this district
}

export interface TechStack {
  name: string;
  icon: string;
  url: string;
}

export interface Role {
  _id: string;
  slug: string;
  name: string;
  description: string;
  industrySlug: string;
  tradeoffs: string[];
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
