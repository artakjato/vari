import { create } from 'zustand';
import type { Industry, Role, Pin } from '../lib/types';

interface MapState {
  industries: Industry[];
  roles: Role[];
  loading: boolean,
  error: string | null;

  /*Map navigation state */
  zoomLevel: 1 | 2 | 3; 
  focusedIndustrySlug: string | null;
  focusedDistrictSlug: string | null;
  selectedRoleSlug: string | null;
  inspectorOpen: boolean;
  breadcrumbs: string[]; 

  /*User and personalization */
  currentUser: { email: string; displayName: string } | null;
  pins: Pin[];

  /*Funstions that modify state */
  setZoomLevel: (level: 1 | 2 | 3) => void; 
  focusIndustry: (slug: string) => void;
  focusDistrict: (slug: string) => void;
  selectRole: (slug: string) => void;
  resetMap: () => void;
  addPin: (pin: Pin) => void;
  removePin: (id: string) => void;
}

export const useMapStore = create<MapState>((set) => ({
  /*Initial state values*/
industries: [],
roles: [],
loading: false,
error: null,
zoomLevel: 1,
focusedIndustrySlug: null,
focusedDistrictSlug: null,
selectedRoleSlug: null,
inspectorOpen: false,
breadcrumbs: ['All Industries'],
currentUser: null,
pins: [],

/*Action implementation*/
setZoomLevel: (level) => set({ zoomLevel: level }),
focusIndustry: (slug) => set({
  focusedIndustrySlug: slug,
  zoomLevel: 2,
  breadcrumbs: ['All Industries', slug],
}),
focusDistrict: (slug) => set((state) => ({
  focusedIndustrySlug: slug,
  zoomLevel: 3,
  breadcrumbs: [...state.breadcrumbs, slug],
})), 
selectRole: (slug) => set({ selectedRoleSlug: slug, inspectorOpen: true }),
resetMap: () => set ({
  focusedIndustrySlug: null,
  focusedDistrictSlug: null,
  zoomLevel: 1,
  breadcrumbs: ['All industries'],
  inspectorOpen: false, 
}), 
addPin: (pin) => set((state) => ({ pins: [...state.pins, pin] })), 
removePin: (id) => set((state) => ({ pins: state.pins.filter(p => p._id !==id)})),
})); 

export const useFocusedIndustry = () => {
  const { industries, focusedIndustrySlug } = useMapStore();
  return industries.find(i => i.slug === focusedIndustrySlug) ?? null;
}; 
