import { IOverallScore } from '@/services/dashboard/type';
import { Tag, Tooltip } from 'antd';

const getMarkColor = (percent: number) => {
  if (percent <= 40) return 'red';
  if (percent <= 60) return 'magenta';
  if (percent <= 80) return 'orange';
  if (percent <= 100) return 'green';
  return '';
};

export const getExamMark = (
  exam: IOverallScore,
  subjectName: string = 'Ball',
  hasSuffix: boolean = true
) => {
  if (!exam || (!exam.grade && exam.grade !== 0))
    return <Tag key={subjectName}>—</Tag>;
  const color = getMarkColor(exam?.percent);
  if (color) {
    if (exam.grade === 0)
      return (
        <Tooltip key={subjectName} title={`${subjectName}: ${exam.grade}`}>
          <Tag key={subjectName} color={color} style={{ margin: 0 }}>
            {hasSuffix
              ? `${exam?.grade} / ${exam?.max_ball}`
              : `${exam?.grade}`}
          </Tag>
        </Tooltip>
      );
    const round_grade =
      exam?.grade === Math.floor(exam?.grade)
        ? exam?.grade
        : exam?.grade.toFixed(2);
    return (
      <Tooltip key={subjectName} title={`${subjectName}: ${exam.grade}`}>
        <Tag color={color} style={{ margin: 0 }}>
          {hasSuffix ? `${round_grade} / ${exam?.max_ball}` : `${round_grade}`}
        </Tag>
      </Tooltip>
    );
  }
  return (
    <Tag key={subjectName} style={{ margin: 0 }}>
      {exam?.grade.toFixed(1)}
    </Tag>
  );
};
