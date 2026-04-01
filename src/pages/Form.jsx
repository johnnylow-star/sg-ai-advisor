import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INDUSTRIES = ['Manufacturing', 'Retail & E-commerce', 'F&B', 'Logistics & Supply Chain', 'Healthcare', 'Education', 'Finance & Insurance', 'Construction & Real Estate', 'Professional Services', 'Other']

const AI_USE_CASE_INTERESTS = [
  'Customer service automation (chatbots, auto-replies)',
  'Sales & marketing personalisation',
  'Process automation & workflow optimisation',
  'Data analytics & business intelligence',
  'Document processing & summarisation',
  'Predictive maintenance & quality control',
  'HR & talent management automation',
  'Financial forecasting & fraud detection',
  'Supply chain optimisation',
  'Content generation & copywriting',
]

const PAIN_POINTS = [
  'Too many manual / repetitive processes',
  'Lack of data insights for decision making',
  'Poor customer experience & slow response times',
  'High operational costs',
  'Difficulty scaling the business',
  'Lack of skilled digital & AI talent',
  'Outdated legacy systems',
  'Cybersecurity & data privacy concerns',
  'No clear AI or digital strategy',
  'Marketing & lead generation challenges',
  'Data privacy & PDPA compliance',
]

const FOLLOWUP_QUESTIONS = {
  'Marketing & lead generation challenges': {
    label: 'Which marketing channels are you currently using?',
    options: ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'Google Ads', 'Email Marketing', 'SEO / Blog', 'None yet'],
    field: 'marketingChannels'
  },
  'Poor customer experience & slow response times': {
    label: 'Where does the customer experience break down most?',
    options: ['Response time too slow', 'No self-service options', 'Inconsistent service quality', 'Poor after-sales support', 'No feedback system'],
    field: 'cxBreakdown'
  },
  'Cybersecurity & data privacy concerns': {
    label: 'What are your main cybersecurity worries?',
    options: ['Data breaches', 'Phishing attacks', 'No backup system', 'Weak access control', 'No incident response plan'],
    field: 'cyberConcerns'
  },
  'Data privacy & PDPA compliance': {
    label: 'Which PDPA areas concern you most?',
    options: ['Customer data collection', 'Data storage & security', 'Third-party data sharing', 'No DPO appointed', 'Staff not trained on PDPA'],
    field: 'pdpaConcerns'
  },
  'Lack of data insights for decision making': {
    label: 'What is the state of your business data?',
    options: ['Data is scattered across systems', 'No central data storage', 'Data quality is poor', 'No analytics tools', 'Data exists but unused'],
    field: 'dataState'
  },
}

export default function Form() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', jobTitle: '',
    companyName: '', industry: '', employeeCount: '', revenue: '',
    websiteUrl: '', currentAiTools: '', aiAwarenessLevel: '2',
    dataAvailability: '', techInfrastructure: '', aiInterests: [],
    painPoints: [], otherPainPoints: '',
    marketingChannels: [], cxBreakdown: [], cyberConcerns: [],
    pdpaConcerns: [], dataState: []
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const toggleItem = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(x => x !== item)
        : [...prev[field], item]
    }))
  }

  const handleSubmit = () => navigate('/results', { state: { formData: form } })

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 10,
    border: '1.5px solid var(--border)', fontSize: '0.95rem',
    fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none',
    background: 'white', color: 'var(--text-dark)', marginTop: 6
  }

  const labelStyle = {
    fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-mid)',
    display: 'block', marginBottom: 2
  }

  const chipStyle = (selected) => ({
    padding: '8px 16px', borderRadius: 50, cursor: 'pointer',
    fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.15s ease',
    border: `2px solid ${selected ? '#1e90ff' : 'var(--border)'}`,
    background: selected ? '#e8f4ff' : 'white',
    color: selected ? '#1e90ff' : 'var(--text-dark)',
  })

  const totalSteps = 4

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', padding: '0' }}>

      {/* Top Nav */}
      <div style={{ background: '#0a0f1e', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/SAIA_white.jpeg" alt="Singapore AI Association" style={{ height: 36, objectFit: 'contain' }} />
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>Powered by Pantherpulse</span>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontSize: '1.9rem', color: 'var(--text-dark)', marginBottom: 8 }}>AI Readiness Assessment</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>
            Step {step} of {totalSteps} — {
              step === 1 ? 'Your Details' :
              step === 2 ? 'Company Profile' :
              step === 3 ? 'AI Readiness' :
              'Pain Points & Goals'
            }
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 10, marginBottom: 32 }}>
          <div style={{ height: '100%', width: `${(step / totalSteps) * 100}%`, background: '#1e90ff', borderRadius: 10, transition: 'width 0.4s ease' }} />
        </div>

        <div className="card">

          {/* STEP 1 — Contact */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Your Contact Details</h2>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input style={inputStyle} placeholder="e.g. John Tan" value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Work Email *</label>
                <input style={inputStyle} type="email" placeholder="e.g. john@company.com.sg" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Job Title *</label>
                <input style={inputStyle} placeholder="e.g. CEO, Operations Manager" value={form.jobTitle} onChange={e => update('jobTitle', e.target.value)} />
              </div>
              <button className="btn-primary" style={{ marginTop: 8, alignSelf: 'flex-end', background: '#1e90ff' }}
                disabled={!form.name || !form.email || !form.jobTitle}
                onClick={() => setStep(2)}>
                Next →
              </button>
            </div>
          )}

          {/* STEP 2 — Company */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Company Profile</h2>
              <div>
                <label style={labelStyle}>Company Name *</label>
                <input style={inputStyle} placeholder="e.g. ABC Pte Ltd" value={form.companyName} onChange={e => update('companyName', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Company Website (optional but recommended)</label>
                <input style={inputStyle} placeholder="e.g. https://www.yourcompany.com.sg" value={form.websiteUrl} onChange={e => update('websiteUrl', e.target.value)} />
                <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 4 }}>
                  💡 We'll analyse your website to tailor AI recommendations more accurately
                </p>
              </div>
              <div>
                <label style={labelStyle}>Industry *</label>
                <select style={inputStyle} value={form.industry} onChange={e => update('industry', e.target.value)}>
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>No. of Employees *</label>
                  <select style={inputStyle} value={form.employeeCount} onChange={e => update('employeeCount', e.target.value)}>
                    <option value="">Select</option>
                    <option>1–10</option><option>11–50</option>
                    <option>51–200</option><option>201–500</option><option>500+</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Annual Revenue</label>
                  <select style={inputStyle} value={form.revenue} onChange={e => update('revenue', e.target.value)}>
                    <option value="">Select</option>
                    <option>Under S$1M</option><option>S$1M–S$10M</option>
                    <option>S$10M–S$50M</option><option>Above S$50M</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary" style={{ background: '#1e90ff' }}
                  disabled={!form.companyName || !form.industry || !form.employeeCount}
                  onClick={() => setStep(3)}>Next →</button>
              </div>
            </div>
          )}

          {/* STEP 3 — AI Readiness */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>AI Readiness Profile</h2>
              <div>
                <label style={labelStyle}>Current AI or Automation Tools Used</label>
                <input style={inputStyle} placeholder="e.g. ChatGPT, Zapier, Excel macros, none"
                  value={form.currentAiTools} onChange={e => update('currentAiTools', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Current Tech Infrastructure</label>
                <select style={inputStyle} value={form.techInfrastructure} onChange={e => update('techInfrastructure', e.target.value)}>
                  <option value="">Select the best description</option>
                  <option>Mostly paper-based / manual</option>
                  <option>Basic software (Excel, email, WhatsApp)</option>
                  <option>Some cloud tools (Google Workspace, Microsoft 365)</option>
                  <option>Established cloud systems (CRM, ERP, etc.)</option>
                  <option>Advanced digital infrastructure with APIs and integrations</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Data Availability & Quality</label>
                <select style={inputStyle} value={form.dataAvailability} onChange={e => update('dataAvailability', e.target.value)}>
                  <option value="">Select the best description</option>
                  <option>No structured data collected</option>
                  <option>Some data in spreadsheets but disorganised</option>
                  <option>Data collected but siloed across systems</option>
                  <option>Centralised data with reasonable quality</option>
                  <option>Clean, structured data ready for AI use</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>
                  Team AI Awareness: {['', 'No awareness', 'Heard of AI but not used it', 'Some staff use AI tools personally', 'Actively exploring AI for business', 'Already piloting AI projects'][form.aiAwarenessLevel]}
                </label>
                <input type="range" min="1" max="5" value={form.aiAwarenessLevel}
                  onChange={e => update('aiAwarenessLevel', e.target.value)}
                  style={{ width: '100%', marginTop: 8, accentColor: '#1e90ff' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                  <span>No awareness</span><span>Actively piloting</span>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Which AI use cases interest you most?</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                  {AI_USE_CASE_INTERESTS.map(item => (
                    <div key={item} onClick={() => toggleItem('aiInterests', item)}
                      style={{
                        padding: '11px 16px', borderRadius: 10, cursor: 'pointer',
                        border: `2px solid ${form.aiInterests.includes(item) ? '#1e90ff' : 'var(--border)'}`,
                        background: form.aiInterests.includes(item) ? '#e8f4ff' : 'white',
                        display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s ease'
                      }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                        border: `2px solid ${form.aiInterests.includes(item) ? '#1e90ff' : 'var(--border)'}`,
                        background: form.aiInterests.includes(item) ? '#1e90ff' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {form.aiInterests.includes(item) && <span style={{ color: 'white', fontSize: '0.65rem' }}>✓</span>}
                      </div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
                <button className="btn-primary" style={{ background: '#1e90ff' }} onClick={() => setStep(4)}>Next →</button>
              </div>
            </div>
          )}

          {/* STEP 4 — Pain Points */}
          {/* FIX 6 — Follow-up appears inline directly below selected pain point */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Business Challenges</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: -8, marginBottom: 8 }}>Select all that apply</p>

              {PAIN_POINTS.map(point => (
                <div key={point}>
                  {/* Pain point row */}
                  <div
                    onClick={() => toggleItem('painPoints', point)}
                    style={{
                      padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                      border: `2px solid ${form.painPoints.includes(point) ? '#1e90ff' : 'var(--border)'}`,
                      background: form.painPoints.includes(point) ? '#e8f4ff' : 'white',
                      display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s ease'
                    }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                      border: `2px solid ${form.painPoints.includes(point) ? '#1e90ff' : 'var(--border)'}`,
                      background: form.painPoints.includes(point) ? '#1e90ff' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {form.painPoints.includes(point) && <span style={{ color: 'white', fontSize: '0.7rem' }}>✓</span>}
                    </div>
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-dark)' }}>{point}</span>
                  </div>

                  {/* FIX 6 — Follow-up question appears directly below if selected */}
                  {form.painPoints.includes(point) && FOLLOWUP_QUESTIONS[point] && (() => {
                    const q = FOLLOWUP_QUESTIONS[point]
                    return (
                      <div style={{
                        background: '#e8f4ff', border: '1.5px solid #90caf9',
                        borderRadius: '0 0 10px 10px', padding: '14px 16px',
                        marginTop: -2
                      }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1565c0', marginBottom: 10 }}>
                          ↳ {q.label}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {q.options.map(opt => (
                            <div key={opt}
                              onClick={e => {
                                e.stopPropagation()
                                const current = form[q.field] || []
                                update(q.field, current.includes(opt)
                                  ? current.filter(x => x !== opt)
                                  : [...current, opt])
                              }}
                              style={chipStyle((form[q.field] || []).includes(opt))}>
                              {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              ))}

              <div style={{ marginTop: 12 }}>
                <label style={labelStyle}>Any other challenges or context? (optional)</label>
                <textarea style={{ ...inputStyle, height: 90, resize: 'vertical' }}
                  placeholder="Tell us anything else about your AI ambitions or concerns..."
                  value={form.otherPainPoints}
                  onChange={e => update('otherPainPoints', e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setStep(3)}>← Back</button>
                <button className="btn-primary" style={{ background: '#1e90ff' }}
                  disabled={form.painPoints.length === 0}
                  onClick={handleSubmit}>
                  Generate My AI Report 🚀
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingBottom: 40 }}>
          <img src="/SAIA_black.jpeg" alt="SAIA" style={{ height: 24, objectFit: 'contain', opacity: 0.4 }} />
          <p style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginTop: 8 }}>© 2025 Singapore A.I. Association · Powered by Pantherpulse</p>
        </div>

      </div>
    </div>
  )
}