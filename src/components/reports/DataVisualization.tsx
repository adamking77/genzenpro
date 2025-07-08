// import React from 'react'; // Removed as React is not explicitly used
import {
  LineChart, BarChart, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { useScrollTrigger } from '../../hooks/useScrollTrigger'; // Updated path

// Define the expected props
interface DataVisualizationProps {
  chartType: 'LineChart' | 'BarChart' | 'PieChart';
  data: any[];
  config?: any;
  title?: string;
  description?: string;
}

// A helper to generate colors if not provided in config or data
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const DataVisualization: React.FC<DataVisualizationProps> = ({ chartType, data, config, title, description }) => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1 });

  const renderChart = () => {
    if (!data || data.length === 0) {
      return <p>No data available for visualization.</p>;
    }

    switch (chartType) {
      case 'PieChart':
        return (
          <ResponsiveContainer width="100%" height={config?.height || 400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={config?.labelLine !== undefined ? config.labelLine : false}
                label={config?.label || (({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`)}
                outerRadius={config?.outerRadius || 150}
                innerRadius={config?.innerRadius || 0}
                fill="#8884d8"
                dataKey={config?.dataKey || "value"}
                animationBegin={isVisible ? 0 : 999999}
                animationDuration={isVisible ? 1500 : 0}
                paddingAngle={config?.paddingAngle || 1}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, _name, props) => [`${value}`, `${props.payload.name}`]} />
              {config?.legend !== false && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      case 'LineChart':
        return (
          <ResponsiveContainer width="100%" height={config?.height || 400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray={config?.gridStrokeDasharray || "3 3"} />
              <XAxis dataKey={config?.xAxisDataKey || "name"} />
              <YAxis />
              <Tooltip />
              {config?.legend !== false && <Legend />}
              {(config?.lines || [{ dataKey: "value", stroke: "#8884d8" }]).map((lineProps: any, index: number) => (
                <Line key={index} type="monotone" {...lineProps} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case 'BarChart':
        return (
          <ResponsiveContainer width="100%" height={config?.height || 400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray={config?.gridStrokeDasharray || "3 3"} />
              <XAxis dataKey={config?.xAxisDataKey || "name"} />
              <YAxis />
              <Tooltip />
              {config?.legend !== false && <Legend />}
              {(config?.bars || [{ dataKey: "value", fill: "#8884d8" }]).map((barProps: any, index: number) => (
                 <Bar key={index} {...barProps}>
                  {config?.barCells && data.map((entry, cellIndex) => (
                    <Cell key={`cell-${cellIndex}`} fill={entry.color || COLORS[cellIndex % COLORS.length]} />
                  ))}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return <p>Unsupported chart type: {chartType}</p>;
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-light leading-tight tracking-tight text-foreground mb-4 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base font-light text-foreground/70 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className={`chart-container ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ minHeight: config?.height || 400 }}>
          {renderChart()}
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;