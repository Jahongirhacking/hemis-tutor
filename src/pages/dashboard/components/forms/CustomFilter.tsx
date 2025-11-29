import { useGetGroupSemestersQuery } from '@/services/student';
import { IGroup } from '@/services/student/type';
import { RootState } from '@/store/store';
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
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';

export const CustomFilterContext = createContext<{ form: FormInstance }>(null);

const CustomFilter = ({
  children,
  ...props
}: FormProps & { children: ReactElement | ReactElement[] }) => {
  return (
    <Form layout="vertical" className="w-full" {...props}>
      <CustomFilterContext.Provider value={{ form: props?.form }}>
        <Flex gap={8} align="center" wrap>
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
}

const ByGroup = ({
  field,
  ...props
}: { field?: string } & SelectProps<{ label: string; value: number }>) => {
  const profile = useSelector((store: RootState) => store.authSlice?.profile);
  return (
    <Form.Item
      className="min-w-full max-w-[350px] sm:min-w-[180px] flex-1"
      name={field || FilterKey.GroupId}
      style={{ margin: 0 }}
    >
      <Select<{ label: string; value: number }>
        className="w-full"
        placeholder="Guruh tanlang"
        options={
          profile?.groups?.map(g => ({
            label: g.name,
            value: g.id,
          })) ?? []
        }
        allowClear
        {...props}
      />
    </Form.Item>
  );
};

const BySemester = ({
  group_id,
  field,
}: {
  group_id?: IGroup['id'];
  field?: string;
}) => {
  const { data: semestersData, isFetching } = useGetGroupSemestersQuery(
    { group_id },
    { skip: !group_id }
  );
  return (
    <Form.Item
      className="min-w-full max-w-[350px] sm:min-w-[180px] flex-1"
      name={field || FilterKey.Semester}
      style={{ margin: 0 }}
    >
      <Select
        loading={isFetching}
        className="w-full"
        placeholder={'Semestr tanlang'}
        options={semestersData?.result?.semesters?.map(s => ({
          label: s?.name,
          value: s?.code,
        }))}
        allowClear
      />
    </Form.Item>
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
        <Select allowClear disabled={disabled && props?.loading} {...props} />
      )}
    </Form.Item>
  );
};

CustomFilter.ByGroup = ByGroup;
CustomFilter.BySemester = BySemester;
CustomFilter.ByPinfl = ByPinfl;
CustomFilter.BySearch = BySearch;
CustomFilter.BySelect = BySelect;
export default CustomFilter;
