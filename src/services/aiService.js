const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

function getDataConfidenceScore(formData) {
  let score = 0
  if (formData.websiteUrl) score += 30
  if (formData.currentTools) score += 15
  if (formData.revenue) score += 10
  if (formData.otherPainPoints) score += 10
  if (formData.painPoints.length >= 3) score += 15
  if (formData.techLevel > 1) score += 10
  if (formData.employeeCount) score += 10
  return score
}

async function analyseWebsite(url) {
  if (!url) return null
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `Search for and summarise this company website: ${url}. 
          Return a brief summary covering: what the company does, their main products/services, 
          their apparent target market, and any digital presence observations. 
          Keep it under 200 words.`
        }]
      })
    })
    const data = await response.json()
    const textBlock = data.content?.find(b => b.type === 'text')
    return textBlock?.text || null
  } catch (err) {
    console.error('Website analysis failed:', err)
    return null
  }
}

export async function generateRoadmap(formData) {
  const confidenceScore = getDataConfidenceScore(formData)
  const isLowData = confidenceScore < 40
  const websiteSummary = await analyseWebsite(formData.websiteUrl)

  const disclaimerNote = isLowData
    ? `IMPORTANT: Limited company-specific information was provided. Clearly note in the executiveSummary that this roadmap is based on Singapore industry best practices for ${formData.industry} companies of ${formData.employeeCount} employees, and recommend the company seek a detailed consultation for a more tailored plan.`
    : ''

  const websiteContext = websiteSummary
    ? `WEBSITE ANALYSIS: ${websiteSummary}`
    : formData.websiteUrl
      ? 'Website was provided but could not be analysed. Base recommendations on the form data provided.'
      : 'No website provided. Base recommendations on form data and industry best practices.'

  const prompt = `You are a Singapore digital transformation consultant. Based on the following company profile, generate a detailed transformation roadmap.

COMPANY PROFILE:
- Contact: ${formData.name}, ${formData.jobTitle}
- Company: ${formData.companyName}
- Industry: ${formData.industry}
- Employees: ${formData.employeeCount}
- Annual Revenue: ${formData.revenue || 'Not provided'}
- Current Tools: ${formData.currentTools || 'Not provided'}
- Digital Maturity Level: ${formData.techLevel}/5
- Pain Points: ${formData.painPoints.join(', ')}
- Marketing Channels: ${formData.marketingChannels?.length ? formData.marketingChannels.join(', ') : 'N/A'}
- Customer Experience Issues: ${formData.cxBreakdown?.length ? formData.cxBreakdown.join(', ') : 'N/A'}
- Cybersecurity Concerns: ${formData.cyberConcerns?.length ? formData.cyberConcerns.join(', ') : 'N/A'}
- Remote Work Issues: ${formData.remoteIssues?.length ? formData.remoteIssues.join(', ') : 'N/A'}
- PDPA Concerns: ${formData.pdpaConcerns?.length ? formData.pdpaConcerns.join(', ') : 'N/A'}
- Additional Challenges: ${formData.otherPainPoints || 'None'}

${websiteContext}

Data Confidence Score: ${confidenceScore}/100
${disclaimerNote}

Return ONLY a valid JSON object with exactly this structure, no markdown, no explanation:
{
  "isLowDataPlan": ${isLowData},
  "confidenceScore": ${confidenceScore},
  "websiteInsights": "Brief note about what was learned from website analysis, or null if no website",
  "executiveSummary": "2-3 sentence summary. If low data, mention this is based on industry best practices.",
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
  "compliance": {
    "pdpa": {
      "overview": "Brief PDPA situation assessment for this company",
      "obligations": ["obligation 1", "obligation 2", "obligation 3"],
      "actions": ["action 1", "action 2", "action 3"],
      "resources": [{"name": "resource name", "url": "https://..."}]
    },
    "cybersecurity": {
      "overview": "Brief cybersecurity posture assessment",
      "risks": ["risk 1", "risk 2", "risk 3"],
      "actions": ["action 1", "action 2", "action 3"],
      "resources": [{"name": "resource name", "url": "https://..."}]
    },
    "aiGovernance": {
      "overview": "Brief AI governance assessment relevant to their transformation",
      "principles": ["principle 1", "principle 2", "principle 3"],
      "actions": ["action 1", "action 2", "action 3"],
      "resources": [{"name": "resource name", "url": "https://..."}]
    }
  },
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
}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  const text = data.content[0].text
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}