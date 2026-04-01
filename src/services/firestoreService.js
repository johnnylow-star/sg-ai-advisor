import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function saveSubmission(formData, roadmapData) {
  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      // Contact Info
      name: formData.name,
      email: formData.email,
      jobTitle: formData.jobTitle,

      // Company Info
      companyName: formData.companyName,
      industry: formData.industry,
      employeeCount: formData.employeeCount,
      revenue: formData.revenue,
      currentTools: formData.currentTools,
      techLevel: formData.techLevel,

      // Pain Points
      painPoints: formData.painPoints,
      otherPainPoints: formData.otherPainPoints,

      // AI Generated Roadmap
      roadmap: roadmapData,

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