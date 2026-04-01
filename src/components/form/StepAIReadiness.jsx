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

export default function StepAIReadiness({ form, update, toggleItem, onNext, onBack }) {
  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 10,
    border: '1.5px solid var(--border)', fontSize: '0.95rem',
    fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none',
    background: 'white', color: 'var(--text-dark)', marginTop: 6
  }
  const labelStyle = {
    fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-mid)', display: 'block', marginBottom: 2
  }

  return (
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
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-primary" style={{ background: '#1e90ff' }} onClick={onNext}>Next →</button>
      </div>
    </div>
  )
}