import type {
  SocialPost,
  Narrative,
  IntelligenceSignal,
  ActivityLog,
  SentimentShiftEvent,
  AudienceCluster,
  NetworkNode,
  NetworkEdge,
  NetworkCommunity,
  PropagationStep
} from '../types';

export const GLOBAL_STATS = {
  postsAnalysed: '248,612',
  activeNarratives: 18,
  accountsAnalysed: '61,483',
  networkCommunities: 12,
  datasetName: 'SOCIAL-DEMO-2026',
  lastUpdated: '2 min ago',
  platformsCount: 3,
  languagesCount: 11,
  overallSentiment: {
    positive: 17,
    neutral: 22,
    negative: 61
  }
};

export const NARRATIVES_DATA: Narrative[] = [
  {
    id: 'nar-1',
    title: '#ExamPaperLeak',
    mentions: 18421,
    uniqueAccounts: 7284,
    growth: '+43%',
    growthValue: 43,
    sentiment: 'Negative',
    sentimentBreakdown: { positive: 17, neutral: 22, negative: 61 },
    firstDetected: '09:14 UTC',
    status: 'Rising',
    summary: 'Online discussion is centred around an alleged examination paper leak, student concerns, requests for official clarification, and the circulation of unverified screenshots.',
    topKeywords: ['exam', 'paper', 'leak', 'students', 'verification', 'schedule', 'authority', 'clarification'],
    topHashtags: [
      { tag: '#ExamPaperLeak', mentions: 8820, growth: '+62%' },
      { tag: '#StudentsDemandAnswers', mentions: 5421, growth: '+34%' },
      { tag: '#ExamUpdate', mentions: 3284, growth: '+21%' },
      { tag: '#VerifyBeforeShare', mentions: 1920, growth: '+15%' },
      { tag: '#ExamNews', mentions: 1450, growth: '+9%' }
    ],
    subtopics: [
      { name: 'Student Concerns', percentage: 31, mentions: 5710 },
      { name: 'Official Response', percentage: 24, mentions: 4421 },
      { name: 'Verification / Fact Checking', percentage: 21, mentions: 3868 },
      { name: 'Exam Schedule Discussion', percentage: 14, mentions: 2578 },
      { name: 'Protest / Reaction', percentage: 10, mentions: 1844 }
    ],
    hourlyTrend: [
      { time: '08:00', mentions: 320 },
      { time: '09:00', mentions: 410 },
      { time: '10:00', mentions: 620 },
      { time: '11:00', mentions: 1120 },
      { time: '12:00', mentions: 1840 },
      { time: '13:00', mentions: 2450 }
    ]
  },
  {
    id: 'nar-2',
    title: '#StudentsDemandAnswers',
    mentions: 13870,
    uniqueAccounts: 5410,
    growth: '+27%',
    growthValue: 27,
    sentiment: 'Negative',
    sentimentBreakdown: { positive: 14, neutral: 32, negative: 54 },
    firstDetected: '10:12 UTC',
    status: 'Rising',
    summary: 'Student groups and candidates posting inquiries seeking transparent statements regarding online claims.',
    topKeywords: ['students', 'answers', 'statement', 'clarification', 'candidates', 'support'],
    topHashtags: [
      { tag: '#StudentsDemandAnswers', mentions: 6100, growth: '+30%' },
      { tag: '#ExamPaperLeak', mentions: 4200, growth: '+18%' },
      { tag: '#StudentVoice', mentions: 2800, growth: '+12%' }
    ],
    subtopics: [
      { name: 'Requests for Official Notice', percentage: 45, mentions: 6241 },
      { name: 'Candidate Support Posts', percentage: 35, mentions: 4854 },
      { name: 'Online Petitions', percentage: 20, mentions: 2775 }
    ],
    hourlyTrend: [
      { time: '08:00', mentions: 210 },
      { time: '09:00', mentions: 340 },
      { time: '10:00', mentions: 510 },
      { time: '11:00', mentions: 890 },
      { time: '12:00', mentions: 1250 },
      { time: '13:00', mentions: 1410 }
    ]
  },
  {
    id: 'nar-3',
    title: 'Exam Authority Response',
    mentions: 9441,
    uniqueAccounts: 3890,
    growth: '+12%',
    growthValue: 12,
    sentiment: 'Neutral',
    sentimentBreakdown: { positive: 24, neutral: 48, negative: 28 },
    firstDetected: '10:45 UTC',
    status: 'Stable',
    summary: 'Updates and formal statements published by administrative channels regarding examination integrity.',
    topKeywords: ['authority', 'official', 'statement', 'verification', 'committee', 'portal'],
    topHashtags: [
      { tag: '#ExamAuthority', mentions: 4120, growth: '+10%' },
      { tag: '#OfficialUpdate', mentions: 3100, growth: '+6%' },
      { tag: '#ExamNews', mentions: 2221, growth: '+4%' }
    ],
    subtopics: [
      { name: 'Verification Committee Setup', percentage: 50, mentions: 4720 },
      { name: 'Advisory Notifications', percentage: 30, mentions: 2832 },
      { name: 'Helpdesk Operations', percentage: 20, mentions: 1889 }
    ],
    hourlyTrend: [
      { time: '08:00', mentions: 450 },
      { time: '09:00', mentions: 610 },
      { time: '10:00', mentions: 780 },
      { time: '11:00', mentions: 820 },
      { time: '12:00', mentions: 890 },
      { time: '13:00', mentions: 940 }
    ]
  },
  {
    id: 'nar-4',
    title: 'Verification & Fact-Checking',
    mentions: 7920,
    uniqueAccounts: 3150,
    growth: '+18%',
    growthValue: 18,
    sentiment: 'Neutral',
    sentimentBreakdown: { positive: 16, neutral: 62, negative: 22 },
    firstDetected: '09:30 UTC',
    status: 'Emerging',
    summary: 'Fact-checkers and analysts evaluating viral screenshots to verify timestamp and document authenticity.',
    topKeywords: ['factcheck', 'verification', 'screenshot', 'authentic', 'claims', 'unverified'],
    topHashtags: [
      { tag: '#VerifyBeforeShare', mentions: 3400, growth: '+20%' },
      { tag: '#FactCheckIndia', mentions: 2600, growth: '+15%' },
      { tag: '#ExamNews', mentions: 1920, growth: '+10%' }
    ],
    subtopics: [
      { name: 'Screenshot Image Analysis', percentage: 45, mentions: 3564 },
      { name: 'Source Verification', percentage: 35, mentions: 2772 },
      { name: 'Anti-Misinformation Tips', percentage: 20, mentions: 1584 }
    ],
    hourlyTrend: [
      { time: '08:00', mentions: 180 },
      { time: '09:00', mentions: 320 },
      { time: '10:00', mentions: 580 },
      { time: '11:00', mentions: 720 },
      { time: '12:00', mentions: 810 },
      { time: '13:00', mentions: 950 }
    ]
  },
  {
    id: 'nar-5',
    title: 'Official Clarification',
    mentions: 6280,
    uniqueAccounts: 2410,
    growth: '+9%',
    growthValue: 9,
    sentiment: 'Positive',
    sentimentBreakdown: { positive: 51, neutral: 35, negative: 14 },
    firstDetected: '11:15 UTC',
    status: 'Rising',
    summary: 'Clarification bulletins reassuring candidates to rely solely on authenticated portal notices.',
    topKeywords: ['clarification', 'official', 'advisory', 'authentic', 'schedule', 'notice'],
    topHashtags: [
      { tag: '#OfficialClarification', mentions: 2800, growth: '+18%' },
      { tag: '#ExamNotice', mentions: 2100, growth: '+12%' }
    ],
    subtopics: [
      { name: 'Authenticated Bulletins', percentage: 60, mentions: 3768 },
      { name: 'Candidate Reassurance', percentage: 40, mentions: 2512 }
    ],
    hourlyTrend: [
      { time: '08:00', mentions: 300 },
      { time: '09:00', mentions: 450 },
      { time: '10:00', mentions: 520 },
      { time: '11:00', mentions: 590 },
      { time: '12:00', mentions: 610 },
      { time: '13:00', mentions: 630 }
    ]
  },
  {
    id: 'nar-6',
    title: 'Exam Rescheduling Discussion',
    mentions: 4890,
    uniqueAccounts: 1950,
    growth: '+5%',
    growthValue: 5,
    sentiment: 'Negative',
    sentimentBreakdown: { positive: 12, neutral: 44, negative: 44 },
    firstDetected: '11:40 UTC',
    status: 'Stable',
    summary: 'Uncertainty and open forum discussions concerning potential impact on upcoming exam schedules.',
    topKeywords: ['reschedule', 'dates', 'timetable', 'delay', 'center', 'candidates'],
    topHashtags: [
      { tag: '#ExamReschedule', mentions: 2100, growth: '+8%' },
      { tag: '#ExamDates', mentions: 1500, growth: '+4%' }
    ],
    subtopics: [
      { name: 'Timetable Confusion', percentage: 55, mentions: 2689 },
      { name: 'Travel & Accommodation Queries', percentage: 45, mentions: 2201 }
    ],
    hourlyTrend: [
      { time: '08:00', mentions: 200 },
      { time: '09:00', mentions: 280 },
      { time: '10:00', mentions: 350 },
      { time: '11:00', mentions: 410 },
      { time: '12:00', mentions: 480 },
      { time: '13:00', mentions: 510 }
    ]
  },
  {
    id: 'nar-7',
    title: 'Student Protest Discussion',
    mentions: 3410,
    uniqueAccounts: 1420,
    growth: '+8%',
    growthValue: 8,
    sentiment: 'Negative',
    sentimentBreakdown: { positive: 10, neutral: 32, negative: 58 },
    firstDetected: '12:05 UTC',
    status: 'Emerging',
    summary: 'Public posts sharing information about student rallies and local delegation representation.',
    topKeywords: ['protest', 'rallies', 'representation', 'delegation', 'demands'],
    topHashtags: [
      { tag: '#StudentProtest', mentions: 1800, growth: '+12%' },
      { tag: '#JusticeForStudents', mentions: 1200, growth: '+6%' }
    ],
    subtopics: [
      { name: 'Delegation Meetings', percentage: 60, mentions: 2046 },
      { name: 'Peaceful Demonstration Calls', percentage: 40, mentions: 1364 }
    ],
    hourlyTrend: [
      { time: '08:00', mentions: 100 },
      { time: '09:00', mentions: 150 },
      { time: '10:00', mentions: 220 },
      { time: '11:00', mentions: 310 },
      { time: '12:00', mentions: 410 },
      { time: '13:00', mentions: 490 }
    ]
  }
];

export const INTELLIGENCE_SIGNALS: IntelligenceSignal[] = [
  {
    id: 'sig-1',
    time: '12:34',
    title: 'Rapid growth detected in #ExamPaperLeak',
    description: 'Velocity increased to 1,840 posts/hr with 43% hour-on-hour mention volume spike.',
    type: 'narrative',
    severity: 'critical'
  },
  {
    id: 'sig-2',
    time: '12:28',
    title: 'Negative sentiment increased by 12% in last 3 hours',
    description: 'Negative sentiment shifted to 61%, mainly driven by uncertainty and demands for official clarification.',
    type: 'sentiment',
    severity: 'warning'
  },
  {
    id: 'sig-3',
    time: '12:20',
    title: 'Cross-community propagation detected',
    description: 'Narrative bridged from Student Discussion Cluster C1 to Education News Cluster C2.',
    type: 'network',
    severity: 'info'
  },
  {
    id: 'sig-4',
    time: '12:16',
    title: 'New high-connectivity account identified',
    description: '@student_voice (82.4K followers) reached high-connectivity hub status.',
    type: 'account',
    severity: 'warning'
  },
  {
    id: 'sig-5',
    time: '11:55',
    title: 'Fact-checking narrative gaining traction',
    description: '#VerifyBeforeShare post volume increased by 18% in response to unverified claims.',
    type: 'narrative',
    severity: 'info'
  }
];

export const RECENT_ACTIVITIES: ActivityLog[] = [
  { id: 'act-1', time: '12:42', action: 'Narrative cluster updated' },
  { id: 'act-2', time: '12:38', action: 'Network analysis completed' },
  { id: 'act-3', time: '12:31', action: 'Audience profile refreshed' },
  { id: 'act-4', time: '12:22', action: 'Sentiment shift detected' }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    time: '12:43',
    timestamp: '2026-09-29 12:43:10',
    platform: 'Platform A',
    account: 'Student Voice Forum',
    handle: '@student_voice',
    avatar: 'SV',
    followers: '82.4K',
    postText: 'Candidates are asking for an official clarification regarding the circulating document. Students need a clear official explanation; too many conflicting claims are circulating.',
    engagement: '4.8K',
    likes: 3420,
    comments: 890,
    shares: 490,
    sentiment: 'Negative',
    sentimentScore: 0.89,
    narrative: '#ExamPaperLeak',
    language: 'English',
    hashtags: ['#ExamPaperLeak', '#StudentsDemandAnswers', '#ExamUpdate'],
    mentions: ['@exam_newsdesk', '@factcheck_india'],
    region: 'Delhi NCR',
    accountAge: '3+ years'
  },
  {
    id: 'post-2',
    time: '12:41',
    timestamp: '2026-09-29 12:41:05',
    platform: 'Platform B',
    account: 'Exam Newsdesk',
    handle: '@exam_newsdesk',
    avatar: 'EN',
    followers: '120.5K',
    postText: 'Authorities have not yet verified claims circulating online. Official press releases will be uploaded directly to the authenticated portal.',
    engagement: '3.1K',
    likes: 2100,
    comments: 650,
    shares: 350,
    sentiment: 'Neutral',
    sentimentScore: 0.62,
    narrative: 'Exam Authority Response',
    language: 'English',
    hashtags: ['#ExamAuthority', '#OfficialUpdate'],
    mentions: ['@student_voice'],
    region: 'Delhi NCR',
    accountAge: '3+ years'
  },
  {
    id: 'post-3',
    time: '12:39',
    timestamp: '2026-09-29 12:39:12',
    platform: 'Platform C',
    account: 'FactCheck India',
    handle: '@factcheck_india',
    avatar: 'FC',
    followers: '88.9K',
    postText: 'Several versions of the same screenshot are being shared online. Verification is still pending. No verified source has confirmed the circulating document yet.',
    engagement: '2.7K',
    likes: 1950,
    comments: 440,
    shares: 310,
    sentiment: 'Neutral',
    sentimentScore: 0.78,
    narrative: 'Verification & Fact-Checking',
    language: 'English',
    hashtags: ['#VerifyBeforeShare', '#FactCheckIndia'],
    mentions: ['@student_voice'],
    region: 'Maharashtra',
    accountAge: '3+ years'
  },
  {
    id: 'post-4',
    time: '12:36',
    timestamp: '2026-09-29 12:36:19',
    platform: 'Platform A',
    account: 'Student Forum India',
    handle: '@student_forum',
    avatar: 'SF',
    followers: '45.1K',
    postText: 'Many students are confused about whether the examination schedule will change. Candidates are asking whether tomorrow’s examination schedule will remain unchanged.',
    engagement: '2.2K',
    likes: 1540,
    comments: 420,
    shares: 240,
    sentiment: 'Negative',
    sentimentScore: 0.81,
    narrative: 'Exam Rescheduling Discussion',
    language: 'Hindi',
    hashtags: ['#ExamReschedule', '#ExamDates'],
    mentions: ['@candidate_forum'],
    region: 'Uttar Pradesh',
    accountAge: '1–3 years'
  },
  {
    id: 'post-5',
    time: '12:30',
    timestamp: '2026-09-29 12:30:00',
    platform: 'Platform A',
    account: 'Candidate Forum',
    handle: '@candidate_forum',
    avatar: 'CF',
    followers: '45.1K',
    postText: 'Discussion is growing fast across online forums regarding the unverified claim. Requesting prompt clarification to prevent unnecessary anxiety among test takers.',
    engagement: '3.9K',
    likes: 2750,
    comments: 720,
    shares: 430,
    sentiment: 'Negative',
    sentimentScore: 0.94,
    narrative: '#ExamPaperLeak',
    language: 'Hindi',
    hashtags: ['#ExamPaperLeak', '#StudentsDemandAnswers'],
    mentions: ['@student_voice', '@exam_newsdesk'],
    region: 'Uttar Pradesh',
    accountAge: '1–3 years'
  },
  {
    id: 'post-6',
    time: '12:22',
    timestamp: '2026-09-29 12:22:19',
    platform: 'Platform B',
    account: 'Education Watch Channel',
    handle: '@education_watch',
    avatar: 'EW',
    followers: '64.2K',
    postText: 'Official advisory emphasizes relying solely on authenticated portal notices. Verification committees are reviewing public queries.',
    engagement: '1.9K',
    likes: 1420,
    comments: 290,
    shares: 190,
    sentiment: 'Positive',
    sentimentScore: 0.88,
    narrative: 'Official Clarification',
    language: 'Tamil',
    hashtags: ['#OfficialClarification', '#ExamNotice'],
    mentions: [],
    region: 'Karnataka',
    accountAge: '3+ years'
  },
  {
    id: 'post-7',
    time: '12:15',
    timestamp: '2026-09-29 12:15:02',
    platform: 'Platform A',
    account: 'Study Circle Network',
    handle: '@study_circle',
    avatar: 'SC',
    followers: '28.4K',
    postText: 'Checking multiple channels to verify if the viral screenshots are authentic or fabricated. Please avoid sharing unverified claims.',
    engagement: '2.8K',
    likes: 1980,
    comments: 510,
    shares: 310,
    sentiment: 'Neutral',
    sentimentScore: 0.71,
    narrative: 'Verification & Fact-Checking',
    language: 'English',
    hashtags: ['#VerifyBeforeShare', '#StudyCircle'],
    mentions: ['@factcheck_india'],
    region: 'Rajasthan',
    accountAge: '1–6 months'
  },
  {
    id: 'post-8',
    time: '12:05',
    timestamp: '2026-09-29 12:05:40',
    platform: 'Platform C',
    account: 'Public Discussion Hub',
    handle: '@public_discussion',
    avatar: 'PD',
    followers: '29.8K',
    postText: 'Public groups discussing potential impact on upcoming examination schedules. Observing high engagement across online discussion groups.',
    engagement: '950',
    likes: 680,
    comments: 150,
    shares: 120,
    sentiment: 'Neutral',
    sentimentScore: 0.58,
    narrative: 'Exam Rescheduling Discussion',
    language: 'English',
    hashtags: ['#ExamNews', '#PublicDiscussion'],
    mentions: ['@exam_newsdesk'],
    region: 'Delhi NCR',
    accountAge: '3+ years'
  }
];

export const SENTIMENT_OVER_TIME_DATA = [
  { time: '06:00', Positive: 35, Neutral: 45, Negative: 20 },
  { time: '07:00', Positive: 32, Neutral: 43, Negative: 25 },
  { time: '08:00', Positive: 30, Neutral: 40, Negative: 30 },
  { time: '09:00', Positive: 28, Neutral: 38, Negative: 34 },
  { time: '10:00', Positive: 25, Neutral: 35, Negative: 40 },
  { time: '11:00', Positive: 22, Neutral: 30, Negative: 48 },
  { time: '12:00', Positive: 19, Neutral: 25, Negative: 56 },
  { time: '13:00', Positive: 17, Neutral: 22, Negative: 61 },
  { time: '14:00', Positive: 15, Neutral: 20, Negative: 65 }
];

export const SENTIMENT_SHIFT_EVENTS: SentimentShiftEvent[] = [
  {
    id: 'shift-1',
    time: '12:30',
    narrative: '#ExamPaperLeak',
    previous: '48% Negative',
    current: '61% Negative',
    change: '+13%',
    postsCount: 3284,
    dominantSentiment: 'Negative'
  },
  {
    id: 'shift-2',
    time: '11:10',
    narrative: '#StudentsDemandAnswers',
    previous: '44% Negative',
    current: '54% Negative',
    change: '+10%',
    postsCount: 1428,
    dominantSentiment: 'Negative'
  },
  {
    id: 'shift-3',
    time: '10:15',
    narrative: 'Exam Authority Response',
    previous: '39% Neutral',
    current: '48% Neutral',
    change: '+9%',
    postsCount: 980,
    dominantSentiment: 'Neutral'
  },
  {
    id: 'shift-4',
    time: '09:00',
    narrative: 'Verification & Fact-Checking',
    previous: '42% Neutral',
    current: '58% Neutral',
    change: '+16%',
    postsCount: 850,
    dominantSentiment: 'Neutral'
  }
];

export const AUDIENCE_SUMMARY = {
  accountsAnalysed: '61,483',
  regions: 28,
  languages: 11,
  majorClusters: 6
};

export const LANGUAGE_DISTRIBUTION = [
  { language: 'English', percentage: 41, count: 25208 },
  { language: 'Hindi', percentage: 32, count: 19674 },
  { language: 'Marathi', percentage: 9, count: 5533 },
  { language: 'Tamil', percentage: 6, count: 3688 },
  { language: 'Telugu', percentage: 5, count: 3074 },
  { language: 'Other', percentage: 7, count: 4306 }
];

export const GEOGRAPHIC_DISTRIBUTION = [
  { region: 'Delhi NCR', percentage: 14, accounts: 8607 },
  { region: 'Maharashtra', percentage: 13, accounts: 7992 },
  { region: 'Uttar Pradesh', percentage: 12, accounts: 7377 },
  { region: 'Karnataka', percentage: 8, accounts: 4918 },
  { region: 'Rajasthan', percentage: 7, accounts: 4303 },
  { region: 'Other', percentage: 46, accounts: 28286 }
];

export const ACCOUNT_AGE_DATA = [
  { group: '< 1 month', percentage: 14, accounts: 8607 },
  { group: '1–6 months', percentage: 22, accounts: 13526 },
  { group: '6–12 months', percentage: 28, accounts: 17215 },
  { group: '1–3 years', percentage: 24, accounts: 14755 },
  { group: '3+ years', percentage: 12, accounts: 7380 }
];

export const AUDIENCE_ACTIVITY_HOURLY = [
  { hour: '00:00', activity: 15 },
  { hour: '02:00', activity: 10 },
  { hour: '04:00', activity: 8 },
  { hour: '06:00', activity: 25 },
  { hour: '08:00', activity: 55 },
  { hour: '10:00', activity: 72 },
  { hour: '12:00', activity: 85 },
  { hour: '14:00', activity: 78 },
  { hour: '16:00', activity: 88 },
  { hour: '18:00', activity: 98 },
  { hour: '20:00', activity: 95 },
  { hour: '22:00', activity: 60 }
];

export const AUDIENCE_CLUSTERS: AudienceCluster[] = [
  {
    id: 'C1',
    name: 'Student & Candidate Discussion',
    accountsCount: 12841,
    mainTopics: ['Exam uncertainty', 'Schedule queries', 'Student concerns'],
    topHashtags: ['#ExamPaperLeak', '#StudentsDemandAnswers', '#ExamUpdate'],
    topNarrative: '#ExamPaperLeak',
    averageSentiment: 'Negative',
    sentimentBreakdown: { positive: 12, neutral: 24, negative: 64 },
    topAccounts: [
      { handle: '@student_voice', name: 'Student Voice Forum', followers: '82.4K' },
      { handle: '@candidate_forum', name: 'Candidate Forum', followers: '45.1K' },
      { handle: '@student_forum', name: 'Student Forum India', followers: '45.1K' }
    ]
  },
  {
    id: 'C2',
    name: 'Education News & Updates',
    accountsCount: 9442,
    mainTopics: ['News updates', 'Statements', 'Timeline analysis'],
    topHashtags: ['#ExamAuthority', '#OfficialUpdate', '#ExamNews'],
    topNarrative: 'Exam Authority Response',
    averageSentiment: 'Neutral',
    sentimentBreakdown: { positive: 24, neutral: 48, negative: 28 },
    topAccounts: [
      { handle: '@exam_newsdesk', name: 'Exam Newsdesk', followers: '120.5K' },
      { handle: '@education_watch', name: 'Education Watch Channel', followers: '64.2K' },
      { handle: '@education_forum', name: 'Education Forum', followers: '29.8K' }
    ]
  },
  {
    id: 'C3',
    name: 'Fact-Checking & Verification',
    accountsCount: 7821,
    mainTopics: ['Verification', 'Source checking', 'Screenshot comparison'],
    topHashtags: ['#VerifyBeforeShare', '#FactCheckIndia', '#ExamNews'],
    topNarrative: 'Verification & Fact-Checking',
    averageSentiment: 'Neutral',
    sentimentBreakdown: { positive: 15, neutral: 67, negative: 18 },
    topAccounts: [
      { handle: '@factcheck_india', name: 'FactCheck India', followers: '88.9K' },
      { handle: '@study_circle', name: 'Study Circle Network', followers: '28.4K' }
    ]
  },
  {
    id: 'C4',
    name: 'General Public Discussion',
    accountsCount: 6940,
    mainTopics: ['Public opinion', 'General reaction', 'Open discussions'],
    topHashtags: ['#StudentsDemandAnswers', '#PublicDiscussion'],
    topNarrative: '#StudentsDemandAnswers',
    averageSentiment: 'Neutral',
    sentimentBreakdown: { positive: 20, neutral: 52, negative: 28 },
    topAccounts: [
      { handle: '@public_discussion', name: 'Public Discussion Hub', followers: '29.8K' }
    ]
  },
  {
    id: 'C5',
    name: 'Exam Preparation Community',
    accountsCount: 4211,
    mainTopics: ['Study materials', 'Preparation advice', 'Schedule impact'],
    topHashtags: ['#ExamReschedule', '#ExamDates', '#StudyCircle'],
    topNarrative: 'Exam Rescheduling Discussion',
    averageSentiment: 'Neutral',
    sentimentBreakdown: { positive: 25, neutral: 50, negative: 25 },
    topAccounts: [
      { handle: '@study_circle', name: 'Study Circle Network', followers: '28.4K' }
    ]
  },
  {
    id: 'C6',
    name: 'Official & Institutional Updates',
    accountsCount: 2884,
    mainTopics: ['Official bulletins', 'Verification statements', 'Advisories'],
    topHashtags: ['#OfficialClarification', '#ExamNotice'],
    topNarrative: 'Official Clarification',
    averageSentiment: 'Positive',
    sentimentBreakdown: { positive: 51, neutral: 35, negative: 14 },
    topAccounts: [
      { handle: '@education_watch', name: 'Education Watch Channel', followers: '64.2K' }
    ]
  }
];

export const NETWORK_COMMUNITIES: NetworkCommunity[] = [
  {
    id: 'C1',
    name: 'Student Discussion Cluster',
    accountsCount: 12841,
    internalConnections: 34281,
    primaryNarrative: '#ExamPaperLeak',
    topHashtags: ['#ExamPaperLeak', '#StudentsDemandAnswers'],
    sentimentBreakdown: { positive: 12, neutral: 24, negative: 64 },
    topAccounts: ['@student_voice', '@candidate_forum', '@student_forum'],
    crossCommunityLinks: [
      { targetCommunity: 'C2 (Education News)', connectionsCount: 1421 },
      { targetCommunity: 'C3 (Fact-Checking)', connectionsCount: 842 }
    ],
    color: '#E96368'
  },
  {
    id: 'C2',
    name: 'Education News Cluster',
    accountsCount: 9442,
    internalConnections: 22190,
    primaryNarrative: 'Exam Authority Response',
    topHashtags: ['#ExamAuthority', '#OfficialUpdate'],
    sentimentBreakdown: { positive: 24, neutral: 48, negative: 28 },
    topAccounts: ['@exam_newsdesk', '@education_watch'],
    crossCommunityLinks: [
      { targetCommunity: 'C1 (Student Discussion)', connectionsCount: 1421 },
      { targetCommunity: 'C6 (Official Information)', connectionsCount: 628 }
    ],
    color: '#1678A8'
  },
  {
    id: 'C3',
    name: 'Fact-Checking Cluster',
    accountsCount: 7821,
    internalConnections: 18450,
    primaryNarrative: 'Verification & Fact-Checking',
    topHashtags: ['#VerifyBeforeShare', '#FactCheckIndia'],
    sentimentBreakdown: { positive: 15, neutral: 67, negative: 18 },
    topAccounts: ['@factcheck_india', '@study_circle'],
    crossCommunityLinks: [
      { targetCommunity: 'C1 (Student Discussion)', connectionsCount: 842 }
    ],
    color: '#35A879'
  },
  {
    id: 'C4',
    name: 'General Discussion Cluster',
    accountsCount: 6940,
    internalConnections: 15200,
    primaryNarrative: '#StudentsDemandAnswers',
    topHashtags: ['#StudentsDemandAnswers', '#PublicDiscussion'],
    sentimentBreakdown: { positive: 20, neutral: 52, negative: 28 },
    topAccounts: ['@public_discussion'],
    crossCommunityLinks: [
      { targetCommunity: 'C1 (Student Discussion)', connectionsCount: 950 }
    ],
    color: '#E3A33B'
  },
  {
    id: 'C5',
    name: 'Exam Preparation Community',
    accountsCount: 4211,
    internalConnections: 11200,
    primaryNarrative: 'Exam Rescheduling Discussion',
    topHashtags: ['#ExamReschedule', '#ExamDates'],
    sentimentBreakdown: { positive: 25, neutral: 50, negative: 25 },
    topAccounts: ['@study_circle'],
    crossCommunityLinks: [
      { targetCommunity: 'C1 (Student Discussion)', connectionsCount: 410 }
    ],
    color: '#179B8A'
  },
  {
    id: 'C6',
    name: 'Official Information Cluster',
    accountsCount: 2884,
    internalConnections: 8940,
    primaryNarrative: 'Official Clarification',
    topHashtags: ['#OfficialClarification', '#ExamNotice'],
    sentimentBreakdown: { positive: 51, neutral: 35, negative: 14 },
    topAccounts: ['@education_watch'],
    crossCommunityLinks: [
      { targetCommunity: 'C2 (Education News)', connectionsCount: 628 }
    ],
    color: '#6D70D8'
  }
];

export const NETWORK_NODES: NetworkNode[] = [
  // C1 Nodes
  {
    id: 'node-1',
    label: 'Student Voice Forum',
    handle: '@student_voice',
    followers: '82.4K',
    postsAnalysed: 486,
    connections: 1284,
    communityId: 'C1',
    communityName: 'Student Discussion',
    mainNarrative: '#ExamPaperLeak',
    sentiment: 'Negative',
    role: 'High-Connectivity Account',
    degree: 45,
    x: 220,
    y: 180
  },
  {
    id: 'node-2',
    label: 'Candidate Forum',
    handle: '@candidate_forum',
    followers: '45.1K',
    postsAnalysed: 320,
    connections: 840,
    communityId: 'C1',
    communityName: 'Student Discussion',
    mainNarrative: '#ExamPaperLeak',
    sentiment: 'Negative',
    role: 'Early Amplifier',
    degree: 32,
    x: 310,
    y: 140
  },
  {
    id: 'node-3',
    label: 'Student Forum India',
    handle: '@student_forum',
    followers: '45.1K',
    postsAnalysed: 210,
    connections: 520,
    communityId: 'C1',
    communityName: 'Student Discussion',
    mainNarrative: 'Exam Rescheduling Discussion',
    sentiment: 'Negative',
    role: 'Discussion Originator',
    degree: 22,
    x: 160,
    y: 250
  },
  {
    id: 'node-4',
    label: 'Candidate User',
    handle: '@candidate_user',
    followers: '12.3K',
    postsAnalysed: 110,
    connections: 310,
    communityId: 'C1',
    communityName: 'Student Discussion',
    mainNarrative: '#ExamPaperLeak',
    sentiment: 'Negative',
    role: 'Origin Node',
    degree: 15,
    x: 120,
    y: 160
  },

  // C2 Nodes
  {
    id: 'node-5',
    label: 'Exam Newsdesk',
    handle: '@exam_newsdesk',
    followers: '120.5K',
    postsAnalysed: 650,
    connections: 1890,
    communityId: 'C2',
    communityName: 'Education News',
    mainNarrative: 'Exam Authority Response',
    sentiment: 'Neutral',
    role: 'Media Bridge Node',
    degree: 48,
    x: 520,
    y: 220
  },
  {
    id: 'node-6',
    label: 'Education Forum',
    handle: '@education_forum',
    followers: '29.8K',
    postsAnalysed: 280,
    connections: 640,
    communityId: 'C2',
    communityName: 'Education News',
    mainNarrative: 'Exam Authority Response',
    sentiment: 'Neutral',
    role: 'Amplifier Node',
    degree: 26,
    x: 610,
    y: 170
  },

  // C3 Nodes
  {
    id: 'node-7',
    label: 'FactCheck India',
    handle: '@factcheck_india',
    followers: '88.9K',
    postsAnalysed: 310,
    connections: 710,
    communityId: 'C3',
    communityName: 'Fact-Checking',
    mainNarrative: 'Verification & Fact-Checking',
    sentiment: 'Neutral',
    role: 'Verification Lead',
    degree: 30,
    x: 350,
    y: 420
  },
  {
    id: 'node-8',
    label: 'Study Circle Network',
    handle: '@study_circle',
    followers: '28.4K',
    postsAnalysed: 180,
    connections: 410,
    communityId: 'C3',
    communityName: 'Fact-Checking',
    mainNarrative: 'Verification & Fact-Checking',
    sentiment: 'Neutral',
    role: 'Participant Node',
    degree: 18,
    x: 430,
    y: 490
  },

  // C4 Nodes
  {
    id: 'node-9',
    label: 'Public Discussion Hub',
    handle: '@public_discussion',
    followers: '29.8K',
    postsAnalysed: 190,
    connections: 480,
    communityId: 'C4',
    communityName: 'General Discussion',
    mainNarrative: '#StudentsDemandAnswers',
    sentiment: 'Neutral',
    role: 'Analysis Node',
    degree: 20,
    x: 580,
    y: 310
  },

  // C6 Nodes
  {
    id: 'node-10',
    label: 'Education Watch Channel',
    handle: '@education_watch',
    followers: '64.2K',
    postsAnalysed: 420,
    connections: 920,
    communityId: 'C6',
    communityName: 'Official Information',
    mainNarrative: 'Official Clarification',
    sentiment: 'Positive',
    role: 'Broadcast Hub',
    degree: 34,
    x: 750,
    y: 390
  }
];

export const NETWORK_EDGES: NetworkEdge[] = [
  { id: 'e1', source: 'node-4', target: 'node-1', relationship: 'Mentions', weight: 8 },
  { id: 'e2', source: 'node-3', target: 'node-1', relationship: 'Replies', weight: 12 },
  { id: 'e3', source: 'node-1', target: 'node-2', relationship: 'Reposts', weight: 24 },
  { id: 'e4', source: 'node-2', target: 'node-5', relationship: 'Shared URLs', weight: 19 },
  { id: 'e5', source: 'node-5', target: 'node-6', relationship: 'Reposts', weight: 15 },
  { id: 'e6', source: 'node-5', target: 'node-7', relationship: 'Mentions', weight: 11 },
  { id: 'e7', source: 'node-7', target: 'node-8', relationship: 'Replies', weight: 14 },
  { id: 'e8', source: 'node-5', target: 'node-9', relationship: 'Shared URLs', weight: 9 },
  { id: 'e9', source: 'node-1', target: 'node-10', relationship: 'Mentions', weight: 16 }
];

export const PROPAGATION_STEPS: PropagationStep[] = [
  {
    time: '09:00',
    activeNodeIds: ['node-4', 'node-3'],
    activeCommunityIds: ['C1'],
    newAccountsCount: 12,
    cumulativeAccounts: 12,
    description: 'Initial discussion posts published by candidate accounts (@candidate_user, @student_forum).'
  },
  {
    time: '10:00',
    activeNodeIds: ['node-4', 'node-3', 'node-1', 'node-2'],
    activeCommunityIds: ['C1'],
    newAccountsCount: 380,
    cumulativeAccounts: 392,
    description: 'High-connectivity hub @student_voice amplifies discussion within Student Community Cluster C1.'
  },
  {
    time: '11:00',
    activeNodeIds: ['node-4', 'node-3', 'node-1', 'node-2', 'node-5', 'node-6'],
    activeCommunityIds: ['C1', 'C2'],
    newAccountsCount: 1420,
    cumulativeAccounts: 1812,
    description: 'Cross-community bridge: @candidate_forum mentions @exam_newsdesk, entering Education News Cluster C2.'
  },
  {
    time: '12:00',
    activeNodeIds: ['node-4', 'node-3', 'node-1', 'node-2', 'node-5', 'node-6', 'node-9'],
    activeCommunityIds: ['C1', 'C2', 'C4'],
    newAccountsCount: 2450,
    cumulativeAccounts: 4262,
    description: 'General public engagement spikes as Cluster C4 (@public_discussion) picks up narrative.'
  },
  {
    time: '13:00',
    activeNodeIds: ['node-4', 'node-3', 'node-1', 'node-2', 'node-5', 'node-6', 'node-7', 'node-8', 'node-9'],
    activeCommunityIds: ['C1', 'C2', 'C3', 'C4'],
    newAccountsCount: 1840,
    cumulativeAccounts: 6102,
    description: 'Fact-checking accounts (@factcheck_india, @study_circle) evaluate screenshots and urge verification.'
  },
  {
    time: '14:00',
    activeNodeIds: ['node-4', 'node-3', 'node-1', 'node-2', 'node-5', 'node-6', 'node-7', 'node-8', 'node-9', 'node-10'],
    activeCommunityIds: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    newAccountsCount: 1182,
    cumulativeAccounts: 7284,
    description: 'Network-wide propagation reached across all 6 communities (7,284 unique accounts).'
  }
];

export const REPORT_PREVIEW_DATA = {
  reportTitle: 'SOCIAL MEDIA INTELLIGENCE ANALYSIS',
  reportId: 'NTRO-SIH26152-2026-0929-01',
  dateGenerated: '2026-09-29 12:45 UTC',
  author: 'Senior Cyber Intelligence Analyst (NTRO Unit 4)',
  classification: 'RESTRICTED / OFFICIAL USE ONLY',
  executiveSummary:
    'Analysis detected rapid growth in discussion associated with #ExamPaperLeak. Negative sentiment increased during the observation window, while multiple communities participated in propagation of the narrative. The underlying allegation remains unverified; results describe online discussion patterns rather than factual validation of the claim.',
  findings: [
    'Narrative #ExamPaperLeak escalated rapidly from 320 posts/hr at 08:00 to 1,840 posts/hr at 13:00.',
    'Key influential account @student_voice acted as primary driver with 1,284 direct connections and high eigenvector centrality.',
    'Geographic concentration is highest in Delhi NCR (14%) and Maharashtra (13%).',
    'Cross-community propagation was facilitated via Shared URLs and retweets between Student Discussion Cluster C1 and Education News Cluster C2.'
  ],
  recommendations: [
    'Maintain continuous monitoring on high-connectivity hubs @student_voice and @exam_newsdesk.',
    'Issue clear authenticated advisories to address unverified claims and prevent candidate confusion.',
    'Re-assess network communities at 16:00 UTC interval to track fact-checking counter-narrative traction.'
  ]
};
