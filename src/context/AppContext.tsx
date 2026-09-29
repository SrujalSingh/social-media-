import React, { createContext, useContext, useState } from 'react';
import type { SocialPost, Narrative, NetworkNode, NetworkCommunity } from '../types';
import { NARRATIVES_DATA, NETWORK_NODES, NETWORK_COMMUNITIES } from '../data/mockData';

export type ActivePage =
  | 'dashboard'
  | 'feed'
  | 'sentiment'
  | 'audience'
  | 'narratives'
  | 'network'
  | 'communities'
  | 'propagation'
  | 'workspace'
  | 'reports'
  | 'datasources'
  | 'settings';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning';
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedNarrativeId: string;
  setSelectedNarrativeId: (id: string) => void;
  selectedNarrative: Narrative;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  selectedNode: NetworkNode | null;
  selectedPost: SocialPost | null;
  setSelectedPost: (post: SocialPost | null) => void;
  selectedClusterId: string | null;
  setSelectedClusterId: (id: string | null) => void;
  selectedCluster: NetworkCommunity | null;
  globalSearch: string;
  setGlobalSearch: (query: string) => void;
  sentimentFilter: string;
  setSentimentFilter: (sentiment: string) => void;
  isDemoRunning: boolean;
  demoProgress: number;
  demoStageName: string;
  runDemoAnalysis: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning') => void;
  removeToast: (id: string) => void;
  openPostDetail: (post: SocialPost) => void;
  openAccountDetail: (handle: string) => void;
  openNarrativeDetail: (titleOrId: string) => void;
  openNetworkContext: (handle?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [selectedNarrativeId, setSelectedNarrativeId] = useState<string>('nar-1'); // #ExamPaperLeak
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-1'); // @student_voice
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>('C1');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [sentimentFilter, setSentimentFilter] = useState<string>('All');
  
  // Demo states
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoProgress, setDemoProgress] = useState<number>(0);
  const [demoStageName, setDemoStageName] = useState<string>('');
  
  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const selectedNarrative =
    NARRATIVES_DATA.find((n) => n.id === selectedNarrativeId) || NARRATIVES_DATA[0];

  const selectedNode =
    NETWORK_NODES.find((n) => n.id === selectedNodeId) || NETWORK_NODES[0];

  const selectedCluster =
    NETWORK_COMMUNITIES.find((c) => c.id === selectedClusterId) || NETWORK_COMMUNITIES[0];

  const runDemoAnalysis = () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    setDemoProgress(0);

    const stages = [
      { name: 'Loading social-media dataset...', page: 'dashboard' as ActivePage, progress: 10 },
      { name: 'Analysing public sentiment...', page: 'sentiment' as ActivePage, progress: 20 },
      { name: 'Detecting emerging narratives...', page: 'narratives' as ActivePage, progress: 30 },
      { name: 'Rapid growth detected: #ExamPaperLeak', page: 'narratives' as ActivePage, progress: 42 },
      { name: 'Identifying audience clusters...', page: 'audience' as ActivePage, progress: 54 },
      { name: 'Building interaction network...', page: 'network' as ActivePage, progress: 66 },
      { name: '6 major communities identified', page: 'communities' as ActivePage, progress: 78 },
      { name: 'Tracing narrative propagation...', page: 'propagation' as ActivePage, progress: 88 },
      { name: 'Cross-community propagation detected', page: 'propagation' as ActivePage, progress: 95 },
      { name: 'Analysis ready', page: 'reports' as ActivePage, progress: 100 }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < stages.length) {
        const step = stages[currentStep];
        setDemoStageName(step.name);
        setDemoProgress(step.progress);
        setActivePage(step.page);
        addToast(`Demo Analysis Stage ${currentStep + 1}/10`, step.name, 'info');
        currentStep++;
      } else {
        clearInterval(interval);
        setIsDemoRunning(false);
        addToast('Intelligence Analysis Ready', 'Generated Social Intelligence Analysis Report for #ExamPaperLeak', 'success');
      }
    }, 900);
  };

  const openPostDetail = (post: SocialPost) => {
    setSelectedPost(post);
  };

  const openAccountDetail = (handle: string) => {
    const node = NETWORK_NODES.find((n) => n.handle.toLowerCase() === handle.toLowerCase());
    if (node) {
      setSelectedNodeId(node.id);
    }
    setActivePage('network');
  };

  const openNarrativeDetail = (titleOrId: string) => {
    const nar = NARRATIVES_DATA.find(
      (n) => n.id === titleOrId || n.title.toLowerCase() === titleOrId.toLowerCase()
    );
    if (nar) {
      setSelectedNarrativeId(nar.id);
    }
    setActivePage('narratives');
  };

  const openNetworkContext = (handle?: string) => {
    if (handle) {
      const node = NETWORK_NODES.find((n) => n.handle.toLowerCase() === handle.toLowerCase());
      if (node) {
        setSelectedNodeId(node.id);
      }
    }
    setActivePage('network');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedNarrativeId,
        setSelectedNarrativeId,
        selectedNarrative,
        selectedNodeId,
        setSelectedNodeId,
        selectedNode,
        selectedPost,
        setSelectedPost,
        selectedClusterId,
        setSelectedClusterId,
        selectedCluster,
        globalSearch,
        setGlobalSearch,
        sentimentFilter,
        setSentimentFilter,
        isDemoRunning,
        demoProgress,
        demoStageName,
        runDemoAnalysis,
        toasts,
        addToast,
        removeToast,
        openPostDetail,
        openAccountDetail,
        openNarrativeDetail,
        openNetworkContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
