import { Flex } from 'antd';
import { FunctionComponent } from 'react';
import { IAnalyzeResultProps } from './interface';

const GpaResult: FunctionComponent<IAnalyzeResultProps> = props => {
  // const [searchParams] = useSearchParams();
  console.log(props);
  // const isVisible =
  // searchParams.get(SearchParams.Modal) === ChatTopic.GpaSummary;
  // const profile = useSelector((store: RootState) => store.authSlice.profile);
  // const { token, ready } = useGetToken();
  // const { i18n } = useTranslation();
  // const [isInitialized, setIsInitialized] = useState(false);

  // const { data: gpaData, isFetching: isGpaFetching } = useGetGpaScoreQuery(
  //   undefined,
  //   { skip: !isVisible || !profile }
  // );
  // const { isLoading: isSubjectsLoading, subjectsList } =
  //   useGetSubjectsList(!isVisible);
  // const [generateGpaSummary, { isLoading: isGpaSummaryLoading, data }] =
  //   useGenerateGpaSummaryMutation();

  // useEffect(() => {
  //   if (!isVisible) return;
  //   if (data && !isGpaSummaryLoading) {
  //     props?.setResult(data?.answer);
  //   }
  // }, [data]);

  // const subjectGrades = useMemo(
  //   () => subjectsList?.filter((s: any) => s?.overallScore?.grade),
  //   [subjectsList]
  // );

  // useEffect(() => {
  //   if (!isVisible || !profile || !subjectGrades || !gpaData || !ready) return;
  //   if (searchParams.has(SearchParams.Modal)) {
  //     // prompt
  //     // const userInfo = `**Talaba ma'lumotlari:**\n${profile?.data?.full_name}, ${profile?.data?.university}, ${profile?.data?.faculty?.name}, ${profile?.data?.specialty?.name}, ${profile?.data?.level?.name}`;
  //     const userInfo = '';
  //     const subjectInfo = `**Fanlardan o'zlashtirish natijalari:**\n*  ${subjectGrades
  //       ?.filter((s: any) => s?.overallScore)
  //       ?.map(
  //         s =>
  //           `${s?.curriculumSubject?.subject?.name}: ${s?.overallScore?.label}`
  //       )
  //       ?.join('\n*  ')}`;
  //     const gpaInfo = `**GPA natijalari:**\n*  ${gpaData && gpaData?.data?.map(g => `${g?.educationYear?.name}: ${g?.gpa}, qarzdorlik fanlar: ${g?.debt_subjects} / ${g?.subjects}, jami kredit: ${g?.credit_sum}`)?.join('\n*  ')}`;
  //     const summary = [userInfo, subjectInfo, gpaInfo].join('\n\n');
  //     generateGpaSummary({
  //       question: `${summary}. ${getTranslationTerm(i18n?.language)}`,
  //       token,
  //     });
  //     setIsInitialized(true);
  //   }
  // }, [isVisible, profile, subjectGrades, gpaData, ready, token]);

  // if (!isVisible) return null;

  return (
    <Flex vertical gap={12}>
      {/* {isGpaFetching || isSubjectsLoading ? (
        props?.showRequestLoading()
      ) : isGpaSummaryLoading || !isInitialized ? (
        props?.showResponseLoading()
      ) : data ? (
        <Flex vertical gap={18}>
          <Card
            className="analyze-result-content"
            title={<ResultTitle />}
            extra={props.openChat()}
          >
            {props?.showResult()}
          </Card>

          <Flex gap={12} wrap className="extra-analyzes">
            <Card
              title={
                <Flex gap={8}>
                  <NotepadText size={20} />
                  <Typography.Title level={5}>GPA tahlili</Typography.Title>
                </Flex>
              }
            >
              {gpaData?.data?.length ? (
                <GpaChart
                  gpaData={[...gpaData?.data]
                    ?.sort(
                      (a, b) =>
                        Number.parseInt(a?.educationYear?.code) -
                        Number.parseInt(b?.educationYear?.code)
                    )
                    ?.map(g => ({
                      gpa: Number.parseFloat(g?.gpa),
                      year: g?.educationYear?.name,
                    }))}
                />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"GPA ma'lumotlari topilmadi"}
                />
              )}
            </Card>

            <Card
              title={
                <Flex gap={8}>
                  <BookCheck size={20} />
                  <Typography.Title level={5}>
                    Fan baholari tahlili
                  </Typography.Title>
                </Flex>
              }
            >
              {subjectGrades?.length ? (
                <AppropriationProgress
                  subjectScores={subjectGrades?.map(s => ({
                    subject: s?.curriculumSubject?.subject?.name,
                    semester: s?._semester,
                    score: s?.overallScore?.grade,
                    max: s?.overallScore?.max_ball,
                  }))}
                />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={'Fan baholari topilmadi'}
                />
              )}
            </Card>
          </Flex>
        </Flex>
      ) : (
        props?.showNotFound()
      )} */}
    </Flex>
  );
};

export default GpaResult;
