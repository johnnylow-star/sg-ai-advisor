import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateRoadmap } from '../services/aiService'
import { saveSubmission } from '../services/firestoreService'
import { exportToPDF } from '../services/pdfService'
import ResultsHeader from '../components/results/ResultsHeader'
import ScoreTab from '../components/results/ScoreTab'
import UseCasesTab from '../components/results/UseCasesTab'
import RoadmapTab from '../components/results/RoadmapTab'
import TrainingTab from '../components/results/TrainingTab'
import ComplianceTab from '../components/results/ComplianceTab'
import GrantsTab from '../components/results/GrantsTab'

const TABS = [
  { id: 'score', label: '🎯 AI Readiness Score' },
  { id: 'usecases', label: '🤖 AI Use Cases' },
  { id: 'roadmap', label: '🗺️ Roadmap' },
  { id: 'training', label: '🎓 Workforce Plan' },
  { id: 'compliance', label: '🛡️ Compliance' },
  { id: 'grants', label: '💰 Grants' },
]

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
    try { await exportToPDF(roadmap, formData) }
    catch (err) { console.error('PDF export failed:', err) }
    finally { setExporting(false) }
  }

  useEffect(() => {
    if (!formData) { navigate('/'); return }
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

  const scores = roadmap?.readinessScores

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>

      <ResultsHeader
        formData={formData}
        roadmap={roadmap}
        scores={scores}
        exporting={exporting}
        onExport={handleExportPDF}
      />

      {/* Banners */}
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

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {TABS.map(tab => (
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
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
        {activeTab === 'score' && <ScoreTab roadmap={roadmap} scores={scores} />}
        {activeTab === 'usecases' && <UseCasesTab roadmap={roadmap} companyName={formData.companyName} />}
        {activeTab === 'roadmap' && <RoadmapTab roadmap={roadmap} />}
        {activeTab === 'training' && <TrainingTab roadmap={roadmap} />}
        {activeTab === 'compliance' && <ComplianceTab roadmap={roadmap} />}
        {activeTab === 'grants' && <GrantsTab roadmap={roadmap} />}

        {/* Bottom CTA */}
        <div style={{ marginTop: 48, background: 'white', borderRadius: 16, padding: '40px 32px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <img src="/SAIA_black.jpeg" alt="SAIA" style={{ height: 40, objectFit: 'contain', marginBottom: 20 }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: 8, color: 'var(--text-dark)' }}>Ready to accelerate your AI journey?</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: 28, fontSize: '0.95rem' }}>Our team at SAIA can provide a detailed AI readiness workshop and implementation support tailored to your business.</p>
          <a href="mailto:info@saia.org.sg" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '16px 40px', borderRadius: 50, background: '#1e90ff', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '1rem', display: 'block', margin: '0 auto 20px' }}>
              Contact SAIA →
            </button>
          </a>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            <button onClick={() => navigate('/form')} style={{ padding: '10px 22px', borderRadius: 50, background: 'transparent', color: 'var(--text-light)', border: '1.5px solid var(--border)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '0.85rem' }}>
              Start New Assessment
            </button>
            <button onClick={handleExportPDF} disabled={exporting} style={{ padding: '10px 22px', borderRadius: 50, background: 'transparent', color: 'var(--text-light)', border: '1.5px solid var(--border)', cursor: exporting ? 'not-allowed' : 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '0.85rem' }}>
              {exporting ? 'Generating...' : '⬇️ Download PDF'}
            </button>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginTop: 24, opacity: 0.5 }}>© 2025 Singapore A.I. Association · Powered by Pantherpulse</p>
        </div>
      </div>

    </div>
  )
}