# parkerpeterman.com

Portfolio site for Parker Peterman, data and ML engineer. It's laid out as an engineering drawing set:
green computation paper by default, with a blueprint theme behind the Paper / Blueprint switch. Every
figure is plotted from the projects' own data, and every claim links to something a reader can check.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # writes dist/
npm run preview   # serves dist/
```

React 19 and Vite, with no other runtime dependencies. Routing is a small hash router in `src/App.jsx`.

## Where things live

| Path | What it holds |
|---|---|
| `src/data/site.js` | Name, contact, intro, skills parts list, experience, education, certifications |
| `src/data/projects.js` | Project index, plus the measured numbers behind every chart (with sources) |
| `src/data/healthSystem.js` | Figure 1: the parts, notes and edge geometry of the health system diagram |
| `src/data/homelab.js` | Homelab spec at the architecture level, with a `status` on each part |
| `src/pages/` | Case-study pages (`#health`, `#rental`, `#census`, `#outage`) and the lab spec (`#homelab`) |
| `src/components/` | The home page sheets, the diagram, the rack drawing, and the charts |
| `src/styles/tokens.css` | Colours, type scale, line weights, motion tokens for both themes |

Copy changes go in `src/data/` or the page files; components stay presentational.

### Homelab status marks

Each part in `src/data/homelab.js` has `status: 'running'` or `'planned'`. Running parts are drawn solid
and planned parts dashed in redline, in the rack drawing, the architecture figure and every table. When
something gets built, flip its status and everything follows.

The public spec leaves out IP addresses, ports and hostnames on purpose. Keep
`homelab-tech-spec.txt` out of the repo: the repo is public, and that file has the full network plan.

## Conventions

- **Line weight means something.** Thick lines frame sheets, medium lines draw objects, thin lines are
  leaders and rules, dashed lines are planned work.
- **Redline is markup only:** planned parts, the selected part of a figure, the value a chart is about.
- **One animation:** Figure 1 draws itself once on load. Everything else only answers the visitor.
  `prefers-reduced-motion` turns that animation off.
- **Breakpoints:** one viewport breakpoint (narrow, under 768px). Components that depend on their own
  width (the diagram, title block, lab layout, rack drawing) use container queries.
- **The set scales with the window.** The root size is 16px up to a 1440px window and grows to 22px
  at 2880px (`html` in `base.css`). Size things in rem, container-query thresholds included, so the
  whole sheet grows together on big monitors. Line weights and SVG lettering (which scales with its
  viewBox) are the only px values.
- **Text never renders below 12px,** including SVG text after scaling.
