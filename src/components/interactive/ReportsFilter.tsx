import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import type { Report } from '../../data/reports';
import ReportCard from '../reports/ReportCard.astro';

interface ReportsFilterProps {
  reports: Report[];
}

const ReportsFilter = ({ reports }: ReportsFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(reports.map(report => report.category)))];
  
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [reports, searchTerm, selectedCategory]);

  const featuredReports = filteredReports.filter(report => report.featured);
  const regularReports = filteredReports.filter(report => !report.featured);

  return (
    <div className="space-y-20">
      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-foreground/10 rounded-lg text-sm font-light text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/30 transition-colors duration-300"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Filter className="h-4 w-4 text-foreground/40" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-light rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Reports */}
      {featuredReports.length > 0 && (
        <div className="space-y-12">
          <h2 className="text-2xl font-light tracking-tight text-foreground">
            Featured Reports
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredReports.map((report) => (
              <div key={report.id} className="lg:col-span-2">
                <a 
                  href={`/reports/${report.slug}/`}
                  className="group block transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-background border border-foreground/10 rounded-lg p-8 h-full hover:border-foreground/30 hover:shadow-xl transition-all duration-300">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full">
                              {report.category}
                            </span>
                            {report.featured && (
                              <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-light rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs font-light text-foreground/40 tracking-wider">
                          {String(report.id).padStart(2, '0')}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-light leading-tight tracking-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300">
                          {report.title}
                        </h3>
                        
                        <p className="text-base font-light text-foreground/70 leading-relaxed line-clamp-3">
                          {report.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                        <div className="flex items-center space-x-4 text-xs font-light text-foreground/50">
                          <div className="flex items-center space-x-1">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>{report.publishDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{report.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs font-light text-foreground group-hover:text-blue-500 transition-colors duration-300">
                          Read Report →
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Reports */}
      {regularReports.length > 0 && (
        <div className="space-y-12">
          <h2 className="text-2xl font-light tracking-tight text-foreground">
            {featuredReports.length > 0 ? 'All Reports' : 'Reports'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularReports.map((report) => (
              <a 
                key={report.id}
                href={`/reports/${report.slug}/`}
                className="group block transition-all duration-300 hover:scale-105"
              >
                <div className="bg-background border border-foreground/10 rounded-lg p-8 h-full hover:border-foreground/30 hover:shadow-xl transition-all duration-300">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full">
                            {report.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs font-light text-foreground/40 tracking-wider">
                        {String(report.id).padStart(2, '0')}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-light leading-tight tracking-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {report.title}
                      </h3>
                      
                      <p className="text-base font-light text-foreground/70 leading-relaxed line-clamp-3">
                        {report.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                      <div className="flex items-center space-x-4 text-xs font-light text-foreground/50">
                        <div className="flex items-center space-x-1">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>{report.publishDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>{report.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs font-light text-foreground group-hover:text-blue-500 transition-colors duration-300">
                        Read Report →
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredReports.length === 0 && (
        <div className="text-center py-20">
          <div className="space-y-4">
            <h3 className="text-xl font-light text-foreground">No reports found</h3>
            <p className="text-base font-light text-foreground/70">
              Try adjusting your search terms or filter criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsFilter;