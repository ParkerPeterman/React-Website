import { useEffect, useRef, useState } from 'react';
import { identity } from '../data/site';
import './ContactSheet.css';

const ENDPOINT = 'https://formspree.io/f/xlgoajez';
const DRAFT_KEY = 'contact-draft';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = { email: '', message: '' };

function check(name, value) {
  const v = value.trim();
  if (name === 'email') {
    if (!v) return 'Add an email address so I can reply.';
    if (!EMAIL_RE.test(v)) return 'Use an address like name@company.com.';
  }
  if (name === 'message' && !v) return 'Add a short message.';
  return '';
}

function readDraft() {
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    return d && typeof d === 'object' ? { ...EMPTY, ...d } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export default function ContactSheet({ sheet, of }) {
  const [values, setValues] = useState(readDraft);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const fields = { email: useRef(null), message: useRef(null) };

  // Keep the draft through a refresh or an accidental navigation.
  useEffect(() => {
    try {
      if (values.email || values.message) localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      else localStorage.removeItem(DRAFT_KEY);
    } catch {
      // Storage blocked: the form still works, the draft just won't persist.
    }
  }, [values]);

  // Validate on the first blur; clear as soon as the visitor edits the field.
  const onBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (state === 'sent' || state === 'error') setState('idle');
  };

  // Submit over fetch so the visitor is never bounced off the page.
  const onSubmit = async (e) => {
    e.preventDefault();
    const next = { email: check('email', values.email), message: check('message', values.message) };
    setErrors(next);
    const first = ['email', 'message'].find((k) => next[k]);
    if (first) {
      fields[first].current?.focus();
      return;
    }

    setState('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Request failed');
      setValues(EMPTY);
      setState('sent');
    } catch {
      setState('error');
    }
  };

  const field = (name, label, input) => (
    <div className="field">
      <label htmlFor={`c-${name}`}>{label}</label>
      {input({
        id: `c-${name}`,
        name,
        ref: fields[name],
        value: values[name],
        onChange,
        onBlur,
        'aria-invalid': errors[name] ? 'true' : undefined,
        'aria-describedby': errors[name] ? `c-${name}-err` : undefined,
      })}
      {errors[name] && (
        <p className="field__error" id={`c-${name}-err`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <section className="sheet" id="contact" aria-labelledby="contact-title">
      <div className="sheet__body">
        <header className="sheet__head">
          <div>
            <h2 className="sheet__title" id="contact-title">Contact</h2>
            <p className="lede contact__lede">
              Hiring for data or ML engineering? Email is the fastest way to reach me.
            </p>
          </div>
          <p className="sheet__no" aria-label={`Sheet ${sheet} of ${of}`}>
            <span>Sheet</span>
            <span>{sheet} / {of}</span>
          </p>
        </header>

        <div className="contact">
          <dl className="kv contact__direct">
            <dt>Email</dt>
            <dd>
              <a className="contact__email" href={`mailto:${identity.email}`}>{identity.email}</a>
            </dd>
            <dt>Phone</dt>
            <dd><a href={`tel:${identity.phone.replace(/\D/g, '')}`}>{identity.phone}</a></dd>
            <dt>Location</dt>
            <dd>{identity.location}</dd>
            <dt>GitHub</dt>
            <dd><a href={identity.github} target="_blank" rel="noopener noreferrer">github.com/ParkerPeterman</a></dd>
            <dt>LinkedIn</dt>
            <dd><a href={identity.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/parker-peterman</a></dd>
            <dt>Résumé</dt>
            <dd><a href={identity.resume} download>Download (PDF)</a></dd>
          </dl>

          <form className="contact__form" onSubmit={onSubmit} noValidate>
            <h3 className="contact__formtitle">Or send a message from here</h3>
            {field('email', 'Your email', (p) => <input type="email" autoComplete="email" {...p} />)}
            {field('message', 'Message', (p) => <textarea rows="5" {...p} />)}
            <div className="contact__actions">
              <button type="submit" className="btn" aria-disabled={state === 'sending'} disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p className="contact__status letter" role="status" aria-live="polite">
                {state === 'sent' && 'Message sent. I’ll reply to the address you gave.'}
                {state === 'error' && (
                  <>
                    The message didn’t send, and your draft is still here. Email me at{' '}
                    <a href={`mailto:${identity.email}`}>{identity.email}</a> instead.
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
