import ScrollableList from '@/components/DashedList/ScrollableList';
import {
  ICurriculumSubject,
  ISubjects,
  MarkingSystemCodeEnum,
} from '@/services/dashboard/type';
import { setDrawer } from '@/store/slices/drawerSlice';
import { getExamMark } from '@/utils/markFunc';
import { localStorageNames, setLocalStorage } from '@/utils/storageFunc';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Collapse,
  Divider,
  Empty,
  Flex,
  Image,
  Select,
  Skeleton,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Calculator } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import './GpaCalculator.scss';
import GradeSlider from './components/GradeSlider';
import useCalculate from './hooks/useCalculate';

const MAX_GRADE = 5;

const GpaCalculator = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    isFetching,
    isSubjectsFetching,
    currentMarkingSystem,
    setCurrentMarkingSystem,
    markingSystems,
    subjectListData,
    grades,
    setGrades,
    maxBorder,
    semesters,
    activeEduYear,
    eduYears,
    setActiveEduYear,
    calculatedGPA,
    visibleSubjects,
    gradeTypeData,
    convertGrade,
  } = useCalculate();

  useEffect(() => {
    dispatch(
      setDrawer({
        title: 'GPA hisoblagich',
      })
    );
  }, []);

  return (
    <Flex vertical gap={24} className="gpa-calculator">
      {isFetching ? (
        <Skeleton />
      ) : (
        <>
          <Flex vertical gap={8}>
            <Typography.Text className="label">
              Baholash tizimini tanlang:
            </Typography.Text>
            <Select
              value={currentMarkingSystem}
              options={markingSystems?.map(s => ({
                label: s?.name,
                value: s?.code,
              }))}
              placeholder={'Baholash tizimi'}
              onChange={value => {
                setLocalStorage(localStorageNames.markingSystem, value);
                setCurrentMarkingSystem(value);
              }}
            />
          </Flex>

          <Flex vertical gap={12}>
            <Flex gap={6} justify="space-between" align="center">
              <Typography.Text className="label">
                Kutilayotgan baholarni kiriting:
              </Typography.Text>
              <Select
                value={activeEduYear}
                options={(eduYears?.length ? eduYears : [])
                  ?.sort(
                    (a, b) =>
                      Number.parseInt(b?.code) - Number.parseInt(a?.code)
                  )
                  ?.map(y => ({
                    label: y?.name,
                    value: y?.code,
                  }))}
                onChange={value => setActiveEduYear(value)}
              />
            </Flex>
            {isSubjectsFetching ? (
              <Skeleton active />
            ) : visibleSubjects?.length ? (
              <ScrollableList gap={12} className="subject-list">
                {visibleSubjects
                  ?.filter(s => !!s?.credit)
                  ?.map((s, index) => {
                    const disabled = !!subjectListData?.find(
                      list =>
                        list?.curriculumSubject?.subject?.id === s?.subject?.id
                    )?.overallScore?.grade;
                    return (
                      <Card
                        className="grade-item-card"
                        key={`${s?.subject?.id}-${index}`}
                      >
                        <Flex vertical gap={6}>
                          <Flex gap={6} justify="space-between" align="center">
                            <Flex vertical>
                              <Typography.Text strong className="subject-name">
                                {s?.subject?.name}
                              </Typography.Text>
                              <Typography.Text
                                style={{ fontSize: 12, color: '#8a8a8aff' }}
                              >{`${semesters?.data?.find(semester => semester?.code === String(s?._semester))?.name} (${s?.subjectType?.name})`}</Typography.Text>
                            </Flex>
                            <Flex gap={5} align="center">
                              {disabled && (
                                <Tooltip
                                  title={`${s?.subject?.name} fanidan sizga umumiy ${subjectListData?.find(l => l?.curriculumSubject?.subject?.id === s?.subject?.id)?.overallScore?.grade} ball qo'yilgan`}
                                >
                                  <Button
                                    icon={
                                      <InfoCircleOutlined
                                        style={{ fontSize: 14 }}
                                      />
                                    }
                                    type="text"
                                    style={{
                                      padding: 5,
                                      width: 'auto',
                                      height: 'auto',
                                    }}
                                  />
                                </Tooltip>
                              )}
                              <Tag
                                color="magenta"
                                icon={<img src="/icons/flash.svg" width={12} />}
                                style={{
                                  margin: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 3,
                                }}
                              >
                                {' '}
                                {`${s?.credit} ${t('const.credit_plural')}`}
                              </Tag>
                            </Flex>
                          </Flex>
                          <GradeSlider
                            grade={grades[s?.subject?.id] || 0}
                            setGrade={grade => {
                              setGrades({
                                type: 'UPDATE_GRADES',
                                payload: { [s?.subject?.id]: grade },
                              });
                            }}
                            step={
                              currentMarkingSystem ===
                              MarkingSystemCodeEnum.Grade
                                ? 0.5
                                : 1
                            }
                            disabled={false}
                            max={maxBorder}
                          />
                        </Flex>
                      </Card>
                    );
                  })}
              </ScrollableList>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"Fan ma'lumotlari topilmadi"}
              />
            )}
          </Flex>

          <Flex vertical gap={12}>
            <Divider style={{ margin: 0 }}>
              <Flex align="center" gap={5}>
                <Calculator size={18} />
                <Typography.Text strong>GPA natijasi</Typography.Text>
              </Flex>
            </Divider>

            <Flex vertical className="gpa-result">
              {getExamMark({
                grade: calculatedGPA,
                max_ball: MAX_GRADE,
                percent: (calculatedGPA / MAX_GRADE) * 100,
              })}
            </Flex>

            <Collapse
              items={[
                (() => {
                  const temp = markingSystems?.find(
                    s => s?.code === currentMarkingSystem
                  );
                  return {
                    key: 'marking',
                    label: temp?.name,
                    children: (
                      <Flex vertical gap={12}>
                        <Flex
                          wrap
                          style={{ columnGap: 24, rowGap: 12 }}
                          justify="space-around"
                        >
                          <Typography.Text
                            strong
                          >{`Eng past GPA: ${temp?.gpa_limit}`}</Typography.Text>
                          <Typography.Text
                            strong
                          >{`Eng past Ball: ${temp?.minimum_limit}`}</Typography.Text>
                        </Flex>
                        <Flex
                          wrap
                          style={{ columnGap: 24, rowGap: 12 }}
                          justify="space-around"
                        >
                          {[
                            ...gradeTypeData?.data?.filter(
                              t =>
                                t?.markingSystem?.code === currentMarkingSystem
                            ),
                          ]
                            ?.sort(
                              (a, b) =>
                                Number.parseInt(a?.code) -
                                Number.parseInt(b?.code)
                            )
                            ?.map(t => (
                              <Typography.Text key={t?.code}>
                                {`[${t?.min_border} : ${t?.max_border}] → `}{' '}
                                {getExamMark(
                                  {
                                    grade: Number.parseFloat(t?.name),
                                    max_ball: 5,
                                    percent:
                                      (Number.parseFloat(t?.name) / 5) * 100,
                                  },
                                  'Ball',
                                  false
                                )}
                              </Typography.Text>
                            ))}
                        </Flex>
                      </Flex>
                    ),
                  };
                })(),
                {
                  key: 'gpa-formula',
                  label: 'Hisoblash formulasi',
                  children: (
                    <Flex vertical gap={12}>
                      <Image src={'/images/gpa.jpg'} />
                    </Flex>
                  ),
                },
                {
                  key: 'gpa-analyze',
                  label: 'GPA tahlili',
                  children: (() => {
                    const creditSum = visibleSubjects?.reduce(
                      (acc, curr) => acc + (curr?.credit || 0),
                      0
                    );
                    const multiplySum = visibleSubjects?.reduce(
                      (acc, curr) =>
                        acc +
                        curr?.credit *
                          convertGrade(grades[curr?.subject?.id] || 0),
                      0
                    );
                    return (
                      <Flex vertical gap={12}>
                        <Typography.Text
                          strong
                        >{`${eduYears?.find(y => y?.code === activeEduYear)?.name} o'quv yili`}</Typography.Text>
                        <Table
                          columns={[
                            { key: 'index', title: '№', dataIndex: 'index' },
                            {
                              key: 'subjectName',
                              title: 'Fan nomi',
                              dataIndex: 'subjectName',
                            },
                            {
                              key: 'credit',
                              title: 'Kredit (K)',
                              dataIndex: 'credit',
                              fixed: 'right',
                              render: value => <strong>{value}</strong>,
                              className: 'credit-column',
                            },
                            {
                              key: 'grade',
                              title: 'Baho (U)',
                              dataIndex: 'grade',
                              fixed: 'right',
                              className: 'grade-column',
                            },
                            {
                              key: 'multiply',
                              title: 'K*U',
                              dataIndex: 'multiply',
                              fixed: 'right',
                              render: value => <strong>{value}</strong>,
                              className: 'multiply-column',
                            },
                          ]}
                          dataSource={[
                            ...visibleSubjects?.map(
                              (
                                s: ICurriculumSubject | ISubjects,
                                index: number
                              ) => ({
                                index: index + 1,
                                subjectName: s?.subject?.name,
                                credit: s?.credit,
                                grade: `${grades[s?.subject?.id] || 0} → (${convertGrade(grades[s?.subject?.id] || 0)})`,
                                multiply: `${s?.credit * convertGrade(grades[s?.subject?.id] || 0)}`,
                              })
                            ),
                          ]}
                          rowKey={'index'}
                          pagination={false}
                          summary={() => (
                            <Table.Summary fixed>
                              <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>
                                  -
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                  <strong>Jami:</strong>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                  <strong>{creditSum}</strong>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                  -
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4}>
                                  <strong>{multiplySum}</strong>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                            </Table.Summary>
                          )}
                          scroll={{ x: 'max-content', y: 300 }}
                        />
                        <Typography.Text strong>
                          {`GPA = ∑(K*U) / ∑(K) = ${multiplySum} / ${creditSum} = `}{' '}
                          {getExamMark(
                            {
                              grade: calculatedGPA,
                              max_ball: 5,
                              percent: (calculatedGPA / 5) * 100,
                            },
                            'GPA',
                            false
                          )}
                        </Typography.Text>
                      </Flex>
                    );
                  })(),
                },
              ]}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default GpaCalculator;
