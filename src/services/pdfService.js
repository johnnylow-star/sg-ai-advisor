import jsPDF from 'jspdf'

const DARK = '#0a0f1e'
const BLUE = '#1e90ff'
const MID = '#3d5a80'
const LIGHT = '#7a8fa6'
const GREEN = '#0a8754'
const ORANGE = '#e8630a'
const RED = '#dc2626'
const WHITE = '#ffffff'
const BG = '#f0f4f8'
const PURPLE = '#7c3aed'

function getScoreColor(score) {
  if (score >= 70) return GREEN
  if (score >= 40) return ORANGE
  return RED
}

function addWrappedText(doc, text, x, y, maxWidth, lineHeight = 6) {
  if (!text) return y
  const lines = doc.splitTextToSize(String(text), maxWidth)
  lines.forEach(line => {
    doc.text(line, x, y)
    y += lineHeight
  })
  return y
}

function addPageHeader(doc, companyName, pageWidth, margin) {
  doc.setFillColor(DARK)
  doc.rect(0, 0, pageWidth, 14, 'F')
  doc.setFillColor(BLUE)
  doc.rect(0, 0, 6, 14, 'F')
  doc.setTextColor(WHITE)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('SAIA AI READINESS REPORT', 12, 9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 140, 190)
  doc.text(companyName || '', pageWidth - margin, 9, { align: 'right' })
}

function addSectionHeader(doc, text, y, pageWidth) {
  doc.setFillColor(DARK)
  doc.rect(0, y - 5, pageWidth, 12, 'F')
  doc.setTextColor(WHITE)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(text, 20, y + 3)
  return y + 16
}

function addClickableLink(doc, text, url, x, y, color) {
  doc.setTextColor(color || BLUE)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.text(text, x, y)
  const textWidth = doc.getTextWidth(text)
  doc.link(x, y - 4, textWidth, 6, { url })
  doc.setDrawColor(color || BLUE)
  doc.setLineWidth(0.2)
  doc.line(x, y + 1, x + textWidth, y + 1)
}

function checkPageBreak(doc, y, companyName, pageWidth, margin, threshold = 260) {
  if (y > threshold) {
    doc.addPage()
    addPageHeader(doc, companyName, pageWidth, margin)
    return 24
  }
  return y
}

export async function exportToPDF(roadmap, formData) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 0

  // ─── COVER PAGE ───────────────────────────────────────────
  doc.setFillColor(DARK)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  doc.setFillColor(BLUE)
  doc.rect(0, 0, 6, pageHeight, 'F')

  doc.setTextColor(BLUE)
  doc.setFontSize(36)
  doc.setFont('helvetica', 'bold')
  doc.text('SAIA', margin + 8, 60)

  doc.setTextColor(WHITE)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('SINGAPORE A.I. ASSOCIATION', margin + 8, 70)

  doc.setDrawColor(BLUE)
  doc.setLineWidth(0.5)
  doc.line(margin, 82, pageWidth - margin, 82)

  doc.setTextColor(WHITE)
  doc.setFontSize(26)
  doc.setFont('helvetica', 'bold')
  doc.text('AI Readiness Report', margin + 8, 105)

  doc.setFontSize(16)
  doc.setTextColor(BLUE)
  doc.text(formData.companyName || 'Company', margin + 8, 118)

  doc.setFillColor(13, 42, 74)
  doc.roundedRect(margin, 130, contentWidth, 50, 4, 4, 'F')

  doc.setFontSize(9)
  const details = [
    ['Industry', formData.industry || 'N/A'],
    ['Company Size', formData.employeeCount || 'N/A'],
    ['Contact', `${formData.name || ''} · ${formData.jobTitle || ''}`],
    ['Overall Score', `${roadmap.readinessScores?.overall || '--'} / 100`],
    ['Readiness Level', roadmap.readinessLevel?.label || 'N/A'],
    ['Report Date', new Date().toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' })],
  ]
  details.forEach((detail, i) => {
    const col = i % 2 === 0 ? margin + 8 : margin + contentWidth / 2 + 4
    const row = 140 + Math.floor(i / 2) * 14
    doc.setTextColor(150, 180, 220)
    doc.setFont('helvetica', 'normal')
    doc.text(detail[0].toUpperCase(), col, row)
    doc.setTextColor(WHITE)
    doc.setFont('helvetica', 'bold')
    doc.text(String(detail[1]), col, row + 6)
  })

  doc.setFontSize(8)
  doc.setTextColor(80, 100, 130)
  doc.setFont('helvetica', 'normal')
  doc.text('Powered by Pantherpulse · Singapore A.I. Association · AI Readiness Toolkit', margin + 8, pageHeight - 15)

  // ─── PAGE 2: EXECUTIVE SUMMARY + SCORES ───────────────────
  doc.addPage()
  addPageHeader(doc, formData.companyName, pageWidth, margin)
  y = 24

  y = addSectionHeader(doc, '01  EXECUTIVE SUMMARY', y, pageWidth)
  doc.setTextColor(MID)
  doc.setFontSize(9.5)
  doc.setFont('helvetica', 'normal')
  y = addWrappedText(doc, roadmap.executiveSummary, margin, y, contentWidth, 6)
  y += 10

  y = addSectionHeader(doc, '02  AI READINESS SCORE', y, pageWidth)

  doc.setFillColor(BG)
  doc.roundedRect(margin, y, contentWidth, 28, 4, 4, 'F')
  const scoreColor = getScoreColor(roadmap.readinessScores?.overall || 0)
  doc.setTextColor(scoreColor)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text(String(roadmap.readinessScores?.overall || '--'), margin + 16, y + 18)
  doc.setFontSize(9)
  doc.setTextColor(LIGHT)
  doc.setFont('helvetica', 'normal')
  doc.text('/ 100', margin + 32, y + 18)
  doc.setTextColor(DARK)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text(roadmap.readinessLevel?.label || '', margin + 52, y + 12)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(MID)
  const levelLines = doc.splitTextToSize(roadmap.readinessLevel?.description || '', contentWidth - 60)
  doc.text(levelLines[0] || '', margin + 52, y + 20)
  y += 36

  const dims = [
    { key: 'dataReadiness', label: 'Data Readiness', color: BLUE },
    { key: 'aiStrategy', label: 'AI Strategy', color: DARK },
    { key: 'workforceSkills', label: 'Workforce & Skills', color: GREEN },
    { key: 'techInfrastructure', label: 'Tech Infrastructure', color: ORANGE },
    { key: 'ethicsGovernance', label: 'Ethics & Governance', color: RED },
  ]

  dims.forEach(dim => {
    y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin)
    const s = roadmap.readinessScores?.[dim.key]
    const score = s?.score || 0
    const barWidth = contentWidth - 60

    doc.setTextColor(DARK)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(dim.label, margin, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(getScoreColor(score))
    doc.text(String(score), pageWidth - margin, y, { align: 'right' })

    doc.setFillColor(220, 230, 240)
    doc.roundedRect(margin, y + 2, barWidth, 4, 2, 2, 'F')
    const fillWidth = (score / 100) * barWidth
    doc.setFillColor(dim.color)
    if (fillWidth > 0) doc.roundedRect(margin, y + 2, fillWidth, 4, 2, 2, 'F')

    doc.setTextColor(LIGHT)
    doc.setFontSize(8)
    y = addWrappedText(doc, s?.insight || '', margin, y + 10, contentWidth, 5)
    y += 6
  })

  // ─── PAGE 3: AI USE CASES ──────────────────────────────────
  doc.addPage()
  addPageHeader(doc, formData.companyName, pageWidth, margin)
  y = 24

  y = addSectionHeader(doc, '03  RECOMMENDED AI USE CASES', y, pageWidth)

  roadmap.aiUseCases?.forEach((uc, i) => {
    y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin, 220)

    doc.setFillColor(BG)
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F')
    doc.setFillColor(BLUE)
    doc.roundedRect(margin, y, 4, 8, 2, 2, 'F')
    doc.setTextColor(DARK)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`${i + 1}. ${uc.title}`, margin + 8, y + 5.5)
    doc.setFontSize(7.5)
    doc.setTextColor(BLUE)
    doc.text(`● ${uc.priority} Priority`, pageWidth - margin - 45, y + 5.5)
    y += 12

    doc.setTextColor(MID)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    y = addWrappedText(doc, uc.description, margin, y, contentWidth, 5.5)

    doc.setTextColor(GREEN)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.text(`Impact: ${uc.estimatedImpact || ''}`, margin, y + 2)
    doc.setTextColor(LIGHT)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(`Tools: ${uc.tools?.join(', ') || ''}`, margin, y + 8)
    y += 16
  })

  // ─── PAGE 4: ROADMAP ──────────────────────────────────────
  doc.addPage()
  addPageHeader(doc, formData.companyName, pageWidth, margin)
  y = 24

  y = addSectionHeader(doc, '04  AI TRANSFORMATION ROADMAP', y, pageWidth)

  const phaseColors = [BLUE, DARK, GREEN]
  roadmap.roadmap?.forEach((phase, i) => {
    y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin, 220)

    doc.setFillColor(phaseColors[i])
    doc.roundedRect(margin, y, contentWidth, 10, 3, 3, 'F')
    doc.setTextColor(WHITE)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`${phase.phase}: ${phase.title}`, margin + 6, y + 7)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(phase.duration || '', pageWidth - margin - 4, y + 7, { align: 'right' })
    y += 14

    doc.setTextColor(MID)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'italic')
    y = addWrappedText(doc, phase.focus, margin, y, contentWidth, 5)
    y += 2

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(DARK)
    phase.actions?.forEach(action => {
      y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin)
      doc.setFontSize(8.5)
      doc.text('•', margin + 2, y)
      y = addWrappedText(doc, action, margin + 8, y, contentWidth - 8, 5)
      y += 1
    })
    y += 8
  })

  // ─── PAGE 5: TRAINING ─────────────────────────────────────
  doc.addPage()
  addPageHeader(doc, formData.companyName, pageWidth, margin)
  y = 24

  y = addSectionHeader(doc, '05  AI WORKFORCE TRAINING PLAN', y, pageWidth)

  roadmap.trainingPlan?.forEach(plan => {
    y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin, 220)
    doc.setTextColor(DARK)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(plan.role, margin, y)
    doc.setFontSize(8)
    doc.setTextColor(BLUE)
    doc.setFont('helvetica', 'normal')
    doc.text(plan.provider, pageWidth - margin, y, { align: 'right' })
    y += 6
    doc.setTextColor(MID)
    doc.setFontSize(8.5)
    doc.text(`Skills: ${plan.skills?.join(', ') || ''}`, margin, y)
    y += 5
    y = addWrappedText(doc, `Resources: ${plan.resources?.join(', ') || ''}`, margin, y, contentWidth, 5)
    y += 8
  })

  // ─── PAGE 6: COMPLIANCE ───────────────────────────────────
  doc.addPage()
  addPageHeader(doc, formData.companyName, pageWidth, margin)
  y = 24

  y = addSectionHeader(doc, '06  AI COMPLIANCE & GOVERNANCE', y, pageWidth)

  const complianceSections = [
    {
      label: 'SINGAPORE PDPA',
      title: 'Personal Data Protection Act',
      color: PURPLE,
      overview: roadmap.compliance?.pdpa?.overview,
      leftTitle: 'Key Obligations',
      leftItems: roadmap.compliance?.pdpa?.obligations,
      rightTitle: 'Recommended Actions',
      rightItems: roadmap.compliance?.pdpa?.actions,
      resources: roadmap.compliance?.pdpa?.resources,
    },
    {
      label: 'CSA SINGAPORE',
      title: 'Cybersecurity Framework',
      color: RED,
      overview: roadmap.compliance?.cybersecurity?.overview,
      leftTitle: 'Key Risks',
      leftItems: roadmap.compliance?.cybersecurity?.risks,
      rightTitle: 'Recommended Actions',
      rightItems: roadmap.compliance?.cybersecurity?.actions,
      resources: roadmap.compliance?.cybersecurity?.resources,
    },
    {
      label: 'IMDA / PDPC SINGAPORE',
      title: 'AI Governance & Ethics',
      color: BLUE,
      overview: roadmap.compliance?.aiGovernance?.overview,
      leftTitle: 'Core Principles',
      leftItems: roadmap.compliance?.aiGovernance?.principles,
      rightTitle: 'Recommended Actions',
      rightItems: roadmap.compliance?.aiGovernance?.actions,
      resources: roadmap.compliance?.aiGovernance?.resources,
    },
  ]

  complianceSections.forEach(section => {
    y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin, 200)

    doc.setFillColor(section.color)
    doc.roundedRect(margin, y, 4, 8, 2, 2, 'F')
    doc.setFillColor(BG)
    doc.roundedRect(margin + 4, y, contentWidth - 4, 8, 2, 2, 'F')
    doc.setTextColor(section.color)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.text(section.label, margin + 8, y + 3)
    doc.setTextColor(DARK)
    doc.setFontSize(10)
    doc.text(section.title, margin + 8, y + 7.5)
    y += 12

    doc.setTextColor(MID)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'normal')
    y = addWrappedText(doc, section.overview, margin, y, contentWidth, 5)
    y += 4

    const halfWidth = (contentWidth - 8) / 2
    const col2 = margin + halfWidth + 8

    doc.setTextColor(LIGHT)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.text(section.leftTitle?.toUpperCase() || '', margin, y)
    doc.text(section.rightTitle?.toUpperCase() || '', col2, y)
    y += 5

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    const leftItems = section.leftItems || []
    const rightItems = section.rightItems || []
    const maxItems = Math.max(leftItems.length, rightItems.length)

    for (let i = 0; i < maxItems; i++) {
      y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin)
      if (leftItems[i]) {
        doc.setTextColor(DARK)
        doc.text('•', margin + 2, y)
        const leftLines = doc.splitTextToSize(leftItems[i], halfWidth - 6)
        doc.text(leftLines[0], margin + 6, y)
      }
      if (rightItems[i]) {
        doc.setTextColor(DARK)
        doc.text('•', col2 + 2, y)
        const rightLines = doc.splitTextToSize(rightItems[i], halfWidth - 6)
        doc.text(rightLines[0], col2 + 6, y)
      }
      y += 5
    }

    y += 4
    if (section.resources?.length) {
      doc.setTextColor(LIGHT)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'bold')
      doc.text('RESOURCES', margin, y)
      y += 5
      section.resources.forEach(r => {
        y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin)
        addClickableLink(doc, `→ ${r.name}`, r.url, margin, y, section.color)
        y += 6
      })
    }
    y += 10
  })

  // ─── PAGE 7: GRANTS ───────────────────────────────────────
  doc.addPage()
  addPageHeader(doc, formData.companyName, pageWidth, margin)
  y = 24

  y = addSectionHeader(doc, '07  MATCHED SINGAPORE GRANTS', y, pageWidth)

  roadmap.grants?.forEach((grant, i) => {
    y = checkPageBreak(doc, y, formData.companyName, pageWidth, margin, 220)

    doc.setFillColor(BG)
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F')
    doc.setTextColor(DARK)
    doc.setFontSize(9.5)
    doc.setFont('helvetica', 'bold')
    doc.text(grant.name, margin + 4, y + 5.5)
    doc.setTextColor(GREEN)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(grant.support, pageWidth - margin - 4, y + 5.5, { align: 'right' })
    y += 12

    doc.setTextColor(LIGHT)
    doc.setFontSize(8)
    doc.text(`Administered by: ${grant.body}`, margin, y)
    y += 5
    doc.setTextColor(MID)
    doc.setFontSize(8.5)
    y = addWrappedText(doc, grant.relevance, margin, y, contentWidth, 5)
    y += 4

    if (grant.url) {
      addClickableLink(doc, `Apply / Learn more →`, grant.url, margin, y, BLUE)
      y += 10
    }
    y += 4
  })

  // ─── FINAL FOOTER ─────────────────────────────────────────
  doc.setFillColor(DARK)
  doc.rect(0, pageHeight - 16, pageWidth, 16, 'F')
  doc.setFillColor(BLUE)
  doc.rect(0, pageHeight - 16, 6, 16, 'F')
  doc.setTextColor(WHITE)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('Singapore A.I. Association', 12, pageHeight - 7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 140, 190)
  doc.text('Powered by Pantherpulse · Confidential Report', pageWidth - margin, pageHeight - 7, { align: 'right' })

  const filename = `SAIA_AI_Readiness_${formData.companyName?.replace(/\s+/g, '_') || 'Report'}_${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(filename)
}