import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Rank } from '../types/Rank';

type Props<T extends string> = {
  data: Record<T, Rank>;
};

function RadarChart<T extends string>({ data }: Props<T>) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  // Update isMobile when window resizes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const wrapLabel = (label: string) => {
    if (!isMobile) return label;
    if (label.length > 8) {
      const mid = Math.ceil(label.length / 2);
      return label.slice(0, mid) + '\n' + label.slice(mid);
    }
    return label;
  };

  const indicators = Object.keys(data).map((key) => {
    const fullName = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
    return {
      name: wrapLabel(fullName),
      max: 8,
    };
  });

  const rankScale: Record<Rank, number> = {
    E: 1,
    D: 2,
    C: 3,
    B: 4,
    A: 5,
    S: 6,
    SS: 7,
    Mythic: 8,
  };

  const values = Object.values(data).map((rank) => rankScale[rank as Rank]);

  const option = {
    tooltip: { trigger: 'item' },
    radar: {
      indicator: indicators,
      radius: isMobile ? '65%' : '70%',
      splitNumber: 4,
      name: {
        fontSize: isMobile ? 10 : 14,
        distance: isMobile ? 18 : 15,
        color: '#ccd6f6',
      },
    },
    series: [
      {
        name: 'Profile',
        type: 'radar',
        areaStyle: { opacity: 0.2 },
        data: [{ value: values, name: 'Your Rank' }],
      },
    ],
    grid: {
      left: isMobile ? '5%' : '10%',
      right: isMobile ? '5%' : '10%',
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: isMobile ? 350 : 400, width: '100%' }}
    />
  );
}

export default RadarChart;
