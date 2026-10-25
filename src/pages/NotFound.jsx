import { useEffect } from 'react';
import Masthead from '../components/Masthead';
import Footer from '../components/Footer';

/**
 * Shown for a hash that is neither a page nor a sheet, usually an old link
 * to a project that has since been retired or renamed.
 */
export default function NotFound() {
  useEffect(() => {
    document.title = 'Not found | Parker Peterman';
  }, []);

  return (
    <>
      <Masthead />
      <main>
        <section className="sheet">
          <div className="sheet__body">
            <p className="caps">No drawing at {window.location.hash}</p>
            <h1 className="sheet__title" style={{ margin: '0.5rem 0 1rem' }}>
              That page isn’t in this set.
            </h1>
            <p className="lede">
              It may be an old link to a project that has been renamed or retired. All current work is
              on the work sheet.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              <a className="btn" href="#work">Go to all work</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
