import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  stars: number;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    quote:
      "ApexFlow completely transformed how our team operates. We ship faster, communicate better, and actually enjoy our planning sessions now. It's the tool we didn't know we needed.",
    stars: 5,
    initials: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "CTO",
    company: "Startup.io",
    quote:
      "As a technical leader, I've tried dozens of platforms. ApexFlow stands out because it gets out of the way and lets teams focus on the work. The automation alone saved us 8 hours a week.",
    stars: 5,
    initials: "MR",
  },
  {
    name: "Emily Watson",
    role: "Head of Design",
    company: "AgencyX",
    quote:
      "Our design team went from chaotic handoffs to seamless collaboration overnight. The workflow builder is intuitive, the integrations are rock-solid, and the support is exceptional.",
    stars: 5,
    initials: "EW",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {STAR_KEYS.slice(0, count).map((key) => (
        <Star
          key={key}
          className="w-4 h-4 fill-accent text-accent"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: { testimonial: Testimonial; index: number }) {
  return (
    <Card
      className="shadow-md border-border bg-card flex flex-col gap-4 p-6 rounded-2xl transition-shadow duration-200 hover:shadow-lg"
      data-ocid={`testimonials.card.${index + 1}`}
    >
      <CardContent className="p-0 flex flex-col gap-4 flex-1">
        <StarRating count={testimonial.stars} />
        <blockquote className="text-foreground font-body text-base leading-relaxed flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <div
            className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <span className="text-accent-foreground font-display font-semibold text-sm">
              {testimonial.initials}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-foreground text-sm truncate">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {testimonial.role},{" "}
              <span className="text-accent font-medium">
                {testimonial.company}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-secondary/40"
      data-ocid="testimonials.section"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Loved by Teams Everywhere
          </h2>
          <p className="mt-3 text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Thousands of teams trust ApexFlow to keep their work moving forward.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-ocid="testimonials.list"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
