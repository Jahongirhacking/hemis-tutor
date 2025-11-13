import AnimatedMessage from '@/components/TypingAnimation/AnimatedMessage';
import { useGetCourseRecommendationMutation } from '@/services/chat';
import { RootState } from '@/store/store';
import { ChatTopic, SearchParams } from '@/utils/config';
import { getPureJSON } from '@/utils/objectFunc';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import { BadgeCheck } from 'lucide-react';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useGetToken from '../hooks/useGetToken';
import { getTranslationTerm } from './constants';
import { IAnalyzeResultProps } from './interface';

interface ResultProps {
  course_name: string;
  course_description: string;
  link: string;
}

const CourseResult: FunctionComponent<IAnalyzeResultProps> = props => {
  const [searchParams] = useSearchParams();
  const isVisible =
    searchParams.get(SearchParams.Modal) === ChatTopic.CourseRecommendation;
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  const [
    getCourseRecommendation,
    { isLoading: isCourseRecommendationLoading, data },
  ] = useGetCourseRecommendationMutation();
  const { token, ready } = useGetToken();

  const { profile } = useSelector((store: RootState) => store?.authSlice);

  useEffect(() => {
    if (!isVisible || !profile || !ready) return;
    if (searchParams.has(SearchParams.Modal)) {
      const userInfo = `**Talaba ma'lumotlari:**\n${profile?.data?.full_name}, ${profile?.data?.university}, ${profile?.data?.faculty?.name}, ${profile?.data?.specialty?.name}, ${profile?.data?.level?.name}`;
      const summary = `${userInfo}`;
      getCourseRecommendation({
        question: `${summary}. ${getTranslationTerm(i18n?.language)}`,
        token,
      });
      setIsInitialized(true);
    }
  }, [isVisible, profile, token, ready]);

  const recommendationResult: ResultProps[] | null = useMemo(
    () => getPureJSON(data?.answer),
    [data?.answer]
  );

  if (!isVisible) return null;

  return (
    <Flex vertical>
      {isCourseRecommendationLoading || !isInitialized ? (
        props?.showResponseLoading()
      ) : recommendationResult &&
        recommendationResult?.length &&
        Array.isArray(recommendationResult) ? (
        <Flex vertical gap={18}>
          <Card
            className="analyze-result-content"
            title={
              <Flex gap={8}>
                <BadgeCheck />
                <Typography.Title level={5}>Tahlil natijasi</Typography.Title>
              </Flex>
            }
          >
            <AnimatedMessage>
              <Flex vertical gap={24}>
                <Typography.Text strong>
                  Siz uchun foydali boʻlishi mumkin bo‘lgan kurslar roʻyxatini
                  taqdim etaman. Ushbu kurslar sizga yangi bilimlar olish,
                  amaliy koʻnikmalarni rivojlantirish va kelajakdagi
                  faoliyatingizda qoʻl keladigan tajriba to‘plash imkonini
                  beradi:
                </Typography.Text>
                <Flex gap={18} wrap>
                  {recommendationResult?.map(r => (
                    <Card className="course-card" key={r?.link} hoverable>
                      <Flex vertical gap={14} justify="space-between">
                        <Flex vertical gap={8}>
                          <Typography.Title level={4} style={{ margin: 0 }}>
                            {r?.course_name}
                          </Typography.Title>
                          <Typography.Text>
                            {r?.course_description}
                          </Typography.Text>
                        </Flex>
                        <Button
                          href={r?.link}
                          target="_blank"
                          type="primary"
                          icon={<EyeOutlined />}
                        >
                          Ko'rish
                        </Button>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              </Flex>
            </AnimatedMessage>
          </Card>
        </Flex>
      ) : (
        props?.showNotFound()
      )}
    </Flex>
  );
};

export default CourseResult;
