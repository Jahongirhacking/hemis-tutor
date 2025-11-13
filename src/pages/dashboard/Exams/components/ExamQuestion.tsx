import { IExamQuestion } from '@/services/exams/type';
import { Checkbox, Flex, Radio } from 'antd';

const ExamQuestion = ({
  question,
  index,
  handleSelect,
}: {
  question: IExamQuestion;
  index: number;
  handleSelect: (
    id: number,
    value: number | number[],
    multiple: boolean
  ) => void;
}) => {
  return (
    <Flex vertical>
      <div>
        <strong>
          {index + 1}. {`${question?.title || ''}`}
        </strong>
        <p style={{ whiteSpace: 'pre-line' }}>{question?.content || ''}</p>
      </div>

      {/* 🧩 Added: render question options */}
      <div style={{ marginTop: 10 }}>
        {question?.multiple ? (
          <Checkbox.Group
            value={question?.selected || []}
            onChange={vals => {
              const val = vals as number[];
              handleSelect(question?.id, val, false);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {question?.options?.map(opt => (
              <Checkbox key={opt?.code} value={opt?.index}>
                {`${opt?.code}) ${opt?.label}`}
              </Checkbox>
            ))}
          </Checkbox.Group>
        ) : (
          <Radio.Group
            onChange={e => handleSelect(question?.id, e.target.value, false)}
            value={question?.selected?.[0]}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {question?.options?.map(opt => (
              <Radio key={opt?.code} value={opt?.index}>
                {`${opt?.code}) ${opt?.label}`}
              </Radio>
            ))}
          </Radio.Group>
        )}
      </div>
    </Flex>
  );
};

export default ExamQuestion;
