import {
  BookOpen,
  Wallet,
  FileText,
  GraduationCap,
  Building2,
  PencilRuler,
  type LucideIcon,
} from 'lucide-react'

export interface Category {
  id: string
  label: string
  icon: LucideIcon
  description: string
}

export const categories: Category[] = [
  {
    id: 'academics',
    label: 'Academics',
    icon: BookOpen,
    description: 'Course registration, prerequisites and degree requirements',
  },
  {
    id: 'fees',
    label: 'Fees',
    icon: Wallet,
    description: 'Fee deadlines, structure and payment information',
  },
  {
    id: 'exams',
    label: 'Exams',
    icon: PencilRuler,
    description: 'Exam schedules, rules and procedures',
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    description: 'Transcripts, certificates and university forms',
  },
  {
    id: 'policies',
    label: 'Policies',
    icon: GraduationCap,
    description: 'Academic regulations and university policies',
  },
  {
    id: 'services',
    label: 'Student Services',
    icon: Building2,
    description: 'Hostel, scholarships, library and other services',
  },
]

export const exampleQuestions: string[] = [
  // 'When is course registration?',
  // 'Can I repeat a course?',
  // 'How many credits do I need to graduate?',
  // 'Where can I get my transcript?',
  // 'What happens if I miss my fee deadline?',
  // 'Can I withdraw from CS301?',
]

export interface RecentConversation {
  id: string
  title: string
  preview: string
}

export const recentConversations: RecentConversation[] = [
  // { id: '1', title: 'Fee deadline', preview: 'Fall 2026 fee submission window' },
  // { id: '2', title: 'Course withdrawal', preview: 'Withdrawing from CS301 after midterms' },
  // { id: '3', title: 'Degree requirements', preview: 'Credits required to graduate' },
  // { id: '4', title: 'Exam policy', preview: 'Retake and re-sit procedures' },
  // { id: '5', title: 'Scholarship query', preview: 'Merit scholarship eligibility' },
]

export interface Source {
  document: string
  edition: string
  section: string
  page: string
}
