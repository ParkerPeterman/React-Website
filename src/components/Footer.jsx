import './Footer.css';

export default function Footer() {
  return (
    <footer className="foot">
      <p>
        Drawn in React with hand-built SVG figures. Every chart is plotted from the project’s own
        data.{' '}
        <a href="https://github.com/ParkerPeterman/React-Website" target="_blank" rel="noopener noreferrer">
          View the source on GitHub
        </a>
      </p>
      <p>© {new Date().getFullYear()} Parker Peterman</p>
    </footer>
  );
}
