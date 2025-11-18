import { Flex, Table, TableProps } from 'antd';
import CustomPagination from './CustomPagination';
import useCustomTable from './hooks/useCustomTable';

const CustomTable = ({ paginationTotal, ...props }: TableProps & { paginationTotal?: number }) => {
    const { emptyText } = useCustomTable({});
    return (
        <Flex
            vertical
            gap={24}
        >
            <Table
                rowKey={'id'}
                scroll={{ x: 800, y: 'max(calc(100dvh - 450px), 300px)' }}
                locale={{ emptyText }}
                {...props}
            />

            {
                props?.pagination === false && (
                    <CustomPagination total={paginationTotal} />
                )
            }
        </Flex>
    )
}

export default CustomTable