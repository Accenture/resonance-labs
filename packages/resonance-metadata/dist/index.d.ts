export type LabsStatus = 'implemented' | 'partial' | 'missing' | 'not-applicable';

export type RiskLevel = 'low' | 'medium' | 'high';

export type ComponentSummary = {
  component: string;
  title: string;
  category: string;
  specCount: number;
  testCases: number;
  labsExamples: number;
  labsAlignment: number;
  implemented: number;
  partial: number;
  missing: number;
  risk: RiskLevel;
  lastUpdated: string;
};

export type LabsExample = {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
};

export type CriterionEntry = {
  status: LabsStatus;
  examples: string[];
};

export type ComponentSummaryFile = {
  generatedAt: string;
  specsVersion: string;
  labsVersion: string;
  components: ComponentSummary[];
};

export type ExamplesFile = {
  generatedAt: string;
  components: Record<string, LabsExample[]>;
};

export type CategorySummary = {
  category: string;
  components: number;
  labsAlignment: number;
};

export type CoverageSummaryFile = {
  generatedAt: string;
  specsVersion: string;
  labsVersion: string;
  summary: {
    components: number;
    overallLabsAlignment: number;
    implemented: number;
    partial: number;
    missing: number;
  };
  byCategory: CategorySummary[];
};

export type CriterionMapFile = {
  generatedAt: string;
  components: Record<string, Record<string, CriterionEntry>>;
};

export declare const componentSummary: ComponentSummaryFile;
export declare const examples: ExamplesFile;
export declare const coverageSummary: CoverageSummaryFile;
export declare const criterionMap: CriterionMapFile;
