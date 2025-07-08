export interface Report {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

export const reportsData: Report[] = [
  {
    id: "1",
    slug: "2024-strategic-business-intelligence",
    title: "2024 Strategic Business Intelligence Report",
    subtitle: "Comprehensive data-driven insights and analytical capabilities",
    description: "Our flagship annual report showcasing advanced analytics capabilities, service distribution analysis, and comprehensive performance metrics across all business verticals.",
    author: "Strategic Analytics Team",
    publishDate: "December 2024",
    category: "Annual Report",
    tags: ["Analytics", "Performance", "Strategy", "Annual"],
    readTime: "12 min read",
    featured: true
  },
  {
    id: "2",
    slug: "market-performance-analysis-2024",
    title: "Annual Market Performance Analysis",
    subtitle: "Market trends, growth opportunities, and competitive intelligence",
    description: "Comprehensive market research revealing significant growth opportunities across key sectors, with emerging trends indicating substantial year-over-year expansion.",
    author: "Market Research Division",
    publishDate: "November 2024",
    category: "Market Analysis",
    tags: ["Market Research", "Growth", "Competition", "Trends"],
    readTime: "8 min read",
    featured: true
  },
  {
    id: "3",
    slug: "regional-performance-global-expansion",
    title: "Regional Performance & Global Expansion Report",
    subtitle: "Geographic performance analysis and international market strategies",
    description: "Detailed analysis of regional performance across global markets, demonstrating consistent growth patterns and strategic expansion initiatives.",
    author: "Global Operations Team",
    publishDate: "October 2024",
    category: "Regional Analysis",
    tags: ["Global", "Regional", "Expansion", "Performance"],
    readTime: "10 min read",
    featured: false
  },
  {
    id: "4",
    slug: "technology-infrastructure-report",
    title: "Technology Infrastructure & Innovation Report",
    subtitle: "Digital transformation and operational excellence analysis",
    description: "Comprehensive overview of our technology infrastructure, digital transformation initiatives, and operational efficiency improvements.",
    author: "Technology Division",
    publishDate: "September 2024",
    category: "Technology",
    tags: ["Technology", "Innovation", "Digital", "Operations"],
    readTime: "9 min read",
    featured: false
  }
];

export const getReportBySlug = (slug: string): Report | undefined => {
  return reportsData.find(report => report.slug === slug);
};

export const getFeaturedReports = (): Report[] => {
  return reportsData.filter(report => report.featured);
};

export const getReportsByCategory = (category: string): Report[] => {
  return reportsData.filter(report => report.category === category);
};