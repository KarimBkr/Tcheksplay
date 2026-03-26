export interface RuleItem {
  id: string;
  label: string;
  value: string;
  highlight?: boolean;
  note?: string;
}

export interface RuleSection {
  id: string;
  title: string;
  emoji: string;
  color: string;
  summary: string;
  rules: RuleItem[];
}
