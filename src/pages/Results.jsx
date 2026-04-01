import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateRoadmap } from '../services/aiService'
import { saveSubmission } from '../services/firestoreService'
import { exportToPDF } from '../services/pdfService'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const formData = location.state?.formData

  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('score')
  const [exporting, setExporting] = useState(false)

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      await exportToPDF(roadmap, formData)
    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    if (!formData) { navigate('/form'); return }
    async function generate() {
      try {
        const result = await generateRoadmap(formData)
        setRoadmap(result)
        await saveSubmission(formData, result)
      } catch (err) {
        setError('Failed to generate report. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    generate()
  }, [])

  // FIX 2 — Mobile loading screen with proper padding
  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a, #0f4c81)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 32px' }}>
      <img src="/SAIA_white.jpeg" alt="SAIA" style={{ height: 48, objectFit: 'contain', marginBottom: 8 }} />
      <div style={{ width: 56, height: 56, border: '4px solid rgba(255,255,255,0.15)', borderTop: '4px solid #1e90ff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, textAlign: 'center' }}>Analysing your AI readiness...</p>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', textAlign: 'center', maxWidth: 300, lineHeight: 1.6 }}>Researching industry benchmarks and generating your personalised report...</p>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 32px' }}>
      <p style={{ color: 'red' }}>{error}</p>
      <button className="btn-primary" onClick={() => navigate('/form')}>Try Again</button>
    </div>
  )

  const tabs = [
    { id: 'score', label: '🎯 AI Readiness Score' },
    { id: 'usecases', label: '🤖 AI Use Cases' },
    { id: 'roadmap', label: '🗺️ Roadmap' },
    { id: 'training', label: '🎓 Workforce Plan' },
    { id: 'compliance', label: '🛡️ Compliance' },
    { id: 'grants', label: '💰 Grants' },
  ]

  const scores = roadmap?.readinessScores
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
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d2a4a 50%, #0f4c81 100%)', padding: '32px 24px 40px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* FIX 4 — Use white logo on dark background (correct) */}
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

          {/* Overall Score */}
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

          {/* Executive Summary */}
          {roadmap?.executiveSummary && (
            <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontSize: '0.95rem' }}>{roadmap.executiveSummary}</p>
            </div>
          )}
        </div>
      </div>

      {/* Low Data Disclaimer */}
      {roadmap?.isLowDataPlan && (
        <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '14px 24px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <p style={{ fontSize: '0.88rem', color: '#92400e', lineHeight: 1.6 }}>
              <strong>Based on Industry Benchmarks:</strong> Limited company-specific data was provided. This report reflects Singapore AI readiness benchmarks for your industry and company size. For a fully personalised assessment, contact SAIA directly.
            </p>
          </div>
        </div>
      )}

      {/* Website Insights */}
      {roadmap?.websiteInsights && (
        <div style={{ background: '#e8f4ff', borderBottom: '1px solid #90caf9', padding: '14px 24px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem' }}>🌐</span>
            <p style={{ fontSize: '0.88rem', color: '#1565c0', lineHeight: 1.6 }}>
              <strong>Website Analysis:</strong> {roadmap.websiteInsights}
            </p>
          </div>
        </div>
      )}

      {/* FIX 1 — Tabs + Export PDF button aligned to top right */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 20px', border: 'none', background: 'none', cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '0.85rem',
                  color: activeTab === tab.id ? '#1e90ff' : 'var(--text-light)',
                  borderBottom: activeTab === tab.id ? '3px solid #1e90ff' : '3px solid transparent',
                  whiteSpace: 'nowrap', transition: 'all 0.2s ease'
                }}>
                {tab.label}
              </button>
            ))}
          </div>
          {/* Export PDF button - top right */}
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            style={{
              flexShrink: 0, marginRight: 16, marginLeft: 8,
              padding: '9px 20px', borderRadius: 50,
              background: exporting ? '#ccc' : '#1e90ff',
              color: 'white', border: 'none',
              cursor: exporting ? 'not-allowed' : 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700, fontSize: '0.82rem',
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6
            }}>
            {exporting ? '⏳ Generating...' : '⬇️ Export PDF'}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>

        {/* AI READINESS SCORE TAB */}
        {activeTab === 'score' && (
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
        )}

        {/* AI USE CASES TAB */}
        {activeTab === 'usecases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>🤖 Recommended AI Use Cases</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>Specifically recommended for {formData.companyName} based on your industry and AI interests.</p>
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
        )}

        {/* ROADMAP TAB */}
        {activeTab === 'roadmap' && (
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
        )}

        {/* TRAINING TAB */}
        {activeTab === 'training' && (
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
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, #0a0f1e, #0d2a4a)', border: 'none' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'white' }}>🛡️ AI Compliance & Governance</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem' }}>Singapore-specific compliance for responsible AI — covering PDPA, Cybersecurity and AI Governance.</p>
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
                    {roadmap?.compliance?.pdpa?.obligations?.map((o, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{o}</li>)}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Recommended Actions</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.pdpa?.actions?.map((a, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{a}</li>)}
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {roadmap?.compliance?.pdpa?.resources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f3eeff', color: '#7c3aed', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>{r.name} →</a>
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
                    {roadmap?.compliance?.cybersecurity?.risks?.map((r, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{r}</li>)}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Recommended Actions</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.cybersecurity?.actions?.map((a, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{a}</li>)}
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {roadmap?.compliance?.cybersecurity?.resources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fef2f2', color: '#dc2626', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>{r.name} →</a>
                ))}
              </div>
            </div>

            {/* AI Governance */}
            <div className="card" style={{ borderLeft: '4px solid #1e90ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: '1.4rem' }}>🤖</span>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e90ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IMDA / PDPC Singapore</span>
                  <h3 style={{ fontSize: '1.05rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>AI Governance & Ethics</h3>
                </div>
              </div>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 20 }}>{roadmap?.compliance?.aiGovernance?.overview}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Core Principles</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.aiGovernance?.principles?.map((p, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Recommended Actions</p>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {roadmap?.compliance?.aiGovernance?.actions?.map((a, i) => <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{a}</li>)}
                  </ul>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {roadmap?.compliance?.aiGovernance?.resources?.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f4ff', color: '#1e90ff', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>{r.name} →</a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GRANTS TAB */}
        {activeTab === 'grants' && (
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
        )}

        {/* FIX 3 — Bottom CTA: Contact SAIA as primary, black logo, deemphasized secondary actions */}
        <div style={{ marginTop: 48, background: 'white', borderRadius: 16, padding: '40px 32px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <img src="/SAIA_black.jpeg" alt="SAIA" style={{ height: 40, objectFit: 'contain', marginBottom: 20 }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: 8, color: 'var(--text-dark)' }}>Ready to accelerate your AI journey?</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: 28, fontSize: '0.95rem' }}>Our team at SAIA can provide a detailed AI readiness workshop and implementation support tailored to your business.</p>

          {/* Primary CTA — Contact SAIA */}
          <a href="mailto:info@saia.org.sg" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 40px', borderRadius: 50, background: '#1e90ff',
              color: 'white', border: 'none', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700,
              fontSize: '1rem', marginBottom: 20, display: 'block', margin: '0 auto 20px'
            }}>
              Contact SAIA →
            </button>
          </a>

          {/* Secondary deemphasized actions */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            <button onClick={() => navigate('/form')}
              style={{
                padding: '10px 22px', borderRadius: 50, background: 'transparent',
                color: 'var(--text-light)', border: '1.5px solid var(--border)',
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600, fontSize: '0.85rem'
              }}>
              Start New Assessment
            </button>
            <button onClick={handleExportPDF} disabled={exporting}
              style={{
                padding: '10px 22px', borderRadius: 50, background: 'transparent',
                color: 'var(--text-light)', border: '1.5px solid var(--border)',
                cursor: exporting ? 'not-allowed' : 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600, fontSize: '0.85rem'
              }}>
              {exporting ? 'Generating...' : '⬇️ Download PDF'}
            </button>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginTop: 24, opacity: 0.5 }}>© 2025 Singapore A.I. Association · Powered by Pantherpulse</p>
        </div>

      </div>
    </div>
  )
}