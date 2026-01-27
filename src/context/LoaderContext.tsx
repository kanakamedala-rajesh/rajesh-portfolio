"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useCallback,
  ReactNode,
} from "react";

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasHydrated: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

/**
 * Hook to safely detect if we're on the client after hydration.
 * Uses useSyncExternalStore to avoid hydration mismatches.
 */
function useHasHydrated(): boolean {
  const subscribe = useCallback(() => () => {}, []);
  const getSnapshot = useCallback(() => true, []);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Check if visitor has been here before (only call on client).
 */
function isReturningVisitor(): boolean {
  try {
    return sessionStorage.getItem("rk_portfolio_visited") === "true";
  } catch {
    return false;
  }
}

export function LoaderProvider({ children }: { children: ReactNode }) {
  const hasHydrated = useHasHydrated();

  // Compute initial loading state based on hydration and visitor status
  // On server: always true (show loader structure for SSR)
  // On client: true if first visit, false if returning visitor
  const [isLoading, setIsLoading] = useState(true);

  // Derive the actual loading state - skip loader for returning visitors after hydration
  const effectiveIsLoading = hasHydrated
    ? isReturningVisitor()
      ? false
      : isLoading
    : isLoading;

  return (
    <LoaderContext.Provider
      value={{ isLoading: effectiveIsLoading, setIsLoading, hasHydrated }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
