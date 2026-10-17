import { useState, type FormEvent } from 'react';
import { profile } from '../data/content';
import SplitHeading from '../components/SplitHeading';
import PixelButton from '../components/PixelButton';

/**
 * Contact as an interactive console. It's a real, accessible <form> underneath:
 * proper <label>s, validation, and keyboard support. On submit it composes a
 * mailto: draft (no backend needed to deploy) and echoes a terminal-style
 * confirmation. Errors speak plainly and say how to fix the problem.
 */
export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Add your name so I know who I\'m replying to.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError('That email doesn\'t look right — check the format and try again.');
    if (message.trim().length < 4) return setError('Add a line or two about what you need.');

    setError(null);
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative border-t border-white/10 bg-panel/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-28 sm:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-blood">Contact</span>
          <SplitHeading
            text="Let's build something interpretable."
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-blood-fade sm:text-4xl"
          />
          <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-white/70">
            Open to AI/ML roles, collaborations, and interesting problems. The
            fastest way to reach me is below — or straight to my inbox.
          </p>
          <div className="mt-8 flex flex-col gap-3 font-mono text-sm">
            <a href={`mailto:${profile.email}`} data-cursor="link" className="text-white/80 hover:text-blood">
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer noopener" data-cursor="link" className="text-white/80 hover:text-blood">
              github.com/Ritikrupam ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" data-cursor="link" className="text-white/80 hover:text-blood">
              linkedin.com/in/ritik-rupam-nanda ↗
            </a>
          </div>
        </div>

        {/* Console */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden border border-white/15 bg-ink/80 shadow-glow-red">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-blood" />
              <span className="h-3 w-3 rounded-full bg-white/30" />
              <span className="h-3 w-3 rounded-full bg-white/30" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-white/50">
                contact — bash — ritik@portfolio
              </span>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6 font-mono text-sm" noValidate>
              <Field id="name" label="~/name" value={name} onChange={setName}
                placeholder="Ada Lovelace" autoComplete="name" />
              <Field id="email" label="~/email" value={email} onChange={setEmail}
                placeholder="you@company.com" type="email" autoComplete="email" />

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-blood">~/message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell me what you're building…"
                  className="resize-none border border-white/15 bg-black/40 px-3 py-2 text-white placeholder-white/25 outline-none focus:border-blood"
                />
              </div>

              <div aria-live="polite" className="min-h-[1.25rem] text-xs">
                {error && <span className="text-blood">! {error}</span>}
                {sent && !error && (
                  <span className="text-green-400">✓ Draft opened in your mail client. Talk soon.</span>
                )}
              </div>

              <div>
                <PixelButton type="submit" ariaLabel="Send message">
                  Send message →
                </PixelButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id, label, value, onChange, placeholder, type = 'text', autoComplete,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-blood">{label}</label>
      <div className="flex items-center gap-2 border border-white/15 bg-black/40 px-3 py-2 focus-within:border-blood">
        <span className="text-white/30">$</span>
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder-white/25 outline-none"
        />
      </div>
    </div>
  );
}
