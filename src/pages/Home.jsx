import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b2a 0%, #0f4c81 60%, #1a6bbf 100%)' }}>
      
      {/* Nav */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 36, height: 36, background: '#e8630a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '1.1rem' }}>SG</div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>AI Advisor</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Powered by Claude AI</span>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 48px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(232,99,10,0.2)', border: '1px solid rgba(232,99,10,0.4)', borderRadius: 50, padding: '6px 20px', marginBottom: 32 }}>
          <span style={{ color: '#ff8c42', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Singapore Digital Transformation</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'white', marginBottom: 24, fontFamily: 'Fraunces, serif' }}>
          Your AI-Powered <br />
          <em style={{ color: '#ff8c42', fontStyle: 'italic' }}>Transformation Roadmap</em>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)', maxWidth: 620, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Tell us about your business and we'll generate a personalised digital transformation plan — complete with methodology, workforce training, and matched Singapore government grants.
        </p>

        <button className="btn-primary" onClick={() => navigate('/form')} style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
          Start My Free Assessment →
        </button>
      </div>

      {/* Feature Cards */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {[
          { icon: '🗺️', title: 'Custom Roadmap', desc: 'A phased transformation plan built around your industry and size' },
          { icon: '🎓', title: 'Training Plan', desc: 'Workforce upskilling resources matched to your skill gaps' },
          { icon: '💰', title: 'Grant Matching', desc: 'Singapore grants like PSG, EDG and DLP matched to your proposal' },
          { icon: '🤖', title: 'AI-Generated', desc: 'Powered by Claude AI for intelligent, context-aware recommendations' },
        ].map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 24px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}