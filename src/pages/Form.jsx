import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INDUSTRIES = ['Manufacturing', 'Retail & E-commerce', 'F&B', 'Logistics & Supply Chain', 'Healthcare', 'Education', 'Finance & Insurance', 'Construction & Real Estate', 'Professional Services', 'Other']

const PAIN_POINTS = [
  'Too many manual / paper-based processes',
  'Lack of real-time data and visibility',
  'Poor customer experience',
  'Difficulty managing remote or hybrid teams',
  'High operational costs',
  'Outdated legacy systems',
  'Cybersecurity concerns',
  'Inability to scale operations',
  'Lack of skilled digital talent',
  'No clear digital strategy',
  'Marketing & lead generation challenges',
  'Data privacy & PDPA compliance',
]

const FOLLOWUP_QUESTIONS = {
  'Marketing & lead generation challenges': {
    label: 'Which marketing channels are you currently using?',
    options: ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'Google Ads', 'Email Marketing', 'SEO / Blog', 'None yet'],
    field: 'marketingChannels'
  },
  'Poor customer experience': {
    label: 'Where does the customer experience break down most?',
    options: ['Response time too slow', 'No self-service options', 'Inconsistent service quality', 'Poor after-sales support', 'No feedback system'],
    field: 'cxBreakdown'
  },
  'Cybersecurity concerns': {
    label: 'What are your main cybersecurity worries?',
    options: ['Data breaches', 'Phishing attacks', 'No backup system', 'Weak passwords / access control', 'No incident response plan'],
    field: 'cyberConcerns'
  },
  'Difficulty managing remote or hybrid teams': {
    label: 'What makes remote management difficult?',
    options: ['No collaboration tools', 'Hard to track productivity', 'Communication gaps', 'Onboarding new staff remotely', 'No HR system'],
    field: 'remoteIssues'
  },
  'Data privacy & PDPA compliance': {
    label: 'Which PDPA areas concern you most?',
    options: ['Customer data collection', 'Data storage & security', 'Third-party data sharing', 'No DPO appointed', 'Staff not trained on PDPA'],
    field: 'pdpaConcerns'
  },
}

export default function Form() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', jobTitle: '',
    companyName: '', industry: '', employeeCount: '', revenue: '',
    currentTools: '', techLevel: '3', websiteUrl: '',
    painPoints: [], otherPainPoints: '',
    marketingChannels: [], cxBreakdown: [], cyberConcerns: [],
    remoteIssues: [], pdpaConcerns: []
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const togglePain = (point) => {
    setForm(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter(p => p !== point)
        : [...prev.painPoints, point]
    }))
  }

  const handleSubmit = () => {
    navigate('/results', { state: { formData: form } })
  }

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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, background: '#e8630a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>SG</div>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>AI Advisor</span>
          </div>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: 8 }}>Company Assessment</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Step {step} of 3 — {step === 1 ? 'Your Details' : step === 2 ? 'Company Profile' : 'Pain Points'}</p>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 10, marginBottom: 36 }}>
          <div style={{ height: '100%', width: `${(step / 3) * 100}%`, background: 'var(--accent)', borderRadius: 10, transition: 'width 0.4s ease' }} />
        </div>

        <div className="card">

          {/* Step 1 — Contact Details */}
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
              <button className="btn-primary" style={{ marginTop: 8, alignSelf: 'flex-end' }}
                disabled={!form.name || !form.email || !form.jobTitle}
                onClick={() => setStep(2)}>
                Next →
              </button>
            </div>
          )}

          {/* Step 2 — Company Profile */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Company Profile</h2>
              <div>
                <label style={labelStyle}>Company Name *</label>
                <input style={inputStyle} placeholder="e.g. ABC Pte Ltd" value={form.companyName} onChange={e => update('companyName', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Company Website (optional)</label>
                <input style={inputStyle} placeholder="e.g. https://www.yourcompany.com.sg" value={form.websiteUrl} onChange={e => update('websiteUrl', e.target.value)} />
                <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: 4 }}>
                  💡 Providing your website helps us tailor the roadmap more accurately to your business
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
                    <option>1–10</option>
                    <option>11–50</option>
                    <option>51–200</option>
                    <option>201–500</option>
                    <option>500+</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Annual Revenue</label>
                  <select style={inputStyle} value={form.revenue} onChange={e => update('revenue', e.target.value)}>
                    <option value="">Select</option>
                    <option>Under S$1M</option>
                    <option>S$1M–S$10M</option>
                    <option>S$10M–S$50M</option>
                    <option>Above S$50M</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Current Tools / Systems Used</label>
                <input style={inputStyle} placeholder="e.g. Excel, WhatsApp, QuickBooks" value={form.currentTools} onChange={e => update('currentTools', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Digital Maturity Level: {['', 'Very Basic', 'Basic', 'Moderate', 'Advanced', 'Very Advanced'][form.techLevel]}</label>
                <input type="range" min="1" max="5" value={form.techLevel}
                  onChange={e => update('techLevel', e.target.value)}
                  style={{ width: '100%', marginTop: 8, accentColor: 'var(--accent)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-light)' }}>
                  <span>Very Basic</span><span>Very Advanced</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary"
                  disabled={!form.companyName || !form.industry || !form.employeeCount}
                  onClick={() => setStep(3)}>Next →</button>
              </div>
            </div>
          )}

          {/* Step 3 — Pain Points */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>What are your biggest challenges?</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: -12 }}>Select all that apply</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PAIN_POINTS.map(point => (
                  <div key={point}
                    onClick={() => togglePain(point)}
                    style={{
                      padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                      border: `2px solid ${form.painPoints.includes(point) ? 'var(--accent)' : 'var(--border)'}`,
                      background: form.painPoints.includes(point) ? '#fff0e6' : 'white',
                      display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s ease'
                    }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6,
                      border: `2px solid ${form.painPoints.includes(point) ? 'var(--accent)' : 'var(--border)'}`,
                      background: form.painPoints.includes(point) ? 'var(--accent)' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      {form.painPoints.includes(point) && <span style={{ color: 'white', fontSize: '0.7rem' }}>✓</span>}
                    </div>
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-dark)' }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Follow-up Questions */}
              {form.painPoints.filter(p => FOLLOWUP_QUESTIONS[p]).map(point => {
                const q = FOLLOWUP_QUESTIONS[point]
                return (
                  <div key={point} style={{ background: '#f0f7ff', border: '1.5px solid #c0d8f5', borderRadius: 12, padding: '16px 20px' }}>
                    <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>
                      🔍 {point}: {q.label}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {q.options.map(opt => (
                        <div key={opt}
                          onClick={() => {
                            const current = form[q.field] || []
                            update(q.field, current.includes(opt)
                              ? current.filter(x => x !== opt)
                              : [...current, opt])
                          }}
                          style={{
                            padding: '7px 14px', borderRadius: 50, cursor: 'pointer',
                            fontSize: '0.85rem', fontWeight: 500,
                            border: `2px solid ${(form[q.field] || []).includes(opt) ? 'var(--accent)' : 'var(--border)'}`,
                            background: (form[q.field] || []).includes(opt) ? '#fff0e6' : 'white',
                            color: (form[q.field] || []).includes(opt) ? 'var(--accent)' : 'var(--text-dark)',
                            transition: 'all 0.15s ease'
                          }}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              <div>
                <label style={labelStyle}>Any other challenges? (optional)</label>
                <textarea style={{ ...inputStyle, height: 90, resize: 'vertical' }}
                  placeholder="Describe any other specific challenges..."
                  value={form.otherPainPoints}
                  onChange={e => update('otherPainPoints', e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <button className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
                <button className="btn-primary"
                  disabled={form.painPoints.length === 0}
                  onClick={handleSubmit}>
                  Generate My Roadmap 🚀
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}