/**
 * A numbered figure: the plot, a caption that names what is shown and where
 * the numbers came from, and an optional table view so no value is only
 * readable by hovering or by colour.
 */
export default function Figure({ n, title, source, table, children, className = '' }) {
  return (
    <figure className={`fig ${className}`}>
      <div className="fig__plot">{children}</div>

      {table && (
        <details className="fig__table">
          <summary>Show the numbers as a table</summary>
          <div className="table-scroll" style={{ border: 0 }}>
            <table className="spec">
              <thead>
                <tr>
                  {table.head.map((h, i) => (
                    <th key={h} className={i > 0 ? 'num' : undefined} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">{c}</th>
                      ) : (
                        <td key={i} className="num">{c}</td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}

      <figcaption>
        <b>Figure {n}.</b> {title}
        {source && <span className="fig__source">{source}</span>}
      </figcaption>
    </figure>
  );
}
