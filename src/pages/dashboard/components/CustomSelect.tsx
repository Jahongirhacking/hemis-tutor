import { convertIfCyrillic, keepOnlyLatinLettersAndWhitespace } from '@/utils/stringFunc';
import { Select, SelectProps } from 'antd';

const CustomSelect = (props: SelectProps) => {
    return (
        <Select
            showSearch
            filterOption={(inputValue, option: { label: string, value: any }) => {
                const translatedInputValue = keepOnlyLatinLettersAndWhitespace(
                    convertIfCyrillic(inputValue)
                );
                const translatedOptionLabel = keepOnlyLatinLettersAndWhitespace(
                    convertIfCyrillic(option?.label)
                );
                const arr = translatedInputValue.split(' ');
                return arr.reduce(
                    (acc, curr) =>
                        acc &&
                        translatedOptionLabel
                            .toLowerCase()
                            .includes(curr.toLowerCase()),
                    true
                );
            }}
            optionFilterProp="label"
            {...props}
        />
    )
}

export default CustomSelect