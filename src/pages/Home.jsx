import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0f1e 0%, #0d2a4a 50%, #0f4c81 100%)' }}>

      {/* Nav */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img src="/SAIA_white.jpeg" alt="Singapore AI Association" style={{ height: 40, objectFit: 'contain' }} />
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', letterSpacing: '0.04em' }}>Powered by Pantherpulse</span>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 48px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(30,144,255,0.15)', border: '1px solid rgba(30,144,255,0.35)', borderRadius: 50, padding: '6px 20px', marginBottom: 32 }}>
          <span style={{ color: '#60b4ff', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Free AI Readiness Assessment</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'white', marginBottom: 24, fontFamily: 'Fraunces, serif', lineHeight: 1.15 }}>
          Is Your Business <br />
          <em style={{ color: '#60b4ff', fontStyle: 'italic' }}>Ready for AI?</em>
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 620, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Get a personalised AI Readiness Report for your Singapore business — including your readiness score, recommended AI use cases, workforce upskilling plan, and matched government grants.
        </p>

        <button className="btn-primary" onClick={() => navigate('/form')} style={{ fontSize: '1.1rem', padding: '16px 40px', background: '#1e90ff' }}>
          Start Free Assessment →
        </button>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', marginTop: 16 }}>Takes 3 minutes · No payment required · Instant results</p>
      </div>

      {/* FIX 5 — Section 1: AI Readiness Dimensions */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px 20px' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
          We assess your AI readiness across 5 dimensions
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16 }}>
          {[
            { icon: '🗄️', title: 'Data Readiness', desc: 'Quality, availability and governance of your data' },
            { icon: '🧭', title: 'AI Strategy', desc: 'Leadership alignment and AI vision' },
            { icon: '👥', title: 'Workforce & Skills', desc: 'Team capability and AI literacy' },
            { icon: '⚙️', title: 'Tech Infrastructure', desc: 'Systems and tools to support AI' },
            { icon: '🛡️', title: 'Ethics & Governance', desc: 'Responsible and compliant AI adoption' },
          ].map((d, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '22px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{d.icon}</div>
              <h3 style={{ color: 'white', fontSize: '0.88rem', fontWeight: 700, marginBottom: 6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{d.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.5 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FIX 5 — Divider + Section 2 subheader clearly separated */}
      <div style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 48px 80px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40, marginBottom: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            What you'll receive
          </p>
          <p style={{ color: 'white', textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Fraunces, serif', marginBottom: 24 }}>
            Your personalised AI Readiness Report includes
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {[
            { icon: '🎯', title: 'AI Readiness Score', desc: 'Scored across 5 dimensions with a clear overall rating and gap analysis' },
            { icon: '🤖', title: 'AI Use Cases', desc: 'Specific AI applications recommended for your industry and pain points' },
            { icon: '🎓', title: 'Workforce AI Plan', desc: 'Upskilling roadmap to build your team\'s AI capabilities at every level' },
            { icon: '💰', title: 'Grant Matching', desc: 'Singapore grants like DLP, PSG and EDG matched specifically to your plan' },
          ].map((f, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '28px 24px' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <img src="/SAIA_white.jpeg" alt="SAIA" style={{ height: 28, objectFit: 'contain', opacity: 0.6 }} />
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>© 2025 Singapore A.I. Association · Non-profit initiative · Powered by Pantherpulse</p>
      </div>

    </div>
  )
}