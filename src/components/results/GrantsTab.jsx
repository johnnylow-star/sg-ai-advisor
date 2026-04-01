export default function GrantsTab({ roadmap }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>💰 Matched Singapore AI Grants</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>Government funding opportunities matched to your AI transformation plan.</p>
      </div>
      {roadmap?.grants?.map((grant, i) => (
        <div key={i} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>{grant.name}</h3>
            <span className="tag tag-green">{grant.support}</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: 12 }}>Administered by: <strong>{grant.body}</strong></p>
          <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 16 }}>{grant.relevance}</p>
          <a href={grant.url} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1e90ff', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' }}>
            Learn more & apply →
          </a>
        </div>
      ))}
    </div>
  )
}