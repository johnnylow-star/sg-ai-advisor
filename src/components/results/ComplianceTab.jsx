function ComplianceCard({ accentColor, icon, label, title, overview, leftTitle, leftItems, rightTitle, rightItems, resources }) {
  return (
    <div className="card" style={{ borderLeft: `4px solid ${accentColor}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: '1.4rem' }}>{icon}</span>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
          <h3 style={{ fontSize: '1.05rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>{title}</h3>
        </div>
      </div>
      <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 20 }}>{overview}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{leftTitle}</p>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {leftItems?.map((o, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{o}</li>)}
          </ul>
        </div>
        <div>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{rightTitle}</p>
          <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {rightItems?.map((a, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{a}</li>)}
          </ul>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {resources?.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${accentColor}18`, color: accentColor, padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            {r.name} →
          </a>
        ))}
      </div>
    </div>
  )
}

export default function ComplianceTab({ roadmap }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>🛡️ AI Compliance & Governance</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>Singapore-specific compliance for responsible AI — covering PDPA, Cybersecurity and AI Governance.</p>
      </div>

      <ComplianceCard
        accentColor="#7c3aed"
        icon="📋"
        label="Singapore PDPA"
        title="Personal Data Protection Act"
        overview={roadmap?.compliance?.pdpa?.overview}
        leftTitle="Key Obligations"
        leftItems={roadmap?.compliance?.pdpa?.obligations}
        rightTitle="Recommended Actions"
        rightItems={roadmap?.compliance?.pdpa?.actions}
        resources={roadmap?.compliance?.pdpa?.resources}
      />

      <ComplianceCard
        accentColor="#dc2626"
        icon="🔒"
        label="CSA Singapore"
        title="Cybersecurity Framework"
        overview={roadmap?.compliance?.cybersecurity?.overview}
        leftTitle="Key Risks"
        leftItems={roadmap?.compliance?.cybersecurity?.risks}
        rightTitle="Recommended Actions"
        rightItems={roadmap?.compliance?.cybersecurity?.actions}
        resources={roadmap?.compliance?.cybersecurity?.resources}
      />

      <ComplianceCard
        accentColor="#1e90ff"
        icon="🤖"
        label="IMDA / PDPC Singapore"
        title="AI Governance & Ethics"
        overview={roadmap?.compliance?.aiGovernance?.overview}
        leftTitle="Core Principles"
        leftItems={roadmap?.compliance?.aiGovernance?.principles}
        rightTitle="Recommended Actions"
        rightItems={roadmap?.compliance?.aiGovernance?.actions}
        resources={roadmap?.compliance?.aiGovernance?.resources}
      />
    </div>
  )
}