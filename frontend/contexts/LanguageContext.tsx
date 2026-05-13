'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = 'zh' | 'en'

interface Translations {
  // Sidebar
  appTitle: string
  research: string
  compare: string
  history: string
  aiModel: string
  apiKey: string
  apiKeyPlaceholder: string
  backendConnected: string

  // Research Interface
  startResearch: string
  startResearchDesc: string
  askQuestion: string
  researching: string
  stop: string
  researchBtn: string
  thinkingSteps: string
  sources: string
  live: string
  progress: string
  showFullContent: string
  showInChat: string
  noStepsYet: string
  noSourcesYet: string
  exportMd: string
  exportHtml: string
  copyDocs: string
  researchCompleted: string
  showFinalReport: string
  researchSession: string
  startingResearch: string
  researchProgress: string
  hide: string
  words: string
  loading: string
  noThinkingSteps: string
  stepsWillAppear: string
  noSourcesAvailable: string
  sourcesWillAppear: string
  processing: string
  viewMetadata: string
  workingOn: string
  newResearch: string

  // Compare
  modelComparison: string
  compareDescription: string
  apiKeyConfig: string
  configured: string
  configure: string
  clearAllKeys: string
  keysStoredLocally: string
  noKeysConfigured: string
  runComparison: string
  researchQuery: string
  queryPlaceholder: string
  modelsToCompare: string
  runComparisonBtn: string
  runningComparison: string
  missingApiKeys: string
  runningParallel: string
  completed: string
  latestResults: string
  performanceOverview: string
  refreshData: string
  totalComparisons: string
  avgResponseTime: string
  activeModels: string
  runs: string
  successRate: string
  avgTime: string
  avgSources: string
  avgWords: string
  clickToViewReport: string
  stopComparison: string
  newComparison: string

  // History
  researchHistory: string
  historyDescription: string
  databaseIntegration: string
  databaseDescription: string
  setupGuide: string
  historyCount: string
  searchHistory: string
  noHistoryYet: string
  noHistoryDesc: string
  noSearchResults: string
  selectSessionToView: string
  backToList: string
  deleteSession: string
  confirmDeleteMsg: string
  confirmDeleteBtn: string
  cancelBtn: string
  historyConnectionError: string
  historyConnectionErrorDesc: string

  // Models
  zhipuName: string
  zhipuDesc: string
  deepseekName: string
  deepseekDesc: string
  deepseekV4ProName: string
  deepseekV4ProDesc: string
  kimiK26Name: string
  kimiK26Desc: string
  multiStageTitle: string
  multiStageThinking: string
  multiStageWriting: string
}

const translations: Record<Language, Translations> = {
  zh: {
    appTitle: 'Nano Deepresearch',
    research: '单独研究',
    compare: '对比研究',
    history: '历史',
    aiModel: 'AI 模型',
    apiKey: 'API 密钥',
    apiKeyPlaceholder: '输入你的 API 密钥...',
    backendConnected: '后端已连接',

    startResearch: '开始你的研究',
    startResearchDesc: '提出问题，开始全面的AI驱动研究',
    askQuestion: '输入研究问题...',
    researching: '研究中...',
    stop: '停止',
    researchBtn: '研究',
    thinkingSteps: '思考步骤',
    sources: '来源',
    live: '实时',
    progress: '进度',
    showFullContent: '▼ 显示完整内容',
    showInChat: '在对话中显示',
    noStepsYet: '暂无思考步骤，开始研究后将显示',
    noSourcesYet: '暂无来源，完成研究后将显示',
    exportMd: 'MD',
    exportHtml: 'HTML',
    copyDocs: '复制',
    researchCompleted: '✨ 研究完成！最终报告已准备好。',
    showFinalReport: '📄 显示最终报告',
    researchSession: '研究会话',
    startingResearch: '开始研究流程...',
    researchProgress: '研究进度',
    hide: '隐藏',
    words: '字',
    loading: '加载中...',
    noThinkingSteps: '暂无思考步骤',
    stepsWillAppear: '步骤将在AI处理研究时显示',
    noSourcesAvailable: '暂无可用来源',
    sourcesWillAppear: '来源将随着研究进展显示',
    processing: '处理中',
    viewMetadata: '查看元数据',
    workingOn: '正在工作',
    newResearch: '新建研究',

    modelComparison: '模型性能对比',
    compareDescription: '对比不同 AI 模型的性能指标。对同一问题运行多个模型，查看详细的时间、质量和性能差异。',
    apiKeyConfig: 'API 密钥配置',
    configured: '已配置',
    configure: '配置',
    clearAllKeys: '清除所有密钥',
    keysStoredLocally: '密钥保存在本地浏览器中',
    noKeysConfigured: '⚠️ 未配置 API 密钥。点击"配置"来设置模型对比所需的密钥。',
    runComparison: '运行对比',
    researchQuery: '研究问题',
    queryPlaceholder: '输入要跨模型对比的研究问题...',
    modelsToCompare: '对比模型',
    runComparisonBtn: '运行对比',
    runningComparison: '对比运行中...',
    missingApiKeys: '所选模型缺少 API 密钥，请先配置。',
    runningParallel: '并行对比运行中',
    completed: '已完成',
    latestResults: '最新对比结果',
    performanceOverview: '性能概览',
    refreshData: '刷新数据',
    totalComparisons: '总对比次数',
    avgResponseTime: '平均响应时间',
    activeModels: '活跃模型',
    runs: '次运行',
    successRate: '成功率',
    avgTime: '平均时间',
    avgSources: '平均来源',
    avgWords: '平均字数',
    clickToViewReport: '点击查看报告',
    stopComparison: '停止对比',
    newComparison: '新建对比',

    researchHistory: '研究历史',
    historyDescription: '跟踪研究会话并对比模型性能。',
    databaseIntegration: '数据库集成可用',
    databaseDescription: '通过集成 Supabase 启用持久化历史和模型对比跟踪。可以保存研究会话、对比模型性能指标，并跟踪改进。',
    setupGuide: '设置指南：查看 README.md 获取 Supabase 集成说明',
    historyCount: '条记录',
    searchHistory: '搜索历史记录...',
    noHistoryYet: '暂无研究历史',
    noHistoryDesc: '完成你的第一次研究后，历史记录将自动保存在这里。',
    noSearchResults: '未找到匹配的记录',
    selectSessionToView: '选择一条研究记录查看详情',
    backToList: '返回列表',
    deleteSession: '删除此记录',
    confirmDeleteMsg: '确定要删除这条研究记录吗？此操作不可撤销。',
    confirmDeleteBtn: '删除',
    cancelBtn: '取消',
    historyConnectionError: '数据库连接失败',
    historyConnectionErrorDesc: '无法连接到 InstantDB。请检查你的 App ID 是否正确配置。',

    zhipuName: '智谱 GLM-4.7',
    zhipuDesc: '智谱AI最新旗舰模型，支持交错式思考',
    deepseekName: 'DeepSeek V3.2',
    deepseekDesc: 'DeepSeek V3.2 671B MoE模型，GPT-5级性能',
    deepseekV4ProName: 'DeepSeek V4 Pro',
    deepseekV4ProDesc: 'DeepSeek V4 Pro 1.6T参数 / 49B激活，1M上下文',
    kimiK26Name: 'Kimi K2.6',
    kimiK26Desc: 'Kimi K2.6 1T MoE 模型，256K 上下文，思考模式默认开启',
    multiStageTitle: '本次研究分阶段调度',
    multiStageThinking: '思考链路（澄清、研究简报、规划、检索）使用 Kimi K2.6',
    multiStageWriting: '压缩与最终报告使用 DeepSeek V4 Pro',
  },
  en: {
    appTitle: 'Nano Deepresearch',
    research: 'Single Research',
    compare: 'Compare Research',
    history: 'History',
    aiModel: 'AI Model',
    apiKey: 'API Key',
    apiKeyPlaceholder: 'Enter your API key...',
    backendConnected: 'Backend Connected',

    startResearch: 'Start Your Research',
    startResearchDesc: 'Ask a question to begin comprehensive AI-powered research',
    askQuestion: 'Ask a research question...',
    researching: 'Researching...',
    stop: 'Stop',
    researchBtn: 'Research',
    thinkingSteps: 'Thinking Steps',
    sources: 'Sources',
    live: 'Live',
    progress: 'Progress',
    showFullContent: '▼ Show full content',
    showInChat: 'Show in Chat',
    noStepsYet: 'No thinking steps yet. Start a research to see them.',
    noSourcesYet: 'No sources yet. Complete a research to see them.',
    exportMd: 'MD',
    exportHtml: 'HTML',
    copyDocs: 'Copy',
    researchCompleted: '✨ Research completed! Final report is ready.',
    showFinalReport: '📄 Show Final Report',
    researchSession: 'Research Session',
    startingResearch: 'Starting research process...',
    researchProgress: 'Research Progress',
    hide: 'Hide',
    words: 'words',
    loading: 'Loading...',
    noThinkingSteps: 'No thinking steps yet',
    stepsWillAppear: 'Steps will appear here as AI processes your research',
    noSourcesAvailable: 'No sources available yet',
    sourcesWillAppear: 'Sources will appear as research progresses',
    processing: 'Processing',
    viewMetadata: 'View metadata',
    workingOn: 'Working',
    newResearch: 'New Research',

    modelComparison: 'Model Performance Comparison',
    compareDescription: 'Compare AI model performance across different metrics. Run the same query on multiple models to see detailed timing, quality, and performance differences.',
    apiKeyConfig: 'API Key Configuration',
    configured: 'configured',
    configure: 'Configure',
    clearAllKeys: 'Clear All Keys',
    keysStoredLocally: 'Keys are stored locally in your browser',
    noKeysConfigured: '⚠️ No API keys configured. Click "Configure" to set up your keys for model comparison.',
    runComparison: 'Run Comparison',
    researchQuery: 'Research Query',
    queryPlaceholder: 'Enter your research question to compare across models...',
    modelsToCompare: 'Models to Compare',
    runComparisonBtn: 'Run Comparison',
    runningComparison: 'Running Comparison...',
    missingApiKeys: 'Missing API keys for selected models. Configure keys above.',
    runningParallel: 'Running Parallel Comparison',
    completed: 'completed',
    latestResults: 'Latest Comparison Results',
    performanceOverview: 'Performance Overview',
    refreshData: 'Refresh Data',
    totalComparisons: 'Total Comparisons',
    avgResponseTime: 'Avg Response Time',
    activeModels: 'Active Models',
    runs: 'runs',
    successRate: 'success rate',
    avgTime: 'Avg Time',
    avgSources: 'Avg Sources',
    avgWords: 'Avg Words',
    clickToViewReport: 'Click to view report',
    stopComparison: 'Stop',
    newComparison: 'New Comparison',

    researchHistory: 'Research History',
    historyDescription: 'Track your research sessions and compare model performance over time.',
    databaseIntegration: 'Database Integration Available',
    databaseDescription: 'Enable persistent history and model comparison tracking by integrating with Supabase. This allows you to save research sessions, compare model performance metrics, and track improvements over time.',
    setupGuide: 'Setup Guide: Check the README.md for Supabase integration instructions',
    historyCount: 'records',
    searchHistory: 'Search history...',
    noHistoryYet: 'No Research History',
    noHistoryDesc: 'Your research history will be saved here automatically after completing your first research.',
    noSearchResults: 'No matching records found',
    selectSessionToView: 'Select a research record to view details',
    backToList: 'Back to list',
    deleteSession: 'Delete this record',
    confirmDeleteMsg: 'Are you sure you want to delete this record? This action cannot be undone.',
    confirmDeleteBtn: 'Delete',
    cancelBtn: 'Cancel',
    historyConnectionError: 'Database Connection Failed',
    historyConnectionErrorDesc: 'Unable to connect to InstantDB. Please check if your App ID is configured correctly.',

    zhipuName: 'Zhipu GLM-4.7',
    zhipuDesc: 'Zhipu AI flagship model with interleaved thinking',
    deepseekName: 'DeepSeek V3.2',
    deepseekDesc: 'DeepSeek V3.2 671B MoE model, GPT-5 level performance',
    deepseekV4ProName: 'DeepSeek V4 Pro',
    deepseekV4ProDesc: 'DeepSeek V4 Pro 1.6T params / 49B active, 1M context',
    kimiK26Name: 'Kimi K2.6',
    kimiK26Desc: 'Kimi K2.6 1T MoE model, 256K context, thinking mode by default',
    multiStageTitle: 'Multi stage dispatch this run',
    multiStageThinking: 'Thinking chain (clarify, brief, plan, retrieval) uses Kimi K2.6',
    multiStageWriting: 'Compression and final report use DeepSeek V4 Pro',
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('zh')

  useEffect(() => {
    const saved = localStorage.getItem('app_language') as Language
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('app_language', lang)
  }

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh'
    setLanguage(newLang)
  }

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: translations[language],
      toggleLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  )
}
