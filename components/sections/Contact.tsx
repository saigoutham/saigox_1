"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Mail, Linkedin, Phone, Send, CheckCircle } from "lucide-react";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mzzbqzpn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setTimeout(() => {
          setStatus("idle");
          setName("");
          setEmail("");
          setMessage("");
        }, 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-2xl">
        {/* Section header */}
        <ScrollReveal>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
            Get in Touch
          </p>
          <h2 className="mb-4 font-sans text-3xl font-bold text-text-primary md:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mb-12 text-sm text-text-secondary">
            Have a role, project, or collaboration in mind? I&apos;d love to
            hear from you.
          </p>
        </ScrollReveal>

        {/* Contact form */}
        <ScrollReveal>
          <GlassCard rarity="rare" tilt={false} className="mb-12 p-6 md:p-8">
            {status === "sent" ? (
              <div className="flex flex-col items-center py-8">
                <CheckCircle size={48} className="mb-4 text-green" />
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-green">
                  Message Sent
                </h3>
                <p className="text-sm text-text-muted">
                  Thanks! I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your opportunity..."
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-border bg-bg-elevated px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 font-mono text-sm uppercase tracking-wider text-bg transition-all hover:bg-accent/90 disabled:opacity-50"
                >
                  <Send size={14} />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </MagneticButton>

                {status === "error" && (
                  <p className="text-center text-xs text-red">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            )}
          </GlassCard>
        </ScrollReveal>

        {/* Direct links */}
        <ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href="mailto:saigoutham.vaddi@gmail.com"
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-card/30 p-4 transition-all hover:border-accent/30 focus-visible:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            >
              <Mail size={18} className="text-accent" aria-hidden="true" />
              <div>
                <div className="font-mono text-xs text-text-primary">Email</div>
                <div className="font-mono text-[10px] text-text-muted">
                  saigoutham.vaddi@gmail.com
                </div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/saigouthamvaddi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-card/30 p-4 transition-all hover:border-accent/30 focus-visible:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            >
              <Linkedin size={18} className="text-accent" aria-hidden="true" />
              <div>
                <div className="font-mono text-xs text-text-primary">
                  LinkedIn
                </div>
                <div className="font-mono text-[10px] text-text-muted">
                  /in/saigouthamvaddi
                </div>
              </div>
            </a>

            <a
              href="tel:+919494140609"
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-card/30 p-4 transition-all hover:border-accent/30 focus-visible:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            >
              <Phone size={18} className="text-accent" aria-hidden="true" />
              <div>
                <div className="font-mono text-xs text-text-primary">Phone</div>
                <div className="font-mono text-[10px] text-text-muted">
                  +91 9494140609
                </div>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
