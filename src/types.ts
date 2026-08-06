export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export interface AssessmentQuestion {
  id: string;
  text: string;
  description?: string;
  category: string;
  weight?: number;
}

export interface AssessmentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  categoryId: string;
  categoryName: string;
  score: number;
  maxScore: number;
  level: MaturityLevel;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  likelihood: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  owner: string;
  reviewDate: string;
  mitigation: string;
  status: 'open' | 'mitigating' | 'closed' | 'accepted';
  aiGenerated?: boolean;
}

export interface PolicyDoc {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  version: string;
  updatedAt: string;
  owner: string;
  summary: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  type: 'policy' | 'screenshot' | 'contract' | 'audit' | 'certificate' | 'report';
  size: string;
  uploadedAt: string;
  tags: string[];
}

export interface Framework {
  id: string;
  name: string;
  shortName: string;
  description: string;
  coverage: number;
  totalControls: number;
  metControls: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'assessment' | 'policy' | 'risk' | 'evidence' | 'ai' | 'system';
  title: string;
  detail: string;
  timestamp: string;
  user: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  level: MaturityLevel;
  status: 'done' | 'active' | 'upcoming';
  items: string[];
  timeframe: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface DashboardSummary {
  governanceScore: number;
  maturityLevel: MaturityLevel;
  maturityLabel: string;
  healthStatus: 'healthy' | 'attention' | 'critical';
  healthLabel: string;
  recentAssessments: number;
  openRecommendations: number;
  policyCoverage: number;
  openRisks: number;
  complianceReadiness: number;
  upcomingTasks: { id: string; title: string; due: string; priority: 'high' | 'medium' | 'low' }[];
  categoryScores: { name: string; score: number; fullMark: number }[];
  trend: { month: string; score: number }[];
  aiRecommendations: { id: string; title: string; impact: 'high' | 'medium' | 'low'; category: string }[];
}
