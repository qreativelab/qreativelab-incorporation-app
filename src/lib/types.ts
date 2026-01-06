// Document Builder Types

export interface Step {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  estimatedTime: string;
  icon: string;
}

export const STEPS: Step[] = [
  {
    id: 1,
    title: "IP Valuation Memo",
    shortTitle: "Valuation",
    description: "Create a professional IP valuation memo for your OMEGA platform",
    estimatedTime: "~2 hours",
    icon: "💎"
  },
  {
    id: 2,
    title: "Technical Specification",
    shortTitle: "Tech Spec",
    description: "Document your system architecture and capabilities",
    estimatedTime: "~2 hours",
    icon: "⚙️"
  },
  {
    id: 3,
    title: "Cap Table v0.1",
    shortTitle: "Cap Table",
    description: "Create your initial capitalization table",
    estimatedTime: "~1 hour",
    icon: "📊"
  },
  {
    id: 4,
    title: "IP Contribution Agreement",
    shortTitle: "IP Agreement",
    description: "Legal agreement for IP contribution to corporation",
    estimatedTime: "~2 hours",
    icon: "📝"
  },
  {
    id: 5,
    title: "Articles of Incorporation",
    shortTitle: "Articles",
    description: "Official articles for CBCA incorporation",
    estimatedTime: "~3 hours",
    icon: "📜"
  },
  {
    id: 6,
    title: "Bylaws",
    shortTitle: "Bylaws",
    description: "Corporate bylaws and governance rules",
    estimatedTime: "~1.5 hours",
    icon: "⚖️"
  },
  {
    id: 7,
    title: "Shareholders' Agreement",
    shortTitle: "SHA",
    description: "Agreement between all shareholders",
    estimatedTime: "~3 hours",
    icon: "🤝"
  },
  {
    id: 8,
    title: "Compile & Export",
    shortTitle: "Export",
    description: "Review and export all documents",
    estimatedTime: "~1 hour",
    icon: "📦"
  }
];

// Form Data Types
export interface ValuationData {
  systemName: string;
  coreFeatures: string;
  uniqueAdvantages: string;
  developmentStatus: string;
  rebuildCost: string;
  revenueYear1: string;
  revenueYear2: string;
  revenueYear3: string;
}

export interface TechSpecData {
  architectureOverview: string;
  technologyStack: string;
  keyFeatures: string;
  competitorComparison: string;
  intellectualProperty: string;
  revenueModel: string;
  targetCustomer: string[];
  averageContractValue: string;
  totalAddressableMarket: string;
}

export interface CapTableData {
  founderName: string;
  founderAddress: string;
  founderCity: string;
  founderProvince: string;
  founderPostalCode: string;
  incorporationDate: string;
  classAShares: string;
}

export interface IPAgreementData {
  // Most auto-filled from previous steps
  effectiveDate: string;
  witnessName: string;
}

export interface ArticlesData {
  companyName: string;
  registeredAddress: string;
  registeredCity: string;
  registeredProvince: string;
  registeredPostalCode: string;
  directorNames: string;
  confirm5ClassStructure: boolean;
}

export interface BylawsData {
  boardMeetingFrequency: string;
  fiscalYearEnd: string;
  additionalBoardMembers: string;
}

export interface ShareholdersData {
  cofounderNames: string;
  advisorNames: string;
  capitalRaiseVetoThreshold: string;
  pivotVetoThreshold: string;
  informationRights: string[];
  transferRestrictionType: string;
}

export interface FormData {
  valuation: ValuationData;
  techSpec: TechSpecData;
  capTable: CapTableData;
  ipAgreement: IPAgreementData;
  articles: ArticlesData;
  bylaws: BylawsData;
  shareholders: ShareholdersData;
}

export const initialFormData: FormData = {
  valuation: {
    systemName: "OMEGA AI Orchestration Platform",
    coreFeatures: "",
    uniqueAdvantages: "",
    developmentStatus: "production",
    rebuildCost: "10000000",
    revenueYear1: "",
    revenueYear2: "",
    revenueYear3: ""
  },
  techSpec: {
    architectureOverview: "",
    technologyStack: "",
    keyFeatures: "",
    competitorComparison: "",
    intellectualProperty: "",
    revenueModel: "saas",
    targetCustomer: [],
    averageContractValue: "",
    totalAddressableMarket: ""
  },
  capTable: {
    founderName: "",
    founderAddress: "",
    founderCity: "",
    founderProvince: "QC",
    founderPostalCode: "",
    incorporationDate: "",
    classAShares: "1000"
  },
  ipAgreement: {
    effectiveDate: "",
    witnessName: ""
  },
  articles: {
    companyName: "QréativeLab Inc.",
    registeredAddress: "",
    registeredCity: "",
    registeredProvince: "QC",
    registeredPostalCode: "",
    directorNames: "",
    confirm5ClassStructure: false
  },
  bylaws: {
    boardMeetingFrequency: "quarterly",
    fiscalYearEnd: "December 31",
    additionalBoardMembers: "no"
  },
  shareholders: {
    cofounderNames: "",
    advisorNames: "",
    capitalRaiseVetoThreshold: "66.7",
    pivotVetoThreshold: "100",
    informationRights: ["quarterly", "monthly", "capTable", "annual", "minutes"],
    transferRestrictionType: "combination"
  }
};

// Research Result Types
export interface ResearchResult {
  query: string;
  results: string[];
  sources: string[];
  timestamp: number;
  loading: boolean;
}
