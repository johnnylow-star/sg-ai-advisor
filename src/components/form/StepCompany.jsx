const INDUSTRIES = ['Manufacturing', 'Retail & E-commerce', 'F&B', 'Logistics & Supply Chain', 'Healthcare', 'Education', 'Finance & Insurance', 'Construction & Real Estate', 'Professional Services', 'Other']

export default function StepCompany({ form, update, onNext, onBack }) {
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
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-primary" style={{ background: '#1e90ff' }}
          disabled={!form.companyName || !form.industry || !form.employeeCount}
          onClick={onNext}>Next →</button>
      </div>
    </div>
  )
}