import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateRoadmap } from '../services/aiService'
import { saveSubmission } from '../services/firestoreService'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const formData = location.state?.formData

  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('roadmap')

  useEffect(() => {
    if (!formData) { navigate('/form'); return }
    async function generate() {
      try {
        const result = await generateRoadmap(formData)
        setRoadmap(result)
        await saveSubmission(formData, result)
      } catch (err) {
        setError('Failed to generate roadmap. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    generate()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b2a, #0f4c81)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <div style={{ width: 56, height: 56, border: '4px solid rgba(255,255,255,0.2)', borderTop: '4px solid #ff8c42', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>Generating your personalised roadmap...</p>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>Analysing your profile and researching best practices...</p>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ color: 'red', fontSize: '1rem' }}>{error}</p>
      <button className="btn-primary" onClick={() => navigate('/form')}>Try Again</button>
    </div>
  )

  const tabs = [
    { id: 'roadmap', label: '🗺️ Roadmap' },
    { id: 'methodology', label: '⚙️ Methodology' },
    { id: 'training', label: '🎓 Training' },
    { id: 'compliance', label: '🛡️ Compliance' },
    { id: 'grants', label: '💰 Grants' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d1b2a, #0f4c81)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 32, height: 32, background: '#e8630a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>SG</div>
            <span style={{ fontWeight: 700, color: 'white' }}>AI Advisor</span>
          </div>
          <span className="tag tag-orange" style={{ marginBottom: 16 }}>Your Personalised Plan</span>
          <h1 style={{ color: 'white', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: 12 }}>
            Digital Transformation Roadmap
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
            {formData.companyName} · {formData.industry} · {formData.employeeCount} employees
          </p>

          {/* Confidence Score */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ height: 6, width: 160, background: 'rgba(255,255,255,0.2)', borderRadius: 10 }}>
              <div style={{ height: '100%', width: `${roadmap?.confidenceScore}%`, background: roadmap?.confidenceScore >= 60 ? '#4ade80' : roadmap?.confidenceScore >= 40 ? '#fbbf24' : '#f87171', borderRadius: 10 }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
              Data confidence: {roadmap?.confidenceScore}/100
            </span>
          </div>

          {/* Executive Summary */}
          {roadmap?.executiveSummary && (
            <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '0.95rem' }}>{roadmap.executiveSummary}</p>
            </div>
          )}
        </div>
      </div>

      {/* Low Data Disclaimer */}
      {roadmap?.isLowDataPlan && (
        <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '14px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <p style={{ fontSize: '0.88rem', color: '#92400e', lineHeight: 1.6 }}>
              <strong>Based on Industry Best Practices:</strong> Limited company-specific information was provided. This roadmap reflects Singapore market benchmarks for your industry and company size. For a fully customised plan, we recommend providing your website URL and completing all fields, or engaging a digital transformation consultant for a detailed assessment.
            </p>
          </div>
        </div>
      )}

      {/* Website Insights Banner */}
      {roadmap?.websiteInsights && (
        <div style={{ background: '#f0f7ff', borderBottom: '1px solid #c0d8f5', padding: '14px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem' }}>🌐</span>
            <p style={{ fontSize: '0.88rem', color: '#1e3a5f', lineHeight: 1.6 }}>
              <strong>Website Analysis:</strong> {roadmap.websiteInsights}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-light)',
                borderBottom: activeTab === tab.id ? '3px solid var(--accent)' : '3px solid transparent',
                whiteSpace: 'nowrap', transition: 'all 0.2s ease'
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        {/* ROADMAP TAB */}
        {activeTab === 'roadmap' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card">
              <h2 style={{ fontSize: '1.3rem', marginBottom: 8 }}>{roadmap?.solutionIdeology?.title}</h2>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 20 }}>{roadmap?.solutionIdeology?.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {roadmap?.solutionIdeology?.principles?.map((p, i) => (
                  <span key={i} className="tag tag-blue">{p}</span>
                ))}
              </div>
            </div>
            {roadmap?.roadmap?.map((phase, i) => (
              <div key={i} className="card" style={{ borderLeft: `4px solid ${['#e8630a', '#0f4c81', '#0a8754'][i]}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: ['#fff0e6', '#e0ecff', '#e0f5ed'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: ['#e8630a', '#0f4c81', '#0a8754'][i], fontSize: '0.9rem' }}>{i + 1}</div>
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
        )}

        {/* METHODOLOGY TAB */}
        {activeTab === 'methodology' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card">
              <span className="tag tag-blue" style={{ marginBottom: 16 }}>Recommended Approach</span>
              <h2 style={{ fontSize: '1.4rem', marginBottom: 12 }}>{roadmap?.methodology?.name}</h2>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 24 }}>{roadmap?.methodology?.description}</p>
              <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, marginBottom: 16 }}>Implementation Steps</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {roadmap?.methodology?.steps?.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7, paddingTop: 4 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRAINING TAB */}
        {activeTab === 'training' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #e0ecff, #f0f7ff)', border: 'none' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Workforce Training Plan</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem' }}>Upskilling recommendations tailored to your team and digital maturity level.</p>
            </div>
            {roadmap?.trainingPlan?.map((plan, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>{plan.role}</h3>
                  <span className="tag tag-blue">{plan.provider}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Skills to Develop</p>
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
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', border: 'none' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>🛡️ Compliance & Governance</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem' }}>Singapore-specific compliance requirements covering PDPA, Cybersecurity, and AI Governance frameworks.</p>
            </div>

            {/* PDPA */}
            <div className="card" style={{ borderLeft: '4px solid #7c3aed' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: '1.4rem' }}>📋</span>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Singapore PDPA</span>
                  <h3 style={{ fontSize: '1.05rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>Personal Data Protection Act</h3>
                </div>
              </div>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 20 }}>{roadmap?.compliance?.pdpa?.overview}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Key Obligations</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.pdpa?.obligations?.map((o, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{o}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Recommended Actions</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.pdpa?.actions?.map((a, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {roadmap?.compliance?.pdpa?.resources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f3eeff', color: '#7c3aed', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                    {r.name} →
                  </a>
                ))}
              </div>
            </div>

            {/* Cybersecurity */}
            <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: '1.4rem' }}>🔒</span>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CSA Singapore</span>
                  <h3 style={{ fontSize: '1.05rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>Cybersecurity Framework</h3>
                </div>
              </div>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 20 }}>{roadmap?.compliance?.cybersecurity?.overview}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Key Risks</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.cybersecurity?.risks?.map((r, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Recommended Actions</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.cybersecurity?.actions?.map((a, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {roadmap?.compliance?.cybersecurity?.resources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fef2f2', color: '#dc2626', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                    {r.name} →
                  </a>
                ))}
              </div>
            </div>

            {/* AI Governance */}
            <div className="card" style={{ borderLeft: '4px solid #0f4c81' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: '1.4rem' }}>🤖</span>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f4c81', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IMDA / PDPC Singapore</span>
                  <h3 style={{ fontSize: '1.05rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>AI Governance & Ethics</h3>
                </div>
              </div>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 20 }}>{roadmap?.compliance?.aiGovernance?.overview}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Core Principles</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.aiGovernance?.principles?.map((p, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Recommended Actions</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.aiGovernance?.actions?.map((a, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {roadmap?.compliance?.aiGovernance?.resources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e0ecff', color: '#0f4c81', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                    {r.name} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GRANTS TAB */}
        {activeTab === 'grants' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #e0f5ed, #f0fdf7)', border: 'none' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Matched Singapore Grants</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem' }}>Government funding opportunities relevant to your transformation plan.</p>
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
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' }}>
                  Learn more & apply →
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ marginTop: 48, textAlign: 'center', padding: '40px 24px', background: 'white', borderRadius: 16, border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>Want to explore further?</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: 24, fontSize: '0.95rem' }}>Start a new assessment or refine your answers</p>
          <button className="btn-primary" onClick={() => navigate('/form')}>Start New Assessment</button>
        </div>

      </div>
    </div>
  )
}