export type SentimentType = 'Positive' | 'Neutral' | 'Negative';
export type NarrativeStatus = 'Emerging' | 'Rising' | 'Stable' | 'Declining';

export interface SocialPost {
  id: string;
  time: string;
  timestamp: string;
  platform: 'Platform A' | 'Platform B' | 'Platform C';
  account: string;
  handle: string;
  avatar: string;
  followers: string;
  postText: string;
  engagement: string;
  likes: number;
  comments: number;
  shares: number;
  sentiment: SentimentType;
  sentimentScore: number;
  narrative: string;
  language: string;
  hashtags: string[];
  mentions: string[];
  region: string;
  accountAge: string;
}

export interface Narrative {
  id: string;
  title: string;
  mentions: number;
  uniqueAccounts: number;
  growth: string;
  growthValue: number;
  sentiment: SentimentType;
  sentimentBreakdown: { positive: number; neutral: number; negative: number };
  firstDetected: string;
  status: NarrativeStatus;
  summary: string;
  topKeywords: string[];
  topHashtags: { tag: string; mentions: number; growth: string }[];
  subtopics: { name: string; percentage: number; mentions: number }[];
  hourlyTrend: { time: string; mentions: number }[];
}

export interface IntelligenceSignal {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'sentiment' | 'narrative' | 'network' | 'account';
  severity: 'warning' | 'info' | 'critical';
}

export interface ActivityLog {
  id: string;
  time: string;
  action: string;
}

export interface SentimentShiftEvent {
  id: string;
  time: string;
  narrative: string;
  previous: string;
  current: string;
  change: string;
  postsCount: number;
  dominantSentiment: SentimentType;
}

export interface AudienceCluster {
  id: string;
  name: string;
  accountsCount: number;
  mainTopics: string[];
  topHashtags: string[];
  topNarrative: string;
  averageSentiment: SentimentType;
  sentimentBreakdown: { positive: number; neutral: number; negative: number };
  topAccounts: { handle: string; name: string; followers: string }[];
}

export interface NetworkNode {
  id: string;
  label: string;
  handle: string;
  followers: string;
  postsAnalysed: number;
  connections: number;
  communityId: string;
  communityName: string;
  mainNarrative: string;
  sentiment: SentimentType;
  role: string;
  degree: number;
  x?: number;
  y?: number;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'Mentions' | 'Replies' | 'Reposts' | 'Shared URLs';
  weight: number;
}

export interface NetworkCommunity {
  id: string;
  name: string;
  accountsCount: number;
  internalConnections: number;
  primaryNarrative: string;
  topHashtags: string[];
  sentimentBreakdown: { positive: number; neutral: number; negative: number };
  topAccounts: string[];
  crossCommunityLinks: { targetCommunity: string; connectionsCount: number }[];
  color: string;
}

export interface PropagationStep {
  time: string;
  activeNodeIds: string[];
  activeCommunityIds: string[];
  newAccountsCount: number;
  cumulativeAccounts: number;
  description: string;
}
