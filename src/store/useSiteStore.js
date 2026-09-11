import { create } from "zustand";

export const useSiteStore = create((set) => ({
  services: [],
  industries: [],
  solutions: [],
  caseStudies: [],
  servicesLoaded: false,
  industriesLoaded: false,
  solutionsLoaded: false,
  caseStudiesLoaded: false,
  setServices: (services) => set({ services: Array.isArray(services) ? services : [], servicesLoaded: true }),
  setIndustries: (industries) => set({ industries: Array.isArray(industries) ? industries : [], industriesLoaded: true }),
  setSolutions: (solutions) => set({ solutions: Array.isArray(solutions) ? solutions : [], solutionsLoaded: true }),
  setCaseStudies: (caseStudies) => set({ caseStudies: Array.isArray(caseStudies) ? caseStudies : [], caseStudiesLoaded: true }),
  hydrate: ({ services = [], industries = [], solutions = [], caseStudies = [] } = {}) => set({
    services: Array.isArray(services) ? services : [],
    industries: Array.isArray(industries) ? industries : [],
    solutions: Array.isArray(solutions) ? solutions : [],
    caseStudies: Array.isArray(caseStudies) ? caseStudies : [],
    servicesLoaded: true,
    industriesLoaded: true,
    solutionsLoaded: true,
    caseStudiesLoaded: true,
  }),
}));
