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
    const fullName = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ');

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

  const values = Object.values(data).map(
    (rank) => rankScale[rank as Rank]
  );

  const option = {
    backgroundColor: 'transparent',

    animationDuration: 1200,

    tooltip: {
      trigger: 'item',
      backgroundColor: '#0d1b31',
      borderColor: '#38F2DC',
      textStyle: {
        color: '#ffffff',
      },
    },

    radar: {
      indicator: indicators,

      radius: isMobile ? '66%' : '73%',

      splitNumber: 5,

      shape: 'polygon',

      name: {
        color: '#E7EEF9',
        fontSize: isMobile ? 11 : 14,
        fontWeight: 500,
      },

      axisNameGap: 12,

      axisLine: {
        lineStyle: {
          color: 'rgba(56,242,220,.12)',
          width: 1,
        },
      },

      splitLine: {
        lineStyle: {
          color: 'rgba(56,242,220,.10)',
          width: 1,
        },
      },

      splitArea: {
        areaStyle: {
          color: [
            'rgba(56,242,220,.01)',
            'rgba(56,242,220,.015)',
            'rgba(56,242,220,.02)',
            'rgba(56,242,220,.025)',
            'rgba(56,242,220,.03)',
          ],
        },
      },
    },

    series: [
      {
        type: 'radar',

        symbol: 'circle',

        symbolSize: 10,

        data: [
          {
            value: values,
            name: 'Profile',

            lineStyle: {
              color: '#38F2DC',
              width: 4,
              shadowBlur: 18,
              shadowColor: '#38F2DC',
            },

            itemStyle: {
              color: '#4EF8E4',
              borderColor: '#B8FFF6',
              borderWidth: 2,
              shadowBlur: 16,
              shadowColor: '#38F2DC',
            },

            areaStyle: {
              color: 'rgba(56,242,220,.08)',
            },
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{
        width: '100%',
        height: isMobile ? 320 : 360,
      }}
    />
  );
}

export default RadarChart;