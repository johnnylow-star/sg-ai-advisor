export default function StepContact({ form, update, onNext }) {
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
        onClick={onNext}>
        Next →
      </button>
    </div>
  )
}