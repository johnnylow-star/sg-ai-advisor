export default function UseCasesTab({ roadmap, companyName }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>🤖 Recommended AI Use Cases</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>Specifically recommended for {companyName} based on your industry and AI interests.</p>
      </div>
      {roadmap?.aiUseCases?.map((uc, i) => (
        <div key={i} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: '1.05rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>{uc.title}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="tag" style={{ background: uc.priority === 'High' ? '#e8f4ff' : '#f0f7ff', color: uc.priority === 'High' ? '#1e90ff' : 'var(--primary)' }}>
                {uc.priority} Priority
              </span>
              <span className="tag tag-blue">{uc.effort} Effort</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 16 }}>{uc.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Suggested Tools</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {uc.tools?.map((t, j) => (
                  <span key={j} style={{ background: '#e8f4ff', color: '#1e90ff', padding: '4px 10px', borderRadius: 50, fontSize: '0.8rem', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Estimated Impact</p>
              <p style={{ fontSize: '0.9rem', color: '#0a8754', fontWeight: 700 }}>📈 {uc.estimatedImpact}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}