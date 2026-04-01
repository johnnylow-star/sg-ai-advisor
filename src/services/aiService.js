const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

function getDataConfidenceScore(formData) {
  let score = 0
  if (formData.websiteUrl) score += 20
  if (formData.currentAiTools) score += 15
  if (formData.techInfrastructure) score += 15
  if (formData.dataAvailability) score += 15
  if (formData.revenue) score += 10
  if (formData.painPoints.length >= 3) score += 10
  if (formData.aiInterests.length >= 2) score += 10
  if (formData.otherPainPoints) score += 5
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
          content: `Search for and analyse this company website: ${url}.
          Return a brief summary covering:
          1. What the company does and their main products/services
          2. Their apparent target market and customers
          3. Current digital presence and technology signals
          4. Any visible signs of existing AI or automation use
          5. Key business processes visible from the website
          Keep it under 200 words and be specific.`
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
    ? `IMPORTANT: Limited company-specific information was provided. Clearly note in the executiveSummary that this AI readiness report is based on Singapore industry benchmarks for ${formData.industry} companies of ${formData.employeeCount} employees. Recommend they complete a full consultation with the Singapore AI Association for a more tailored assessment.`
    : ''

  const websiteContext = websiteSummary
    ? `WEBSITE ANALYSIS:\n${websiteSummary}`
    : formData.websiteUrl
      ? 'Website provided but could not be analysed. Base recommendations on form data.'
      : 'No website provided. Base recommendations on form data and Singapore industry benchmarks.'

  const prompt = `You are an AI readiness consultant from the Singapore AI Association (SAIA), a non-profit organisation helping Singapore businesses adopt AI responsibly and effectively. 

Analyse the following company profile and generate a comprehensive AI Readiness Report.

COMPANY PROFILE:
- Contact: ${formData.name}, ${formData.jobTitle}
- Company: ${formData.companyName}
- Industry: ${formData.industry}
- Employees: ${formData.employeeCount}
- Annual Revenue: ${formData.revenue || 'Not provided'}
- Website: ${formData.websiteUrl || 'Not provided'}

AI READINESS INPUTS:
- Current AI/Automation Tools: ${formData.currentAiTools || 'None mentioned'}
- Tech Infrastructure: ${formData.techInfrastructure || 'Not specified'}
- Data Availability & Quality: ${formData.dataAvailability || 'Not specified'}
- Team AI Awareness Level: ${formData.aiAwarenessLevel}/5
- AI Use Case Interests: ${formData.aiInterests?.join(', ') || 'None selected'}

BUSINESS CHALLENGES:
- Pain Points: ${formData.painPoints?.join(', ') || 'None selected'}
- Marketing Channels: ${formData.marketingChannels?.length ? formData.marketingChannels.join(', ') : 'N/A'}
- Customer Experience Issues: ${formData.cxBreakdown?.length ? formData.cxBreakdown.join(', ') : 'N/A'}
- Cybersecurity Concerns: ${formData.cyberConcerns?.length ? formData.cyberConcerns.join(', ') : 'N/A'}
- PDPA Concerns: ${formData.pdpaConcerns?.length ? formData.pdpaConcerns.join(', ') : 'N/A'}
- Data Challenges: ${formData.dataState?.length ? formData.dataState.join(', ') : 'N/A'}
- Additional Context: ${formData.otherPainPoints || 'None'}

${websiteContext}

Data Confidence Score: ${confidenceScore}/100
${disclaimerNote}

Return ONLY a valid JSON object with exactly this structure, no markdown, no explanation:
{
  "isLowDataPlan": ${isLowData},
  "confidenceScore": ${confidenceScore},
  "websiteInsights": "2-3 sentence summary of website analysis findings relevant to AI readiness, or null if no website",
  "executiveSummary": "3-4 sentences summarising the company's current AI readiness situation, key opportunities, and the overall recommendation from SAIA's perspective.",
  "readinessScores": {
    "overall": 42,
    "dataReadiness": {
      "score": 35,
      "label": "Developing",
      "insight": "One sentence explaining this score"
    },
    "aiStrategy": {
      "score": 50,
      "label": "Emerging",
      "insight": "One sentence explaining this score"
    },
    "workforceSkills": {
      "score": 40,
      "label": "Developing",
      "insight": "One sentence explaining this score"
    },
    "techInfrastructure": {
      "score": 55,
      "label": "Emerging",
      "insight": "One sentence explaining this score"
    },
    "ethicsGovernance": {
      "score": 30,
      "label": "Beginning",
      "insight": "One sentence explaining this score"
    }
  },
  "readinessLevel": {
    "label": "AI Emerging",
    "description": "2-3 sentences describing what this overall readiness level means for the company"
  },
  "aiUseCases": [
    {
      "title": "Use case title e.g. AI Customer Support Chatbot",
      "priority": "High",
      "effort": "Low",
      "description": "2 sentences explaining this use case and its benefit",
      "tools": ["Tool 1", "Tool 2"],
      "estimatedImpact": "e.g. 30% reduction in response time"
    },
    {
      "title": "Use case title",
      "priority": "High",
      "effort": "Medium",
      "description": "2 sentences explaining this use case and its benefit",
      "tools": ["Tool 1", "Tool 2"],
      "estimatedImpact": "e.g. 20% cost savings"
    },
    {
      "title": "Use case title",
      "priority": "Medium",
      "effort": "Medium",
      "description": "2 sentences explaining this use case and its benefit",
      "tools": ["Tool 1", "Tool 2"],
      "estimatedImpact": "e.g. 2x faster processing"
    }
  ],
  "roadmap": [
    {
      "phase": "Phase 1",
      "title": "AI Foundation",
      "duration": "Month 1-3",
      "focus": "Build the data and infrastructure foundation for AI",
      "actions": ["action 1", "action 2", "action 3", "action 4"]
    },
    {
      "phase": "Phase 2",
      "title": "AI Pilot",
      "duration": "Month 4-6",
      "focus": "Launch 1-2 high impact AI pilots",
      "actions": ["action 1", "action 2", "action 3", "action 4"]
    },
    {
      "phase": "Phase 3",
      "title": "AI Scale",
      "duration": "Month 7-12",
      "focus": "Scale successful pilots and build AI culture",
      "actions": ["action 1", "action 2", "action 3", "action 4"]
    }
  ],
  "trainingPlan": [
    {
      "role": "Leadership & Management",
      "skills": ["AI strategy", "ROI measurement", "Change management"],
      "resources": ["resource 1", "resource 2"],
      "provider": "e.g. SkillsFuture, IMDA, SAIA"
    },
    {
      "role": "Operations & Business Teams",
      "skills": ["AI tools usage", "Prompt engineering", "Data literacy"],
      "resources": ["resource 1", "resource 2"],
      "provider": "e.g. SkillsFuture, Google, Microsoft"
    },
    {
      "role": "IT & Technical Staff",
      "skills": ["AI/ML fundamentals", "API integrations", "Data pipelines"],
      "resources": ["resource 1", "resource 2"],
      "provider": "e.g. AWS, Google Cloud, Coursera"
    }
  ],
  "compliance": {
    "pdpa": {
      "overview": "PDPA assessment specific to this company's AI use cases and data practices",
      "obligations": ["obligation 1", "obligation 2", "obligation 3"],
      "actions": ["action 1", "action 2", "action 3"],
      "resources": [
        {"name": "PDPC Singapore", "url": "https://www.pdpc.gov.sg"},
        {"name": "PDPA Guidelines", "url": "https://www.pdpc.gov.sg/guidelines-and-consultation/2021/09/advisory-guidelines-on-the-pdpa-for-ntuc-enterprise-co-operative-limited"}
      ]
    },
    "cybersecurity": {
      "overview": "Cybersecurity assessment relevant to their AI adoption journey",
      "risks": ["risk 1", "risk 2", "risk 3"],
      "actions": ["action 1", "action 2", "action 3"],
      "resources": [
        {"name": "CSA Singapore", "url": "https://www.csa.gov.sg"},
        {"name": "Cyber Essentials", "url": "https://www.csa.gov.sg/our-programmes/support-for-enterprises/sg-cyber-safe-programme/cyber-essentials"}
      ]
    },
    "aiGovernance": {
      "overview": "AI governance assessment based on Singapore's Model AI Governance Framework",
      "principles": ["principle 1", "principle 2", "principle 3"],
      "actions": ["action 1", "action 2", "action 3"],
      "resources": [
        {"name": "Model AI Governance Framework", "url": "https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2020/model-ai-governance-framework-second-edition"},
        {"name": "AI Verify", "url": "https://aiverifyfoundation.sg"}
      ]
    }
  },
  "grants": [
    {
      "name": "Digital Leaders Programme (DLP)",
      "body": "IMDA",
      "support": "Up to S$200,000 over 2 years",
      "relevance": "Why this grant specifically fits this company's AI transformation",
      "url": "https://www.imda.gov.sg/how-we-can-help/digital-leaders-programme"
    },
    {
      "name": "Productivity Solutions Grant (PSG)",
      "body": "EnterpriseSG & IMDA",
      "support": "Up to 50% funding",
      "relevance": "Why this grant fits this company's needs",
      "url": "https://www.enterprisesg.gov.sg/financial-support/productivity-solutions-grant"
    },
    {
      "name": "Enterprise Development Grant (EDG)",
      "body": "EnterpriseSG",
      "support": "Up to 50% funding",
      "relevance": "Why this grant fits this company's AI project",
      "url": "https://www.enterprisesg.gov.sg/financial-support/enterprise-development-grant"
    },
    {
      "name": "SkillsFuture Enterprise Credit (SFEC)",
      "body": "SkillsFuture Singapore",
      "support": "S$10,000 one-time credit",
      "relevance": "Why this fits the company's AI workforce training needs",
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