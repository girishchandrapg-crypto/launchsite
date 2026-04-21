import { mockEvents } from "@/data/mockEvents";
import type {
  Event,
  EventCategory,
  SortOption,
  ViewMode,
} from "@/types/events";
import { useCallback, useEffect, useRef, useState } from "react";

export interface AuthModal {
  open: boolean;
  mode: "login" | "register";
}

export interface SecurityState {
  rateLimitWarning: boolean;
  inputSanitizeError: boolean;
  checkoutModal: boolean;
  checkoutEventId: string | null;
  reportModal: boolean;
  reportEventId: string | null;
}

export function useEventFinder() {
  const [events] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    EventCategory | "all"
  >("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likedEvents, setLikedEvents] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [cookieConsent, setCookieConsent] = useState<
    "accepted" | "rejected" | null
  >(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("date-newest");
  const [authModal, setAuthModal] = useState<AuthModal>({
    open: false,
    mode: "login",
  });
  const [security, setSecurity] = useState<SecurityState>({
    rateLimitWarning: false,
    inputSanitizeError: false,
    checkoutModal: false,
    checkoutEventId: null,
    reportModal: false,
    reportEventId: null,
  });
  const [mockJWT] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTcwMDAwMDAwMH0.abc123",
  );
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);

  const searchCountRef = useRef(0);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rateLimitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Loading skeleton
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Cookie consent
  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (saved) setCookieConsent(saved as "accepted" | "rejected");
  }, []);

  // Filter + sort logic
  useEffect(() => {
    let result = [...events];

    // Input sanitization check
    const hasXSS = /<script|javascript:/i.test(searchQuery);
    if (hasXSS) {
      setSecurity((s) => ({ ...s, inputSanitizeError: true }));
      setFilteredEvents([]);
      return;
    }
    setSecurity((s) => ({ ...s, inputSanitizeError: false }));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((e) => e.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return b.likeCount - a.likeCount;
        default:
          return 0;
      }
    });

    setFilteredEvents(result);
  }, [events, searchQuery, selectedCategory, sortBy]);

  const handleSearch = useCallback((query: string) => {
    // Rate limiting
    searchCountRef.current += 1;
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      searchCountRef.current = 0;
    }, 2000);

    if (searchCountRef.current > 5) {
      setSecurity((s) => ({ ...s, rateLimitWarning: true }));
      if (rateLimitTimerRef.current) clearTimeout(rateLimitTimerRef.current);
      rateLimitTimerRef.current = setTimeout(() => {
        setSecurity((s) => ({ ...s, rateLimitWarning: false }));
        searchCountRef.current = 0;
      }, 3000);
      return;
    }
    setSearchQuery(query);
  }, []);

  const toggleLike = useCallback((eventId: string) => {
    setLikedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  }, []);

  const openCheckout = useCallback((eventId: string) => {
    setSecurity((s) => ({
      ...s,
      checkoutModal: true,
      checkoutEventId: eventId,
    }));
  }, []);

  const closeCheckout = useCallback(() => {
    setSecurity((s) => ({ ...s, checkoutModal: false, checkoutEventId: null }));
  }, []);

  const openReport = useCallback((eventId: string) => {
    setSecurity((s) => ({ ...s, reportModal: true, reportEventId: eventId }));
  }, []);

  const closeReport = useCallback(() => {
    setSecurity((s) => ({ ...s, reportModal: false, reportEventId: null }));
  }, []);

  const login = useCallback((email: string) => {
    setIsLoggedIn(true);
    setAuthModal({ open: false, mode: "login" });
    setShowEmailVerify(false);
    setEmailVerified(true);
    console.log("Logged in as", email);
  }, []);

  const register = useCallback(() => {
    setAuthModal({ open: false, mode: "login" });
    setShowEmailVerify(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setEmailVerified(false);
  }, []);

  const handleCookieConsent = useCallback((choice: "accepted" | "rejected") => {
    setCookieConsent(choice);
    localStorage.setItem("cookie-consent", choice);
  }, []);

  return {
    events,
    filteredEvents,
    selectedCategory,
    setSelectedCategory,
    selectedEvent,
    setSelectedEvent,
    searchQuery,
    handleSearch,
    isLoggedIn,
    likedEvents,
    toggleLike,
    isLoading,
    cookieConsent,
    handleCookieConsent,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    authModal,
    setAuthModal,
    security,
    openCheckout,
    closeCheckout,
    openReport,
    closeReport,
    login,
    register,
    logout,
    mockJWT,
    profilePrivate,
    setProfilePrivate,
    emailVerified,
    showEmailVerify,
    setShowEmailVerify,
  };
}
