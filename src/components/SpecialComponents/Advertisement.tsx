import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Flex, FlexProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import './Advertisement.scss';

const TIMEOUT = 6 * 1000;

const Advertisement = ({
  children,
  memoizedKey,
  ...props
}: FlexProps & { memoizedKey?: string }) => {
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    if (memoizedKey) {
      const advertisementMemo: string[] =
        getLocalStorage(localStorageNames.advertisementMemo) || [];
      setIsClosed(advertisementMemo?.includes(memoizedKey));
    }
  }, []);

  const handleClose = useCallback(() => {
    if (memoizedKey) {
      const advertisementMemo: string[] =
        getLocalStorage(localStorageNames.advertisementMemo) || [];
      setLocalStorage(
        localStorageNames.advertisementMemo,
        Array.from(new Set([...advertisementMemo, memoizedKey]))
      );
    }
    setIsClosed(true);
  }, [memoizedKey]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsClosed(true);
    }, TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isClosed) return null;

  return (
    <Flex {...props} className={`advertisement ${props?.className ?? ''}`}>
      <div onClick={handleClose}>{children}</div>
      <Button
        icon={<CloseOutlined />}
        className="advertisement-close-btn"
        shape="circle"
        onClick={handleClose}
      />
    </Flex>
  );
};

export default Advertisement;
