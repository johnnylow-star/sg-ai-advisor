const STEP_LABELS = {
  1: 'Your Details',
  2: 'Company Profile',
  3: 'AI Readiness',
  4: 'Pain Points & Goals'
}

export default function FormProgress({ step, totalSteps }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 36 }}>
      <h1 style={{ fontSize: '1.9rem', color: 'var(--text-dark)', marginBottom: 8 }}>AI Readiness Assessment</h1>
      <p style={{ color: 'var(--text-light)', fontSize: '0.92rem' }}>
        Step {step} of {totalSteps} — {STEP_LABELS[step]}
      </p>
      <div style={{ height: 6, background: 'var(--border)', borderRadius: 10, marginTop: 20 }}>
        <div style={{ height: '100%', width: `${(step / totalSteps) * 100}%`, background: '#1e90ff', borderRadius: 10, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )
}