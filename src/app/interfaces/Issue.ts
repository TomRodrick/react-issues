export interface formattedIssue {
  title: string;
  labels: Array<any>;
  url: string;
  body?: string;
  description?: string;
  closed_at: Date | null;
}
