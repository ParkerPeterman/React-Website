import { useRef, useState } from 'react';
import useReveal from '../lib/useReveal';
import { identity } from '../data/site';
import './Contact.css';

const ENDPOINT = 'https://formspree.io/f/xlgoajez';

export default function Contact() {
  const root = useRef(null);
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  useReveal(root);

  // Submit over fetch so the visitor is never bounced off the page.
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setState('sent');
    } catch {
      setState('error');
    }
  };

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="marker shell">
        <span className="mono">06 — Contact</span>
        <span className="marker__rule" />
      </div>

      <div className="contact__inner shell">
        <h2 className="contact__heading">
          <span className="reveal-line">
            <span>Let's</span>
          </span>
          <span className="reveal-line">
            <span className="contact__accent">talk</span>
          </span>
        </h2>

        <div className="contact__cols">
          <div className="contact__direct">
            <p className="mono" data-rise>
              Direct
            </p>
            <a className="contact__email" href={`mailto:${identity.email}`} data-rise data-cursor="mail">
              {identity.email}
            </a>
            <p className="contact__phone mono" data-rise>
              {identity.phone} · {identity.location}
            </p>

            <ul className="contact__social" data-rise>
              <li>
                <a href={identity.github} target="_blank" rel="noopener noreferrer" data-cursor>
                  GitHub
                </a>
              </li>
              <li>
                <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" data-cursor>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <form className="contact__form" onSubmit={onSubmit} data-rise>
            <div className="contact__field">
              <label htmlFor="email" className="mono">
                Your email
              </label>
              <input type="email" id="email" name="email" required placeholder="you@company.com" />
            </div>

            <div className="contact__field">
              <label htmlFor="message" className="mono">
                Message
              </label>
              <textarea id="message" name="message" rows="5" required placeholder="What are you building?" />
            </div>

            <button
              type="submit"
              className="contact__submit"
              disabled={state === 'sending'}
              data-cursor
            >
              {state === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            <p className="contact__status mono" role="status" aria-live="polite">
              {state === 'sent' && 'Message sent — I\'ll be in touch.'}
              {state === 'error' && `Something went wrong. Email me directly at ${identity.email}.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
