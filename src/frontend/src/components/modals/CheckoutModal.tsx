import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Event } from "@/types/events";
import { CheckCircle, Lock, Minus, Plus, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  event: Event | null;
  onClose: () => void;
}

export function CheckoutModal({ event, onClose }: Props) {
  const [ticketCount, setTicketCount] = useState(1);
  const [cardNum, setCardNum] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const maskedDisplay =
    cardNum.length > 0
      ? `•••• •••• •••• ${cardNum.slice(-4).padStart(4, "·")}`
      : "•••• •••• •••• 4242";

  const total = event ? (event.isFree ? 0 : event.price * ticketCount) : 0;

  const handlePay = () => {
    if (!event?.isFree && (!cardNum || !holder || !expiry || !cvv)) return;
    setPaid(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="checkout.dialog"
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close"
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-border/30 z-10 animate-fade-in-up overflow-hidden"
        style={{
          background: "rgba(10,10,26,0.99)",
          backdropFilter: "blur(24px)",
        }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-smooth"
          onClick={onClose}
          data-ocid="checkout.close_button"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {paid ? (
          <div className="p-8 text-center" data-ocid="checkout.success_state">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="font-display text-2xl font-black text-foreground mb-2">
              Booking Confirmed! 🎉
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {ticketCount} ticket{ticketCount > 1 ? "s" : ""} for{" "}
              <span className="text-foreground font-semibold">
                {event?.title}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Check your email for the tickets. See you there!
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Secure header */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/20">
              <Lock className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-sm font-bold text-green-400">
                Secure Checkout
              </span>
              <Badge
                variant="outline"
                className="ml-auto text-xs border-green-500/30 text-green-400 bg-green-500/10"
              >
                🔒 SSL ✓
              </Badge>
            </div>

            {/* Event summary */}
            <div className="mb-5">
              <h3 className="font-display text-base font-bold text-foreground line-clamp-1">
                {event?.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {event?.city} · {event?.date}
              </p>
            </div>

            {/* Ticket count */}
            <div
              className="flex items-center justify-between mb-5 p-3 rounded-xl border border-border/20"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span className="text-sm text-foreground font-medium">
                Tickets
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/60 transition-smooth disabled:opacity-40"
                  onClick={() => setTicketCount((c) => Math.max(1, c - 1))}
                  disabled={ticketCount <= 1}
                  data-ocid="checkout.ticket_minus_button"
                  aria-label="Remove ticket"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-base font-bold text-foreground w-4 text-center">
                  {ticketCount}
                </span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/60 transition-smooth disabled:opacity-40"
                  onClick={() => setTicketCount((c) => Math.min(10, c + 1))}
                  disabled={ticketCount >= 10}
                  data-ocid="checkout.ticket_plus_button"
                  aria-label="Add ticket"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <span className="text-sm font-bold text-gradient">
                {event?.isFree ? "Free" : `₹${total.toLocaleString("en-IN")}`}
              </span>
            </div>

            {/* Payment form */}
            {!event?.isFree && (
              <div className="space-y-3 mb-5">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5 font-mono">
                    Card Number
                  </p>
                  <Input
                    type="text"
                    placeholder="Enter card number"
                    maxLength={16}
                    value={cardNum}
                    onChange={(e) =>
                      setCardNum(e.target.value.replace(/\D/g, ""))
                    }
                    className="bg-muted/10 border-border/30 font-mono"
                    data-ocid="checkout.card_input"
                  />
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {maskedDisplay}
                  </p>
                </div>
                <Input
                  type="text"
                  placeholder="Cardholder name"
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  className="bg-muted/10 border-border/30"
                  data-ocid="checkout.holder_input"
                />
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="bg-muted/10 border-border/30 font-mono"
                    data-ocid="checkout.expiry_input"
                  />
                  <Input
                    type="password"
                    placeholder="CVV"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="bg-muted/10 border-border/30 font-mono w-24"
                    data-ocid="checkout.cvv_input"
                  />
                </div>
              </div>
            )}

            {/* Pay button */}
            <Button
              type="button"
              className="w-full gradient-hero text-white border-0 hover:opacity-90 font-bold text-base py-5 mb-4"
              onClick={handlePay}
              data-ocid="checkout.confirm_button"
            >
              <Lock className="w-4 h-4 mr-2" />
              {event?.isFree
                ? "Reserve Free Spot"
                : `Pay ₹${total.toLocaleString("en-IN")}`}
            </Button>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {[
                { icon: ShieldCheck, label: "SSL Encrypted" },
                { icon: Lock, label: "PCI Compliant" },
                { icon: CheckCircle, label: "Secure Payment" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                >
                  <Icon className="w-3.5 h-3.5 text-green-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
