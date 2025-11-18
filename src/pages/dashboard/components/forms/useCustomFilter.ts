import { Form } from 'antd';

const useCustomFilter = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  return {
    form,
    values,
  };
};

export default useCustomFilter;
