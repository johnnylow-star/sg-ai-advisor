export default function RoadmapTab({ roadmap }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>🗺️ Your AI Transformation Roadmap</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>A phased plan to build your AI capabilities over 12 months.</p>
      </div>
      {roadmap?.roadmap?.map((phase, i) => (
        <div key={i} className="card" style={{ borderLeft: `4px solid ${['#1e90ff', '#0d2a4a', '#0a8754'][i]}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: ['#e8f4ff', '#e8eaf6', '#e0f5ed'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: ['#1e90ff', '#0d2a4a', '#0a8754'][i] }}>{i + 1}</div>
            <div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{phase.phase} · {phase.duration}</p>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>{phase.title}</h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', marginBottom: 16 }}>{phase.focus}</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {phase.actions?.map((action, j) => (
              <li key={j} style={{ color: 'var(--text-dark)', fontSize: '0.92rem', lineHeight: 1.6 }}>{action}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}