export default function ScoreTab({ roadmap, scores }) {
  const dimensions = scores ? [
    { key: 'dataReadiness', label: 'Data Readiness', icon: '🗄️', color: '#1e90ff' },
    { key: 'aiStrategy', label: 'AI Strategy', icon: '🧭', color: '#0d2a4a' },
    { key: 'workforceSkills', label: 'Workforce & Skills', icon: '👥', color: '#0a8754' },
    { key: 'techInfrastructure', label: 'Tech Infrastructure', icon: '⚙️', color: '#e8630a' },
    { key: 'ethicsGovernance', label: 'Ethics & Governance', icon: '🛡️', color: '#dc2626' },
  ] : []

  const getScoreColor = (score) => {
    if (score >= 70) return '#0a8754'
    if (score >= 40) return '#e8630a'
    return '#dc2626'
  }

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Advanced'
    if (score >= 50) return 'Established'
    if (score >= 30) return 'Emerging'
    return 'Beginning'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>Your AI Readiness Breakdown</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>{roadmap?.readinessLevel?.description}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {dimensions.map(dim => {
          const s = scores?.[dim.key]
          return (
            <div key={dim.key} className="card" style={{ borderTop: `4px solid ${dim.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: '1.4rem' }}>{dim.icon}</span>
                  <h3 style={{ fontSize: '0.95rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, marginTop: 8 }}>{dim.label}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: getScoreColor(s?.score || 0), lineHeight: 1 }}>{s?.score || '--'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: 2 }}>{getScoreLabel(s?.score || 0)}</div>
                </div>
              </div>
              <div style={{ height: 8, background: 'var(--border)', borderRadius: 10, marginBottom: 12 }}>
                <div style={{ height: '100%', width: `${s?.score || 0}%`, background: dim.color, borderRadius: 10 }} />
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{s?.insight}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}