export default function ResultsHeader({ formData, roadmap, scores, exporting, onExport }) {
  const getScoreColor = (score) => {
    if (score >= 70) return '#0a8754'
    if (score >= 40) return '#e8630a'
    return '#dc2626'
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d2a4a 50%, #0f4c81 100%)', padding: '32px 24px 40px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <img src="/SAIA_white.jpeg" alt="Singapore AI Association" style={{ height: 36, objectFit: 'contain' }} />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>Powered by Pantherpulse</span>
        </div>

        <span className="tag" style={{ background: 'rgba(30,144,255,0.2)', color: '#60b4ff', border: '1px solid rgba(30,144,255,0.3)', marginBottom: 16 }}>
          Your AI Readiness Report
        </span>
        <h1 style={{ color: 'white', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: 12 }}>
          AI Readiness Assessment
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: 24 }}>
          {formData.companyName} · {formData.industry} · {formData.employeeCount} employees
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 24px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: getScoreColor(scores?.overall || 0), lineHeight: 1 }}>
                {scores?.overall || '--'}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: 4 }}>out of 100</div>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{roadmap?.readinessLevel?.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', maxWidth: 260, lineHeight: 1.5, marginTop: 4 }}>
                {roadmap?.readinessLevel?.description?.substring(0, 90)}...
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ height: 6, width: 120, background: 'rgba(255,255,255,0.15)', borderRadius: 10 }}>
              <div style={{ height: '100%', width: `${roadmap?.confidenceScore}%`, background: roadmap?.confidenceScore >= 60 ? '#4ade80' : '#fbbf24', borderRadius: 10 }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              Data confidence: {roadmap?.confidenceScore}/100
            </span>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button onClick={onExport} disabled={exporting}
            style={{
              padding: '10px 24px', borderRadius: 50,
              background: exporting ? 'rgba(255,255,255,0.2)' : 'white',
              color: exporting ? 'rgba(255,255,255,0.5)' : '#1e90ff',
              border: '2px solid rgba(255,255,255,0.3)',
              cursor: exporting ? 'not-allowed' : 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700, fontSize: '0.88rem',
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
            {exporting ? '⏳ Generating PDF...' : '⬇️ Export PDF Report'}
          </button>
        </div>

        {roadmap?.executiveSummary && (
          <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontSize: '0.95rem' }}>{roadmap.executiveSummary}</p>
          </div>
        )}
      </div>
    </div>
  )
}