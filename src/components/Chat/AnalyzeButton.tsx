import { ChatTopic, SearchParams } from '@/utils/config';
import { Button, ButtonProps, Flex, FlexProps } from 'antd';
import { ReactElement } from 'react';
import useAnalyzeModal from './hooks/useAnalyzeModal';

const AnalyzeButton = ({
  chatTopic,
  ...props
}: ButtonProps & { chatTopic: ChatTopic }) => {
  const { handleAnalayzeGpa, searchParams } = useAnalyzeModal();

  return (
    <Button
      icon={<img src={'/icons/logo.svg'} alt="Tahlil qilish" width={16} />}
      onClick={() => handleAnalayzeGpa(chatTopic)}
      aria-label="Tahlil qilish"
      title="Tahlil qilish"
      {...props}
      className={`${props?.className ?? ''} analyze-btn ${searchParams.get(SearchParams.Modal) === chatTopic ? 'active' : 'inactive'}`}
    >
      {props?.children || ''}
    </Button>
  );
};

const ExpandedButton = ({
  chatTopic,
  ...props
}: FlexProps & { icon?: ReactElement | null; chatTopic: ChatTopic }) => {
  const { handleAnalayzeGpa, searchParams } = useAnalyzeModal();
  return (
    <Flex
      onClick={() => handleAnalayzeGpa(chatTopic)}
      aria-label="Tahlil qilish"
      title="Tahlil qilish"
      {...props}
      className={`${props?.className ?? ''} analyze-btn-expanded ${searchParams.get(SearchParams.Modal) === chatTopic ? 'active' : 'inactive'}`}
    >
      {props?.icon}
      {props?.children}
    </Flex>
  );
};

AnalyzeButton.Expanded = ExpandedButton;

export default AnalyzeButton;
