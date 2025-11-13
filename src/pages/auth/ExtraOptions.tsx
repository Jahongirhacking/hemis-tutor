import { paths } from '@/router/paths';
import { onClose } from '@/store/slices/drawerSlice';
import { RightOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useOptions from './useOptions';

const ExtraOptions = ({ currentLink = paths.base }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const extraOptions = useOptions();

  return (
    <Flex vertical gap={16} className="extra-options">
      {extraOptions
        .filter(option => option.link !== currentLink)
        .map(option => (
          <Flex
            key={option.link}
            className="option-list-item"
            gap={12}
            justify="space-between"
            align="center"
            onClick={() => {
              dispatch(onClose());
              navigate(option.link);
            }}
          >
            <Flex gap={12} align="center">
              {option.icon}
              <Typography.Text>{option.label}</Typography.Text>
            </Flex>
            <RightOutlined />
          </Flex>
        ))}
    </Flex>
  );
};

export default ExtraOptions;
