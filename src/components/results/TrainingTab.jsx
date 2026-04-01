export default function TrainingTab({ roadmap }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>🎓 AI Workforce Development Plan</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>Upskilling roadmap to build your team's AI capabilities across all levels.</p>
      </div>
      {roadmap?.trainingPlan?.map((plan, i) => (
        <div key={i} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>{plan.role}</h3>
            <span className="tag tag-blue">{plan.provider}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>AI Skills to Develop</p>
              <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {plan.skills?.map((s, j) => <li key={j} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{s}</li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Recommended Resources</p>
              <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {plan.resources?.map((r, j) => <li key={j} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{r}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}