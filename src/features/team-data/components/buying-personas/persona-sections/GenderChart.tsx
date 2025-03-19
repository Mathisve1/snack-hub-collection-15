
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Users } from "lucide-react";

type GenderChartProps = {
  genders: Record<string, number>;
};

export const GenderChart = ({ genders }: GenderChartProps) => {
  // Calculate total count for percentage calculations
  const totalGenderCount = Object.values(genders).reduce((sum, count) => sum + count, 0);
  
  // Transform the data for the pie chart
  const data = Object.entries(genders).map(([gender, count]) => {
    const percentage = Math.round((count / totalGenderCount) * 100);
    return {
      name: gender.charAt(0).toUpperCase() + gender.slice(1),
      value: count,
      percentage
    };
  });

  // Define gender-specific colors
  const getGenderColor = (gender: string) => {
    const lowerGender = gender.toLowerCase();
    if (lowerGender === "vrouw" || lowerGender === "vrouwen") return "#D946EF"; // Pink for women
    if (lowerGender === "man" || lowerGender === "mannen") return "#0EA5E9"; // Blue for men
    return "#8884d8"; // Default purple for other genders
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-1 flex items-center">
        <Users className="h-4 w-4 mr-1.5 text-gray-600" />
        Geslacht
      </h4>
      <div className="h-48 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => {
                const color = getGenderColor(entry.name);
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [`${value} (${Math.round((value / totalGenderCount) * 100)}%)`, name]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
