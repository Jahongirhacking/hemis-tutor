import {
  ClapEmoji,
  CrownEmoji,
  NiceGuySmileEmoji,
  PartyConfettiEmoji,
  PartyEmoji,
  ThumbsUpEmoji,
  ThunderEmoji,
  WinkEmoji,
} from '@/assets/emojis';
import AnimatedMessage from '@/components/TypingAnimation/AnimatedMessage';
import { RootState } from '@/store/store';
import { Flex, Typography } from 'antd';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const GrantMessage = () => {
  const profile = useSelector((store: RootState) => store.authSlice?.profile);

  const emojis = useMemo(
    () => [
      ThumbsUpEmoji,
      CrownEmoji,
      PartyConfettiEmoji,
      PartyEmoji,
      ClapEmoji,
      ThunderEmoji,
      WinkEmoji,
      NiceGuySmileEmoji,
    ],
    []
  );
  return (
    <Flex
      vertical
      gap={10}
      style={{ alignItems: 'center', textAlign: 'center' }}
    >
      <AnimatedMessage>
        <span>
          <img
            className="emoji-img"
            src={emojis[Math.floor(Math.random() * emojis.length)]}
          />
        </span>
      </AnimatedMessage>
      <AnimatedMessage>
        <Typography.Title level={4} style={{ margin: 0, color: '#009500' }}>
          <span>{profile?.data?.paymentForm?.name}</span>
        </Typography.Title>
      </AnimatedMessage>
      <AnimatedMessage>
        <Typography.Paragraph>
          <span>
            {`${profile?.data?.full_name}, ${t('dashboard.contract.grant_message')}`}
          </span>
        </Typography.Paragraph>
      </AnimatedMessage>
    </Flex>
  );
};

export default GrantMessage;
