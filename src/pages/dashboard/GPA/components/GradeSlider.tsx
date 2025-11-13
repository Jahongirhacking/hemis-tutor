import { Flex, InputNumber, Slider } from 'antd';
import { SliderBaseProps } from 'antd/es/slider';

const GradeSlider = ({
  grade = 0,
  setGrade,
  ...props
}: { grade?: number; setGrade: (value: number) => void } & SliderBaseProps) => {
  return (
    <Flex wrap gap={12}>
      <Slider
        onChange={value => setGrade(value)}
        value={grade}
        style={{ flex: 1 }}
        {...props}
      />
      <InputNumber
        value={grade}
        onChange={value => setGrade(value)}
        max={props?.max}
        min={props?.min || 0}
        disabled={props?.disabled}
      />
    </Flex>
  );
};

export default GradeSlider;
