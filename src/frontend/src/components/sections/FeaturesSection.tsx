import {
  BarChart3,
  HeadphonesIcon,
  Puzzle,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Rocket,
    title: "Fast Deployment",
    description:
      "Ship your product in minutes, not months. One-click deploys with instant rollbacks keep your team moving fast.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Real-time insights into your users, revenue, and performance — all in a single, intuitive dashboard.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite teammates, assign roles, and work together seamlessly with shared workspaces and live editing.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description:
      "End-to-end encryption, SOC 2 compliance, and automatic security patches so you can focus on building.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our expert support team is available around the clock via chat and email to help you succeed.",
  },
  {
    icon: Puzzle,
    title: "Easy Integrations",
    description:
      "Connect your favorite tools — Slack, GitHub, Stripe, and 100+ more — in just a few clicks.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      data-ocid="features.section"
      className="py-24 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-accent mb-3 font-body">
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            ApexFlow brings together the tools and insights modern teams need to
            build faster, collaborate smarter, and grow confidently.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          data-ocid="features.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      data-ocid={`features.item.${index + 1}`}
      className="group bg-card rounded-xl border border-border p-7 shadow-sm hover:shadow-elevated hover:-translate-y-1 transition-smooth cursor-default"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      {/* Icon badge */}
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-accent/10 text-accent mb-5 group-hover:bg-accent/20 transition-smooth">
        <Icon size={22} strokeWidth={1.75} />
      </div>

      {/* Content */}
      <h3 className="font-display text-lg font-bold text-foreground mb-2">
        {feature.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}
