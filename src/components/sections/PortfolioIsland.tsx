import { useState, useEffect } from 'react';

interface PortfolioItem {
  id:        string;
  filter:    string;
  img:       string;
  img_large: string;
  title:     string;
  caption:   string;
}
interface Filter { id: string; label: string; }

interface Props {
  filters: Filter[];
  items:   PortfolioItem[];
}

export default function PortfolioIsland({ filters, items }: Props) {
  const [active, setActive]   = useState('*');
  const [lbIdx,  setLbIdx]   = useState<number | null>(null);

  const visible = active === '*' ? items : items.filter(i => i.filter === active);

  const show = (idx: number) => {
    const total = visible.length;
    setLbIdx(((idx % total) + total) % total);
  };
  const hide = () => setLbIdx(null);

  const handleFilter = (id: string) => { setActive(id); setLbIdx(null); };

  useEffect(() => {
    if (lbIdx === null) return;
    const total = visible.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     setLbIdx(null);
      if (e.key === 'ArrowLeft')  setLbIdx(i => (((i ?? 0) - 1 + total) % total));
      if (e.key === 'ArrowRight') setLbIdx(i => (((i ?? 0) + 1) % total));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lbIdx, visible.length]);

  const current = lbIdx !== null ? visible[lbIdx] : null;

  return (
    <>
      <div className="vt-portfolio__filters">
        {filters.map(f => (
          <button
            key={f.id}
            type="button"
            className={'vt-portfolio__filter' + (active === f.id ? ' is-active' : '')}
            onClick={() => handleFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="vt-portfolio__grid">
        {visible.map((p, i) => (
          <div
            key={p.id}
            className="vt-portfolio-tile"
            onClick={() => show(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') show(i); }}
            aria-label={`Voir ${p.title} en grand`}
          >
            <img src={p.img} alt={p.caption} loading="lazy" />
            <div className="vt-portfolio-tile__info">
              <h3>{p.title}</h3>
              <p>{p.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {current && (
        <>
          <div className="vt-plb-overlay" onClick={hide} aria-hidden="true" />
          <div className="vt-plb" role="dialog" aria-modal="true">
            <button type="button" className="vt-plb-close" onClick={hide} aria-label="Fermer">&times;</button>
            <img className="vt-plb-img" src={current.img_large} alt={current.caption} />
            <div className="vt-plb-info">
              <p className="vt-plb-title">{current.title}</p>
              <p className="vt-plb-caption">{current.caption}</p>
            </div>
            {visible.length > 1 && (
              <>
                <button type="button" className="vt-plb-prev" onClick={() => show((lbIdx ?? 0) - 1)} aria-label="Précédent">
                  <i className="bi bi-chevron-left" />
                </button>
                <button type="button" className="vt-plb-next" onClick={() => show((lbIdx ?? 0) + 1)} aria-label="Suivant">
                  <i className="bi bi-chevron-right" />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
