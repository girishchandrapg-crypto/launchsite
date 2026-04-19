import { useSubmitContact } from "@/hooks/useContact";
import type { ContactFormData } from "@/types";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";

function validate(
  data: ContactFormData,
): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormData, boolean>>
  >({});
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const { mutate, isPending, error } = useSubmitContact();

  function handleBlur(field: keyof ContactFormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(fields);
    setFieldErrors(errs);
  }

  function handleChange(field: keyof ContactFormData, value: string) {
    const updated = { ...fields, [field]: value };
    setFields(updated);
    if (touched[field]) {
      setFieldErrors(validate(updated));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    mutate(fields, {
      onSuccess: () => {
        setSubmitted(true);
        setFields({ name: "", email: "", message: "" });
        setTouched({});
        setFieldErrors({});
      },
    });
  }

  function handleReset() {
    setSubmitted(false);
  }

  const inputClass = (field: keyof ContactFormData) =>
    `h-11 rounded-lg border px-4 text-sm font-body bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:ring-2 focus:ring-accent/40 focus:border-accent ${
      fieldErrors[field]
        ? "border-destructive focus:ring-destructive/30"
        : "border-input"
    }`;

  return (
    <section
      id="contact"
      className="py-24 bg-secondary/30"
      data-ocid="contact.section"
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 font-body">
            Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Get in Touch
          </h2>
          <p className="mt-4 text-muted-foreground font-body text-lg max-w-md mx-auto">
            Have a question or want to work together? We'd love to hear from
            you.
          </p>
        </div>

        {/* Form card */}
        <div
          className="mx-auto max-w-[600px] bg-card rounded-2xl border border-border shadow-sm p-8 md:p-10"
          data-ocid="contact.card"
        >
          {submitted ? (
            <SuccessCard onReset={handleReset} />
          ) : (
            <form onSubmit={handleSubmit} noValidate data-ocid="contact.form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground font-body"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={fields.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    data-ocid="contact.name_input"
                    className={inputClass("name")}
                  />
                  {fieldErrors.name && (
                    <p
                      className="text-xs text-destructive font-body mt-0.5"
                      data-ocid="contact.name_input.field_error"
                    >
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground font-body"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    value={fields.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    data-ocid="contact.email_input"
                    className={inputClass("email")}
                  />
                  {fieldErrors.email && (
                    <p
                      className="text-xs text-destructive font-body mt-0.5"
                      data-ocid="contact.email_input.field_error"
                    >
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 mb-6">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground font-body"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us how we can help…"
                  value={fields.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  data-ocid="contact.message_textarea"
                  className={`rounded-lg border px-4 py-3 text-sm font-body bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 resize-none focus:ring-2 focus:ring-accent/40 focus:border-accent ${
                    fieldErrors.message
                      ? "border-destructive focus:ring-destructive/30"
                      : "border-input"
                  }`}
                />
                {fieldErrors.message && (
                  <p
                    className="text-xs text-destructive font-body mt-0.5"
                    data-ocid="contact.message_textarea.field_error"
                  >
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                data-ocid="contact.submit_button"
                className="w-full h-12 rounded-lg bg-accent text-accent-foreground font-display font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span data-ocid="contact.loading_state">Sending…</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Mutation error */}
              {error && (
                <p
                  className="mt-4 text-sm text-destructive text-center font-body"
                  data-ocid="contact.error_state"
                >
                  {error.message ?? "Something went wrong. Please try again."}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="flex flex-col items-center text-center py-10 px-4 gap-5"
      data-ocid="contact.success_state"
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-accent" strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          Message sent!
        </h3>
        <p className="text-muted-foreground font-body text-base">
          We'll get back to you within 24 hours.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        data-ocid="contact.reset_button"
        className="mt-2 text-sm text-accent font-body font-medium underline underline-offset-4 hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        Send another message
      </button>
    </div>
  );
}
