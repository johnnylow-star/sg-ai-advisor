import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function saveSubmission(formData, roadmapData) {
  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      // Contact Info
      name: formData.name || '',
      email: formData.email || '',
      jobTitle: formData.jobTitle || '',

      // Company Info
      companyName: formData.companyName || '',
      industry: formData.industry || '',
      employeeCount: formData.employeeCount || '',
      revenue: formData.revenue || '',
      websiteUrl: formData.websiteUrl || '',

      // AI Readiness
      currentAiTools: formData.currentAiTools || '',
      techInfrastructure: formData.techInfrastructure || '',
      dataAvailability: formData.dataAvailability || '',
      aiAwarenessLevel: formData.aiAwarenessLevel || '1',
      aiInterests: formData.aiInterests || [],

      // Pain Points
      painPoints: formData.painPoints || [],
      otherPainPoints: formData.otherPainPoints || '',
      marketingChannels: formData.marketingChannels || [],
      cxBreakdown: formData.cxBreakdown || [],
      cyberConcerns: formData.cyberConcerns || [],
      pdpaConcerns: formData.pdpaConcerns || [],
      dataState: formData.dataState || [],

      // AI Generated Report
      report: roadmapData || {},

      // Timestamp
      createdAt: serverTimestamp()
    })

    console.log('Submission saved with ID:', docRef.id)
    return docRef.id

  } catch (error) {
    console.error('Error saving submission:', error)
    throw error
  }
}