import { useGetGroupSemestersQuery } from "@/services/student";
import { IGroup } from "@/services/student/type";
import { RootState } from "@/store/store";
import { Flex, Form, FormProps, Input, Select } from "antd";
import { Children, cloneElement, ReactElement } from "react";
import { useSelector } from "react-redux";

const CustomFilter = ({ children, ...props }: FormProps & { children: ReactElement | ReactElement[] }) => {
    return (
        <Form layout="vertical" {...props}>
            <Flex
                gap={8}
                align="center"
                wrap
            >
                {Children.map(children, (child) => cloneElement(child, { ...child.props }))}
            </Flex>
        </Form>
    )
};

export enum FilterKey {
    GroupId = 'group_id',
    Semester = 'semester',
    Pinfl = 'pinfl',
    Search = 'search',
    SubjectId = 'subject_id'
}

const ByGroup = ({ key }: { key?: string }) => {
    const profile = useSelector((store: RootState) => store?.authSlice?.profile)
    return (
        <Form.Item name={key || FilterKey.GroupId} style={{ margin: 0 }}>
            <Select
                style={{ width: 180 }}
                placeholder={'Guruh tanlang'}
                options={profile?.groups?.map(g => ({
                    label: g?.name,
                    value: g?.id,
                }))}
                allowClear
            />
        </Form.Item>
    )
}

const BySemester = ({ group_id, key }: { group_id?: IGroup['id'], key?: string }) => {
    const { data: semestersData, isFetching } = useGetGroupSemestersQuery({ group_id }, { skip: !group_id });
    return (
        <Form.Item name={key || FilterKey.Semester} style={{ margin: 0 }}>
            <Select
                loading={isFetching}
                style={{ width: 180 }}
                placeholder={'Semestr tanlang'}
                options={semestersData?.result?.semesters?.map(s => ({
                    label: s?.name,
                    value: s?.code,
                }))}
                allowClear
            />
        </Form.Item>
    )
}

const ByPinfl = ({ key }: { key?: string }) => {
    return (
        <Form.Item name={key || FilterKey.Pinfl} style={{ margin: 0 }}>
            <Input
                placeholder="JShShIR kiriting"
                allowClear
                width={200}
            />
        </Form.Item>
    )
}

const BySearch = ({ key }: { key?: string }) => {
    return (
        <Form.Item name={key || FilterKey.Search} style={{ margin: 0 }}>
            <Input.Search
                enterButton
                placeholder="Qidirish"
                allowClear
                width={200}
            />
        </Form.Item>
    )
}

CustomFilter.ByGroup = ByGroup;
CustomFilter.BySemester = BySemester;
CustomFilter.ByPinfl = ByPinfl;
CustomFilter.BySearch = BySearch;
export default CustomFilter