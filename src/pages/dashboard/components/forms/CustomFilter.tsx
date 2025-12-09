import { useGetGroupsQuery } from '@/services/profile';
import {
  useGetEducationYearsQuery,
  useGetGroupSemestersQuery,
  useGetSpecalitiesQuery,
  useGetStudentStatusesQuery,
} from '@/services/student';
import { IEducationYear, IGroup } from '@/services/student/type';
import {
  Flex,
  Form,
  FormInstance,
  FormProps,
  Input,
  Select,
  SelectProps,
} from 'antd';
import { SearchProps } from 'antd/es/input';
import {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

export const CustomFilterContext = createContext<{ form: FormInstance }>(null);

const CustomFilter = ({
  children,
  filterClassName,
  ...props
}: FormProps & {
  children: ReactElement | ReactElement[];
  filterClassName?: string;
}) => {
  return (
    <Form layout="vertical" className="w-full upper-element" {...props}>
      <CustomFilterContext.Provider value={{ form: props?.form }}>
        <Flex
          gap={8}
          align="center"
          wrap
          className={`w-full ${filterClassName || ''}`}
        >
          {Children.map(children, child =>
            cloneElement(child, { ...child.props })
          )}
        </Flex>
      </CustomFilterContext.Provider>
    </Form>
  );
};

export enum FilterKey {
  GroupId = 'group_id',
  Semester = 'semester',
  Pinfl = 'pinfl',
  Search = 'search',
  SubjectId = 'subject_id',
  EducationYear = 'education_year',
  Specialty = 'specialty',
  StudentStatus = 'student_status',
}

const BySpecialSelect = ({
  field,
  education_year,
  disabled,
  formItemClassName,
  ...props
}: {
  field: FilterKey | string;
  education_year?: IEducationYear['code'];
  formItemClassName?: string;
} & SelectProps<{
  label: string;
  value: number;
}>) => {
  return (
    <Form.Item
      className={`min-w-full max-w-[350px] sm:min-w-[180px] flex-1 ${formItemClassName}`}
      name={field}
      style={{ margin: 0 }}
    >
      <Select<{ label: string; value: number }>
        className="w-full"
        disabled={disabled || props?.loading}
        allowClear
        {...props}
      />
    </Form.Item>
  );
};

const ByGroup = ({
  field,
  education_year,
  disabled,
  formItemClassName,
  ...props
}: {
  field?: string;
  education_year?: IEducationYear['code'];
  formItemClassName?: string;
} & SelectProps<{
  label: string;
  value: number;
}>) => {
  const { data: groupData, isFetching } = useGetGroupsQuery({ education_year });
  const form = useContext(CustomFilterContext)?.form;
  return (
    <BySpecialSelect
      field={field || FilterKey.GroupId}
      placeholder="Guruh tanlang"
      options={
        groupData?.result?.groups?.map(g => ({
          label: g.name,
          value: g.id,
        })) ?? []
      }
      loading={isFetching}
      onChange={() => {
        form?.setFieldValue?.(FilterKey.Semester, undefined);
      }}
      {...props}
    />
  );
};

const BySemester = ({
  group_id,
  education_year,
  field,
  disabled,
  formItemClassName,
  ...props
}: {
  group_id?: IGroup['id'];
  education_year?: IEducationYear['code'];
  field?: string;
  formItemClassName?: string;
} & SelectProps) => {
  const { data: semestersData, isFetching } = useGetGroupSemestersQuery(
    { group_id, education_year },
    { skip: !group_id }
  );
  return (
    <BySpecialSelect
      field={field || FilterKey.Semester}
      loading={isFetching}
      placeholder={'Semestr tanlang'}
      options={semestersData?.result?.semesters?.map(s => ({
        label: s?.name,
        value: s?.code,
      }))}
      {...props}
    />
  );
};

const BySpecialty = ({
  field,
  disabled,
  formItemClassName,
  ...props
}: {
  field?: string;
  formItemClassName?: string;
} & SelectProps) => {
  const { data: specialtiesData, isFetching } = useGetSpecalitiesQuery();
  return (
    <BySpecialSelect
      field={field || FilterKey.Specialty}
      loading={isFetching}
      placeholder={'Mutaxassislik'}
      options={specialtiesData?.result?.items?.map(s => ({
        label: s?.name,
        value: s?.id,
      }))}
      {...props}
    />
  );
};

const ByStudentStatus = ({
  field,
  disabled,
  formItemClassName,
  ...props
}: {
  field?: string;
  formItemClassName?: string;
} & SelectProps) => {
  const { data: studentStatusData, isFetching } = useGetStudentStatusesQuery();
  return (
    <BySpecialSelect
      field={field || FilterKey.StudentStatus}
      loading={isFetching}
      placeholder={'Talaba holati'}
      options={studentStatusData?.result?.items?.map(s => ({
        label: s?.name,
        value: s?.code,
      }))}
      {...props}
    />
  );
};

const ByPinfl = ({ field }: { field?: string }) => {
  const form = useContext(CustomFilterContext)?.form;
  const filterKey = useMemo(() => field || FilterKey.Pinfl, [field]);
  const handleSearch = useCallback(
    (val: string) => {
      form?.setFieldValue(filterKey, val || undefined);
    },
    [filterKey, form]
  );

  return (
    <>
      <Form.Item name={filterKey} style={{ display: 'none' }}>
        <Input />
      </Form.Item>

      <Form.Item
        className="min-w-full max-w-[350px] sm:min-w-[180px] flex-1"
        style={{ margin: 0 }}
      >
        <Input.Search
          placeholder="JShShIR kiriting"
          allowClear
          onSearch={handleSearch}
        />
      </Form.Item>
    </>
  );
};

const BySearch = ({ field, ...props }: { field?: string } & SearchProps) => {
  const form = useContext(CustomFilterContext)?.form;
  const filterKey = useMemo(() => field || FilterKey.Search, [field]);
  const handleSearch = useCallback(
    (val: string) => {
      form?.setFieldValue(filterKey, val || undefined);
    },
    [filterKey, form]
  );

  return (
    <>
      <Form.Item name={filterKey} style={{ display: 'none' }}>
        <Input />
      </Form.Item>

      <Form.Item
        className="min-w-full max-w-[400px] sm:min-w-[300px] flex-1"
        style={{ margin: 0 }}
      >
        <Input.Search
          enterButton
          placeholder="Qidirish"
          allowClear
          onSearch={handleSearch}
          {...props}
        />
      </Form.Item>
    </>
  );
};

const ByEducationYear = ({
  field,
  disabled,
  ...props
}: { field?: string } & SelectProps) => {
  const form = useContext(CustomFilterContext)?.form;
  const { data: educationYearsData, isFetching } = useGetEducationYearsQuery();

  useEffect(() => {
    if (educationYearsData?.result?.items?.length) {
      form.setFieldValue(
        FilterKey.EducationYear,
        educationYearsData?.result?.items?.find(i => i?.current_status === 1)
          ?.code
      );
    }
  }, [educationYearsData]);

  return (
    <BySpecialSelect
      field={field || FilterKey.EducationYear}
      loading={isFetching}
      placeholder={"O'quv yili"}
      options={educationYearsData?.result?.items?.map(s => ({
        label: s?.name,
        value: s?.code,
      }))}
      onChange={() => {
        form.setFieldsValue({
          [FilterKey.GroupId]: undefined,
          [FilterKey.Semester]: undefined,
        });
      }}
      {...props}
    />
  );
};

const BySelect = ({
  render,
  field,
  disabled,
  ...props
}: SelectProps & { field: string } & { render?: ReactElement }) => {
  return (
    <Form.Item
      className="min-w-full max-w-[350px] sm:min-w-[180px] flex-1 m-0"
      name={field}
    >
      {render || (
        <Select allowClear disabled={disabled || props?.loading} {...props} />
      )}
    </Form.Item>
  );
};

CustomFilter.ByGroup = ByGroup;
CustomFilter.BySemester = BySemester;
CustomFilter.ByPinfl = ByPinfl;
CustomFilter.BySearch = BySearch;
CustomFilter.BySelect = BySelect;
CustomFilter.ByEducationYear = ByEducationYear;
CustomFilter.BySpecialty = BySpecialty;
CustomFilter.ByStudentStatus = ByStudentStatus;
export default CustomFilter;
