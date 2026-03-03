import { create } from "zustand";
import { fetchMapData } from "../lib/api";
import type { Industry, Pin, Role } from "../lib/types";

interface MapState {
  industries: Industry[];
  roles: Role[];
  loading: boolean;
  error: string | null;

  zoomLevel: 1 | 2 | 3;
  focusedIndustrySlug: string | null;
  focusedDistrictSlug: string | null;
  expandedDistrictSlug: string | null;
  selectedRoleSlug: string | null;
  inspectorOpen: boolean;
  breadcrumbs: string[];

  searchQuery: string;
  searchMatchedIndustrySlugs: string[];

  viewport: 'desktop' | 'tablet' | 'mobile';

  currentUser: { email: string; displayName: string } | null;
  pins: Pin[];

  setZoomLevel: (level: 1 | 2 | 3) => void;
  focusIndustry: (slug: string) => void;
  focusDistrict: (slug: string) => void;
  expandDistrict: (slug: string | null) => void;
  selectRole: (slug: string) => void;
  setSearchState: (query: string, matchedIndustrySlugs: string[]) => void;
  clearSearch: () => void;
  setViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  resetMap: () => void;
  addPin: (pin: Pin) => void;
  removePin: (id: string) => void;
  loadMapData: () => Promise<void>;
}

function hydrateIndustry(industry: Partial<Industry>): Industry | null {
  if (!industry.slug || !industry.name || !industry.position) return null;

  return {
    _id: industry._id ?? `local-ind-${industry.slug}`,
    slug: industry.slug,
    name: industry.name,
    subtitle: industry.subtitle ?? "",
    color: industry.color ?? "#94A3B8",
    icon: industry.icon ?? "",
    position: industry.position,
    size: industry.size ?? { rx: 160, ry: 120 },
    children: industry.children ?? [],
  };
}

function hydrateRole(role: Partial<Role>): Role | null {
  if (!role.slug || !role.name || !role.industrySlug) return null;

  return {
    _id: role._id ?? `local-role-${role.slug}`,
    slug: role.slug,
    name: role.name,
    description: role.description ?? "",
    industrySlug: role.industrySlug,
    districtSlug: role.districtSlug ?? "",
    learningPath: role.learningPath ?? [],
    courses: role.courses ?? [],
  };
}

export const useMapStore = create<MapState>((set) => ({
  industries: [],
  roles: [],
  loading: false,
  error: null,

  zoomLevel: 1,
  focusedIndustrySlug: null,
  focusedDistrictSlug: null,
  expandedDistrictSlug: null,
  selectedRoleSlug: null,
  inspectorOpen: false,
  breadcrumbs: ["All industries"],

  searchQuery: "",
  searchMatchedIndustrySlugs: [],

  viewport: 'desktop',

  currentUser: null,
  pins: [],

  setZoomLevel: (level) => set({ zoomLevel: level }),

  focusIndustry: (slug) =>
    set({
      focusedIndustrySlug: slug,
      expandedDistrictSlug: null,
      zoomLevel: 2,
      breadcrumbs: ["All industries", slug],
    }),

  focusDistrict: (slug) =>
    set((state) => ({
      focusedDistrictSlug: slug,
      zoomLevel: 3,
      breadcrumbs: [...state.breadcrumbs, slug],
    })),

  expandDistrict: (slug) => set({ expandedDistrictSlug: slug }),

  selectRole: (slug) => set({ selectedRoleSlug: slug, inspectorOpen: true }),

  setSearchState: (query, matchedIndustrySlugs) =>
    set({ searchQuery: query, searchMatchedIndustrySlugs: matchedIndustrySlugs }),

  clearSearch: () =>
    set({
      searchQuery: "",
      searchMatchedIndustrySlugs: [],
    }),

  setViewport: (viewport) => set({ viewport }),

  resetMap: () =>
    set({
      focusedIndustrySlug: null,
      focusedDistrictSlug: null,
      expandedDistrictSlug: null,
      selectedRoleSlug: null,
      zoomLevel: 1,
      breadcrumbs: ["All industries"],
      inspectorOpen: false,
      searchQuery: "",
      searchMatchedIndustrySlugs: [],
    }),

  addPin: (pin) => set((state) => ({ pins: [...state.pins, pin] })),

  removePin: (id) =>
    set((state) => ({ pins: state.pins.filter((pin) => pin._id !== id) })),

  loadMapData: async () => {
    set({ loading: true, error: null });

    try {
      const { data } = await fetchMapData();

      const serverIndustries = Array.isArray(data?.industries)
        ? (data.industries as Partial<Industry>[])
        : [];
      const hydratedIndustries = serverIndustries
        .map(hydrateIndustry)
        .filter((industry): industry is Industry => industry !== null);

      const serverRoles = Array.isArray(data?.roles)
        ? (data.roles as Partial<Role>[])
        : [];
      const hydratedRoles = serverRoles
        .map(hydrateRole)
        .filter((role): role is Role => role !== null);

      set({
        industries: hydratedIndustries,
        roles: hydratedRoles,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.warn("Map API unavailable. Ensure backend is running.", err);
      set({
        industries: [],
        roles: [],
        loading: false,
        error: "Failed to connect to backend",
      });
    }
  },
}));

export const useFocusedIndustry = () => {
  const { industries, focusedIndustrySlug } = useMapStore();
  return industries.find((industry) => industry.slug === focusedIndustrySlug) ?? null;
};
