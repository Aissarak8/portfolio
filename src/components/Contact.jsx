import { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { profile } from '../data/profile';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // No backend needed: open the user's mail client with a prefilled message.
  // Swap for Formspree / EmailJS / a serverless function when you want real delivery.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section id="contact" className="section-pad">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        subtitle="Have a project, role or idea? I'm open to internships, freelance and collaborations."
      />

      <div className="grid gap-10 md:grid-cols-2">
        {/* Info */}
        <Reveal>
          <h3 className="text-2xl font-bold">Get in touch</h3>
          <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
            The fastest way to reach me is email. I usually reply within a day.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={profile.socials.email}
              className="glass flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
            >
              <span className="bg-brand-500/10 text-brand-500 grid h-11 w-11 place-items-center rounded-xl">
                <Mail size={20} />
              </span>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="font-medium">{profile.email}</div>
              </div>
            </a>

            <div className="glass flex items-center gap-4 rounded-2xl p-4">
              <span className="bg-brand-500/10 text-brand-500 grid h-11 w-11 place-items-center rounded-xl">
                <MapPin size={20} />
              </span>
              <div>
                <div className="text-sm text-gray-400">Location</div>
                <div className="font-medium">{profile.location}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="glass hover:text-brand-500 grid h-11 w-11 place-items-center rounded-xl"
            >
              <Github size={20} />
            </a>
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass hover:text-brand-500 grid h-11 w-11 place-items-center rounded-xl"
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6">
            {sent && (
              <div className="flex items-center gap-2 rounded-xl bg-green-500/10 p-3 text-sm text-green-500">
                <CheckCircle2 size={18} /> Thanks! Your mail client should now be open.
              </div>
            )}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={onChange}
                className="focus:ring-brand-500/40 w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 dark:border-white/10"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                className="focus:ring-brand-500/40 w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 dark:border-white/10"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={onChange}
                className="focus:ring-brand-500/40 w-full resize-none rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 dark:border-white/10"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="from-brand-500 to-accent-500 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
