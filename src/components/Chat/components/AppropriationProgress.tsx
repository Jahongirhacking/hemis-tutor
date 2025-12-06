import { toFirstCapitalLetter } from '@/utils/stringFunc';
import { Button, Flex, Image, Progress, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { defaultIcons } from '../AnalyzeResult/constants';
import { ISubjectScore } from './types';

const AppropriationProgress = ({
  subjectScores = [],
}: {
  subjectScores: ISubjectScore[];
}) => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={6} className="progress-card appropriation-progress">
      {subjectScores?.map((subject, index) => {
        const defaultIcon = defaultIcons?.[index % defaultIcons?.length];
        return (
          <Flex
            gap={8}
            justify="space-between"
            align="center"
            wrap
            className="progress-container"
            key={subject?.subject}
          >
            <Flex align="center" gap={8}>
              <Button
                shape="circle"
                style={{ border: '1px solid #acacac4b', cursor: 'auto' }}
              >
                <Image src={defaultIcon?.icon} width={14} preview={false} />
              </Button>
              <Typography.Text style={{ color: defaultIcon?.primaryColor }}>
                {toFirstCapitalLetter(subject?.subject)}
              </Typography.Text>
            </Flex>
            <Progress
              percent={Math.round((subject.score / subject?.max) * 100)}
              percentPosition={{ align: 'end', type: 'inner' }}
              size={[300, 22]}
              strokeColor={
                defaultIcon?.primaryColor || defaultIcons?.[0]?.primaryColor
              }
              format={percent => `${percent} ${t('const.score')}`}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default AppropriationProgress;
