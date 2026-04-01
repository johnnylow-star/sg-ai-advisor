import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b2a 0%, #0f4c81 60%, #1a6bbf 100%)' }}>

      {/* Nav */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: '#e8630a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '1rem' }}>AI</div>
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.2 }}>Singapore AI Association</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI Readiness Toolkit</div>
          </div>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>Powered by Claude AI</span>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 48px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(232,99,10,0.2)', border: '1px solid rgba(232,99,10,0.4)', borderRadius: 50, padding: '6px 20px', marginBottom: 32 }}>
          <span style={{ color: '#ff8c42', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Free AI Readiness Assessment</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'white', marginBottom: 24, fontFamily: 'Fraunces, serif', lineHeight: 1.15 }}>
          Is Your Business <br />
          <em style={{ color: '#ff8c42', fontStyle: 'italic' }}>Ready for AI?</em>
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', maxWidth: 620, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Get a personalised AI Readiness Report for your Singapore business — including your readiness score, recommended AI use cases, workforce upskilling plan, and matched government grants.
        </p>

        <button className="btn-primary" onClick={() => navigate('/form')} style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
          Start Free Assessment →
        </button>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: 16 }}>Takes 3 minutes · No payment required · Instant results</p>
      </div>

      {/* Readiness Dimensions */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px 40px' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>We assess your AI readiness across 5 dimensions</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { icon: '🗄️', title: 'Data Readiness', desc: 'Quality, availability and governance of your data' },
            { icon: '🧭', title: 'AI Strategy', desc: 'Leadership alignment and AI vision' },
            { icon: '👥', title: 'Workforce & Skills', desc: 'Team capability and AI literacy' },
            { icon: '⚙️', title: 'Tech Infrastructure', desc: 'Systems and tools to support AI' },
            { icon: '🛡️', title: 'Ethics & Governance', desc: 'Responsible and compliant AI adoption' },
          ].map((d, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '22px 18px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{d.icon}</div>
              <h3 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, marginBottom: 6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{d.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.5 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 16 }}>
        {[
          { icon: '🎯', title: 'AI Readiness Score', desc: 'Scored across 5 dimensions with a clear overall rating' },
          { icon: '🤖', title: 'AI Use Cases', desc: 'Specific AI applications recommended for your industry' },
          { icon: '🎓', title: 'Workforce AI Plan', desc: 'Upskilling roadmap to build your team\'s AI capabilities' },
          { icon: '💰', title: 'Grant Matching', desc: 'Singapore grants like DLP, PSG and EDG matched to your plan' },
        ].map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '28px 24px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px 48px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>© 2025 Singapore AI Association · AI Readiness Toolkit · Non-profit initiative</p>
      </div>

    </div>
  )
}