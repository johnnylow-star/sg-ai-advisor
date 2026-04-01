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

export default function StepPainPoints({ form, update, toggleItem, onBack, onSubmit }) {
  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 10,
    border: '1.5px solid var(--border)', fontSize: '0.95rem',
    fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none',
    background: 'white', color: 'var(--text-dark)', marginTop: 6
  }
  const labelStyle = {
    fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-mid)', display: 'block', marginBottom: 2
  }
  const chipStyle = (selected) => ({
    padding: '8px 16px', borderRadius: 50, cursor: 'pointer',
    fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.15s ease',
    border: `2px solid ${selected ? '#1e90ff' : 'var(--border)'}`,
    background: selected ? '#e8f4ff' : 'white',
    color: selected ? '#1e90ff' : 'var(--text-dark)',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Business Challenges</h2>
      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: -8, marginBottom: 8 }}>Select all that apply</p>

      {PAIN_POINTS.map(point => (
        <div key={point}>
          <div onClick={() => toggleItem('painPoints', point)}
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

          {form.painPoints.includes(point) && FOLLOWUP_QUESTIONS[point] && (() => {
            const q = FOLLOWUP_QUESTIONS[point]
            return (
              <div style={{ background: '#e8f4ff', border: '1.5px solid #90caf9', borderRadius: 10, padding: '14px 16px', marginTop: 6 }}>
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
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-primary" style={{ background: '#1e90ff' }}
          disabled={form.painPoints.length === 0}
          onClick={onSubmit}>
          Generate My AI Report 🚀
        </button>
      </div>
    </div>
  )
}