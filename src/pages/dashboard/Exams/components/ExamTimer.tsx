import { formatTime } from '@/utils/dateFunc';
import { Flex, Progress, ProgressProps, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntersection } from 'react-use';

interface ExamTimerProps {
  totalSeconds: number;
  durationSeconds: number; // total duration in seconds
  onTimeEnd?: () => void; // callback when time finishes
}

export default function ExamTimer({
  durationSeconds,
  onTimeEnd,
  totalSeconds,
}: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const timerRef = useRef(null);
  const intersection = useIntersection(timerRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  // countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEnd?.();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // reverse progress %
  const progressPercent = useMemo(
    () => (timeLeft / totalSeconds) * 100,
    [timeLeft, durationSeconds]
  );

  const getProgressColor = useCallback(
    (progressPercent: number): ProgressProps['strokeColor'] => {
      if (progressPercent > 50)
        return {
          '0%': '#722ED1',
          '100%': '#b784ffff',
        };
      else if (progressPercent > 30)
        return {
          '0%': '#85007aff',
          '100%': '#f159e5ff',
        };
      else
        return {
          '0%': '#9c062cff',
          '100%': '#e74b72ff',
        };
    },
    []
  );

  return (
    <Flex vertical gap={8} className="time-left" ref={timerRef}>
      <Typography.Text strong style={{ fontSize: 24, color: '#722ED1' }}>
        <strong>{formatTime(timeLeft)}</strong>
      </Typography.Text>

      {/* reverse progress */}
      <Progress
        percent={progressPercent}
        status="active"
        showInfo={false}
        strokeColor={getProgressColor(progressPercent)}
      />

      {!intersection?.isIntersecting && (
        <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
          <Progress
            status="active"
            type="circle"
            percent={progressPercent}
            format={() => formatTime(timeLeft)}
            strokeColor={getProgressColor(progressPercent)}
            size="small"
          />
        </div>
      )}
    </Flex>
  );
}
