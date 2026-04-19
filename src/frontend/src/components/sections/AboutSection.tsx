import { motion } from "motion/react";

const stats = [
  { value: "10,000+", label: "Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "50+", label: "Integrations" },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    initials: "SC",
    color: "bg-accent",
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-founder",
    initials: "MR",
    color: "bg-secondary",
  },
  {
    name: "Priya Nair",
    role: "Head of Product",
    initials: "PN",
    color: "bg-muted",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="bg-muted/30 py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              About Us
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Built for <span className="text-accent">Modern Teams</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
              ApexFlow is a streamlined workflow platform designed to help
              fast-moving teams ship faster, collaborate smarter, and eliminate
              operational bottlenecks. Whether you're a startup scaling quickly
              or an enterprise running complex processes, we give you the tools
              to stay aligned and move with confidence.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2021, we've built ApexFlow around a simple belief:
              great software should get out of the way and let people do their
              best work. Our product is built on transparency, speed, and a
              relentless focus on the teams who depend on it every day.
            </p>
          </motion.div>

          {/* Right: Stats + Team */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="space-y-10"
          >
            {/* Stats */}
            <div
              data-ocid="about.stats.list"
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  data-ocid={`about.stats.item.${i + 1}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-5 text-center shadow-sm"
                >
                  <p className="font-display text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Team */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">
                Our Team
              </p>
              <div
                data-ocid="about.team.list"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {team.map((member, i) => (
                  <motion.div
                    key={member.name}
                    data-ocid={`about.team.item.${i + 1}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.3 + i * 0.1 }}
                    className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center gap-3 shadow-sm"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center`}
                    >
                      <span className="font-display font-bold text-sm text-foreground">
                        {member.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm leading-tight">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
