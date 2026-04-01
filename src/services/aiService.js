const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export async function generateRoadmap(formData) {
  const prompt = `You are a Singapore digital transformation consultant. Based on the following company profile, generate a detailed transformation roadmap.

COMPANY PROFILE:
- Contact: ${formData.name}, ${formData.jobTitle}
- Company: ${formData.companyName}
- Industry: ${formData.industry}
- Employees: ${formData.employeeCount}
- Annual Revenue: ${formData.revenue}
- Current Tools: ${formData.currentTools}
- Digital Maturity Level: ${formData.techLevel}/5
- Pain Points: ${formData.painPoints.join(', ')}
- Additional Challenges: ${formData.otherPainPoints}

Return ONLY a valid JSON object with exactly this structure, no markdown, no explanation:
{
  "executiveSummary": "2-3 sentence summary of the company situation and transformation opportunity",
  "solutionIdeology": {
    "title": "e.g. Cloud-First, AI-Augmented Operations",
    "description": "2-3 sentences explaining the core philosophy",
    "principles": ["principle 1", "principle 2", "principle 3"]
  },
  "methodology": {
    "name": "e.g. Agile Digital Transformation",
    "description": "Brief description of the methodology",
    "steps": ["step 1", "step 2", "step 3", "step 4"]
  },
  "roadmap": [
    {
      "phase": "Phase 1",
      "title": "Assess & Foundation",
      "duration": "Month 1-3",
      "focus": "Brief focus description",
      "actions": ["action 1", "action 2", "action 3"]
    },
    {
      "phase": "Phase 2",
      "title": "Pilot & Build",
      "duration": "Month 4-8",
      "focus": "Brief focus description",
      "actions": ["action 1", "action 2", "action 3"]
    },
    {
      "phase": "Phase 3",
      "title": "Scale & Optimise",
      "duration": "Month 9-12",
      "focus": "Brief focus description",
      "actions": ["action 1", "action 2", "action 3"]
    }
  ],
  "trainingPlan": [
    {
      "role": "e.g. Management & Leadership",
      "skills": ["skill 1", "skill 2"],
      "resources": ["resource 1", "resource 2"],
      "provider": "e.g. SkillsFuture, IMDA"
    },
    {
      "role": "e.g. Operations Staff",
      "skills": ["skill 1", "skill 2"],
      "resources": ["resource 1", "resource 2"],
      "provider": "e.g. SkillsFuture, Coursera"
    },
    {
      "role": "e.g. IT / Digital Team",
      "skills": ["skill 1", "skill 2"],
      "resources": ["resource 1", "resource 2"],
      "provider": "e.g. AWS, Google, Microsoft"
    }
  ],
  "grants": [
    {
      "name": "Productivity Solutions Grant (PSG)",
      "body": "EnterpriseSG & IMDA",
      "support": "Up to 50% funding",
      "relevance": "Why this grant fits this company specifically",
      "url": "https://www.enterprisesg.gov.sg/financial-support/productivity-solutions-grant"
    },
    {
      "name": "Enterprise Development Grant (EDG)",
      "body": "EnterpriseSG",
      "support": "Up to 50% funding",
      "relevance": "Why this grant fits this company specifically",
      "url": "https://www.enterprisesg.gov.sg/financial-support/enterprise-development-grant"
    },
    {
      "name": "SkillsFuture Enterprise Credit (SFEC)",
      "body": "SkillsFuture Singapore",
      "support": "S$10,000 one-time credit",
      "relevance": "Why this grant fits this company specifically",
      "url": "https://www.skillsfuture.gov.sg/sfec"
    }
  ]
}
`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  const text = data.content[0].text
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}