import { CategoryChips } from "@/components/events/CategoryChips";
import { EventGrid } from "@/components/events/EventGrid";
import {
  FiltersSidebar,
  defaultFilters,
} from "@/components/events/FiltersSidebar";
import type { FiltersState } from "@/components/events/FiltersSidebar";
import { HeroSection } from "@/components/events/HeroSection";
import { SortFilterBar } from "@/components/events/SortFilterBar";
import { AppFooter } from "@/components/layout/AppFooter";
import { Navbar } from "@/components/layout/Navbar";
import { AuthModal } from "@/components/modals/AuthModal";
import { CheckoutModal } from "@/components/modals/CheckoutModal";
import { EventDetailModal } from "@/components/modals/EventDetailModal";
import { ReportModal } from "@/components/modals/ReportModal";
import { FeaturedOrganizers } from "@/components/sections/FeaturedOrganizers";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { YouMightLike } from "@/components/sections/YouMightLike";
import { Button } from "@/components/ui/button";
import { useEventFinder } from "@/hooks/useEventFinder";
import type { SortOption } from "@/types/events";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

// Email Verify Banner (inline — small, single-use)
function EmailVerifyBanner({
  onResend,
  onDismiss,
}: { onResend: () => void; onDismiss: () => void }) {
  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm rounded-2xl border border-accent/30 p-5 animate-fade-in-up"
      style={{
        background: "rgba(10,10,26,0.97)",
        backdropFilter: "blur(16px)",
      }}
      data-ocid="email_verify.banner"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-foreground mb-1">
            📧 Check your inbox
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            We sent a verification link to your email.
          </p>
          <button
            type="button"
            className="text-xs text-accent underline hover:text-accent/80 transition-smooth"
            onClick={onResend}
            data-ocid="email_verify.resend_button"
          >
            Resend email
          </button>
        </div>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition-smooth"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Cookie Consent Banner (inline — single-use)
function CookieBanner({
  onAccept,
  onReject,
}: { onAccept: () => void; onReject: () => void }) {
  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40 rounded-2xl border border-border/30 p-5 animate-fade-in-up"
      style={{
        background: "rgba(10,10,26,0.97)",
        backdropFilter: "blur(16px)",
      }}
      data-ocid="cookie.banner"
    >
      <h4 className="text-sm font-bold text-foreground mb-1">
        🍪 We use cookies
      </h4>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        We use cookies to improve your experience, show relevant events, and
        analyze traffic.
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="flex-1 text-xs border-border/30"
          onClick={onReject}
          data-ocid="cookie.reject_button"
        >
          Reject
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="flex-1 text-xs border-border/30"
          data-ocid="cookie.customize_button"
        >
          Customize
        </Button>
        <Button
          type="button"
          size="sm"
          className="flex-1 text-xs gradient-hero text-white border-0"
          onClick={onAccept}
          data-ocid="cookie.accept_button"
        >
          Accept All
        </Button>
      </div>
    </div>
  );
}

// Rate limit toast (inline — small, single-use)
function RateLimitToast({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="fixed top-20 right-4 z-50 rounded-xl border border-destructive/30 px-4 py-3 animate-fade-in-up flex items-center gap-2"
      style={{
        background: "rgba(10,10,26,0.97)",
        backdropFilter: "blur(16px)",
      }}
      data-ocid="rate_limit.toast"
    >
      <span className="text-lg">🚫</span>
      <p className="text-sm font-semibold text-destructive">
        Slow down! Too many requests
      </p>
    </div>
  );
}

export function EventFinderApp() {
  const {
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
    showEmailVerify,
    setShowEmailVerify,
    events,
  } = useEventFinder();

  const [filtersState, setFiltersState] =
    useState<FiltersState>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const checkoutEvent = security.checkoutEventId
    ? (events.find((e) => e.id === security.checkoutEventId) ?? null)
    : null;

  const categoryLabel =
    selectedCategory === "all"
      ? "All Events"
      : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Events`;

  const handleClearFilters = () => {
    handleSearch("");
    setSelectedCategory("all");
    setFiltersState(defaultFilters);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a1a" }}>
      {/* 1. Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onAuthOpen={setAuthModal}
        onLogout={logout}
        mockJWT={mockJWT}
        profilePrivate={profilePrivate}
        onTogglePrivacy={setProfilePrivate}
      />

      {/* 2. Hero */}
      <HeroSection
        searchQuery={searchQuery}
        onSearch={handleSearch}
        inputSanitizeError={security.inputSanitizeError}
        rateLimitWarning={security.rateLimitWarning}
      />

      {/* 3. Stats Bar */}
      <StatsBar />

      {/* 4. Category chips */}
      <CategoryChips
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* 5. Trending Section */}
      <TrendingSection onSelectEvent={setSelectedEvent} />

      {/* 6. Main Events Layout: Sidebar + Grid */}
      <section id="explore" className="py-8 px-4 max-w-7xl mx-auto">
        {/* Mobile filter toggle */}
        <div className="lg:hidden flex justify-end mb-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-border/30 gap-2"
            onClick={() => setMobileFiltersOpen(true)}
            data-ocid="filters.open_modal_button"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="flex gap-6 items-start">
          <FiltersSidebar
            filters={filtersState}
            onChange={setFiltersState}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <div className="flex-1 min-w-0">
            <SortFilterBar
              sortBy={sortBy as SortOption}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              resultCount={filteredEvents.length}
              selectedCategoryLabel={categoryLabel}
            />

            <EventGrid
              events={filteredEvents}
              isLoading={isLoading}
              viewMode={viewMode}
              likedEvents={likedEvents}
              onLike={toggleLike}
              onSelect={setSelectedEvent}
              onTicket={openCheckout}
              onReport={openReport}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </section>

      {/* 7. You Might Like */}
      <YouMightLike
        likedEvents={likedEvents}
        onLike={toggleLike}
        onSelectEvent={setSelectedEvent}
        onTicket={openCheckout}
        onReport={openReport}
      />

      {/* 8. Featured Organizers */}
      <FeaturedOrganizers />

      {/* 9. Newsletter */}
      <NewsletterSection />

      {/* Post Event CTA */}
      <section
        id="post-event"
        className="py-20 px-4"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl font-black text-foreground mb-4">
            Hosting an event?{" "}
            <span className="text-gradient">Get Discovered.</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            List your event in front of 3.2M+ event lovers across India. Free
            for community events.
          </p>
          <Button
            type="button"
            size="lg"
            className="gradient-hero text-white border-0 hover:opacity-90 font-bold text-base px-8"
            onClick={() => setAuthModal({ open: true, mode: "register" })}
            data-ocid="cta.post_event_button"
          >
            Post Your Event →
          </Button>
        </div>
      </section>

      {/* 10. Footer */}
      <AppFooter />

      {/* ── Overlays ── */}

      {/* Auth Modal */}
      {authModal.open && (
        <AuthModal
          mode={authModal.mode}
          onClose={() => setAuthModal({ open: false, mode: "login" })}
          onLogin={login}
          onRegister={register}
          mockJWT={mockJWT}
          isLoggedIn={isLoggedIn}
        />
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onTicket={(id) => {
            setSelectedEvent(null);
            openCheckout(id);
          }}
          onReport={(id) => {
            setSelectedEvent(null);
            openReport(id);
          }}
        />
      )}

      {/* Checkout Modal */}
      {security.checkoutModal && (
        <CheckoutModal event={checkoutEvent} onClose={closeCheckout} />
      )}

      {/* Report Modal */}
      {security.reportModal && (
        <ReportModal onClose={closeReport} eventId={security.reportEventId} />
      )}

      {/* Cookie Consent */}
      {cookieConsent === null && (
        <CookieBanner
          onAccept={() => handleCookieConsent("accepted")}
          onReject={() => handleCookieConsent("rejected")}
        />
      )}

      {/* Email Verification Banner */}
      {showEmailVerify && (
        <EmailVerifyBanner
          onResend={() => {}}
          onDismiss={() => setShowEmailVerify(false)}
        />
      )}

      {/* Rate Limit Toast */}
      <RateLimitToast visible={security.rateLimitWarning} />
    </div>
  );
}
