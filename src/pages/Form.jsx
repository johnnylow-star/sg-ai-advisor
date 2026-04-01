import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormNav from '../components/form/FormNav'
import FormProgress from '../components/form/FormProgress'
import StepContact from '../components/form/StepContact'
import StepCompany from '../components/form/StepCompany'
import StepAIReadiness from '../components/form/StepAIReadiness'
import StepPainPoints from '../components/form/StepPainPoints'

const INITIAL_FORM = {
  name: '', email: '', jobTitle: '',
  companyName: '', industry: '', employeeCount: '', revenue: '',
  websiteUrl: '', currentAiTools: '', aiAwarenessLevel: '2',
  dataAvailability: '', techInfrastructure: '', aiInterests: [],
  painPoints: [], otherPainPoints: '',
  marketingChannels: [], cxBreakdown: [], cyberConcerns: [],
  pdpaConcerns: [], dataState: []
}

export default function Form() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)

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

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <FormNav />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
        <FormProgress step={step} totalSteps={4} />
        <div className="card">
          {step === 1 && <StepContact form={form} update={update} onNext={() => setStep(2)} />}
          {step === 2 && <StepCompany form={form} update={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <StepAIReadiness form={form} update={update} toggleItem={toggleItem} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {step === 4 && <StepPainPoints form={form} update={update} toggleItem={toggleItem} onBack={() => setStep(3)} onSubmit={handleSubmit} />}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32, paddingBottom: 40 }}>
          <img src="/SAIA_black.jpeg" alt="SAIA" style={{ height: 24, objectFit: 'contain', opacity: 0.4 }} />
          <p style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginTop: 8 }}>© 2025 Singapore A.I. Association · Powered by Pantherpulse</p>
        </div>
      </div>
    </div>
  )
}