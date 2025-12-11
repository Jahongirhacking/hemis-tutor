import { Tag, TagProps } from "antd";
import { useMemo } from "react";

const MAX_GRADE_1 = 5;
const MAX_GRADE_2 = 100;

const GradeTag = ({ grade, maxGrade, ...props }: { grade: number | string, maxGrade?: number | string } & TagProps) => {
    const tempMaxGrade = useMemo(() => Number(maxGrade) || (Number(grade) <= MAX_GRADE_1 ? MAX_GRADE_1 : MAX_GRADE_2), [maxGrade, grade]);
    const getColor = (grade: number, maxGrade: number) => {
        if (!grade || !maxGrade) return 'default';
        const percent = grade / maxGrade * 100;
        if (percent < 50) return 'red';
        if (percent < 60) return 'magenta';
        if (percent < 80) return 'orange';
        return 'green';
    }
    return (
        <Tag
            color={getColor(Number(grade), tempMaxGrade)}
            {...props}
        />
    )
}

export default GradeTag