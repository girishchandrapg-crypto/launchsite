import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$9",
    period: "/mo",
    description: "Perfect for individuals and small projects getting started.",
    features: [
      "Up to 3 projects",
      "5 GB storage",
      "Basic analytics dashboard",
      "Email support",
      "API access (1k req/day)",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "The complete toolkit for growing teams and businesses.",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Advanced analytics & reports",
      "Priority support (24h SLA)",
      "API access (100k req/day)",
    ],
    cta: "Get Started",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions with dedicated support for large orgs.",
    features: [
      "Unlimited everything",
      "1 TB+ storage",
      "Custom integrations & SSO",
      "Dedicated account manager",
      "SLA guarantee + audit logs",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
        <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
      </span>
      <span className="text-sm leading-snug text-foreground/75">{text}</span>
    </li>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  const ocidBase = `pricing.${plan.name.toLowerCase()}`;

  return (
    <div
      data-ocid={`${ocidBase}.card`}
      className={[
        "relative flex flex-col rounded-2xl transition-all duration-300",
        plan.highlighted
          ? "border-2 border-accent shadow-[0_8px_40px_-8px_oklch(0.54_0.16_180/0.35)] scale-[1.03] bg-card z-10"
          : "border border-border bg-card shadow-sm hover:shadow-md",
      ].join(" ")}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge
            data-ocid={`${ocidBase}.badge`}
            className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-0.5 shadow-sm"
          >
            {plan.badge}
          </Badge>
        </div>
      )}

      <CardHeader
        className={["pt-8 pb-4 px-7", plan.badge ? "pt-9" : ""].join(" ")}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          {plan.name}
        </p>
        <div className="flex items-end gap-1 mb-2">
          {plan.price === "Custom" ? (
            <span className="font-display text-4xl font-bold text-foreground leading-none">
              Custom
            </span>
          ) : (
            <>
              <span className="font-display text-4xl font-bold text-foreground leading-none">
                {plan.price}
              </span>
              <span className="mb-1 text-sm text-muted-foreground font-medium">
                {plan.period}
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {plan.description}
        </p>
      </CardHeader>

      <CardContent className="px-7 pb-7 flex flex-col flex-1">
        <ul
          className="space-y-3 mb-8 flex-1"
          data-ocid={`${ocidBase}.features`}
        >
          {plan.features.map((feature) => (
            <FeatureItem key={feature} text={feature} />
          ))}
        </ul>

        <Button
          data-ocid={`${ocidBase}.cta_button`}
          asChild
          className={[
            "w-full font-semibold transition-all duration-200",
            plan.highlighted
              ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-md"
              : "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
          ].join(" ")}
          size="lg"
        >
          <a href="#contact">{plan.cta}</a>
        </Button>
      </CardContent>
    </div>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      data-ocid="pricing.section"
      className="py-24 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Pricing
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            No hidden fees. No surprise invoices. Pick the plan that fits your
            team and scale anytime.
          </p>
        </div>

        {/* Cards grid */}
        <div
          data-ocid="pricing.list"
          className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-4"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          All plans include a{" "}
          <span className="font-medium text-foreground">14-day free trial</span>
          . No credit card required.
        </p>
      </div>
    </section>
  );
}
