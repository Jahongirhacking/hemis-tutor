import { SoonCard } from '@/components/Common/SoonCard';

const AcademicInfo = ({ props: studentId }: { props: string }) => {
  console.log(studentId);
  // const { data: studentGrade } = useGetStudentGradeQuery({ id: Number(studentId) });

  return <SoonCard />;
};

export default AcademicInfo;
