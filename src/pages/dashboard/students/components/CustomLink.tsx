import { IGroup, IStudent } from '@/services/student/type';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { Typography } from 'antd';
import { LinkProps } from 'antd/es/typography/Link';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { STUDENT_INFO_MODAL } from '../..';

const CustomLink = (props: LinkProps) => {
  return <Typography.Link {...props} />;
};

const StudentLink = ({ student }: { student: Partial<IStudent> }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStudentClick = useCallback(() => {
    if (!student?.id) return;
    const params = new URLSearchParams(searchParams);
    params.set(STUDENT_INFO_MODAL, String(student?.id));
    setSearchParams(params);
  }, [searchParams, setSearchParams, student]);

  return (
    <Typography.Link disabled={!student?.id} onClick={handleStudentClick}>
      {student?.full_name}
    </Typography.Link>
  );
};

const GroupLink = ({ group }: { group: Partial<IGroup> }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStudentClick = useCallback(() => {
    if (!group?.id) return;
    const params = new URLSearchParams(searchParams);
    params.set(SearchParams.Drawer, DrawerChildTypes.GroupInfo);
    params.set(SearchParams.DrawerProps, String(group?.id));
    setSearchParams(params);
  }, [searchParams, setSearchParams, group]);

  return (
    <Typography.Link disabled={!group?.id} onClick={handleStudentClick}>
      {group?.name}
    </Typography.Link>
  );
};

CustomLink.Student = StudentLink;
CustomLink.Group = GroupLink;
export default CustomLink;
