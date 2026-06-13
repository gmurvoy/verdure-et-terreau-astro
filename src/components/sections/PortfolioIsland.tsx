import { useState } from 'react';

interface PortfolioItem {
  id:      string;
  filter:  string;
  img:     string;
  title:   string;
  caption: string;
}
interface Filter { id: string; label: string; }

interface Props {
  filters: Filter[];
  items:   PortfolioItem[];
}

export default function PortfolioIsland({ filters, items }: Props) {
  const [active, setActive] = useState('*');
  const visible = active === '*' ? items : items.filter(i => i.filter === active);

  return (
    <>
      <div className="vt-portfolio__filters">
        {filters.map(f => (
          <button
            key={f.id}
            className={'vt-portfolio__filter' + (active === f.id ? ' is-active' : '')}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="vt-portfolio__grid">
        {visible.map(p => (
          <div className="vt-portfolio-tile" key={p.id}>
            <img src={p.img} alt={p.caption} loading="lazy" />
            <div className="vt-portfolio-tile__info">
              <h3>{p.title}</h3>
              <p>{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
