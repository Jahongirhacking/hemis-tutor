import { VolumeUpIconSVG } from '@/assets/icon';
import { AudioModeEnum } from '@/hooks/useTTS';
import { RootState } from '@/store/store';
import { LoadingOutlined, PauseOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import { Play } from 'lucide-react';
import { useSelector } from 'react-redux';

const VoiceBtn = ({
  mode,
  isLoading,
  ...props
}: ButtonProps & {
  mode: AudioModeEnum;
  isLoading: boolean;
  onClick: () => void;
}) => {
  const isAudioPlaying = useSelector(
    (store: RootState) => store.themeSlice.isAudioPlaying
  );

  return (
    <Button
      title={
        mode === AudioModeEnum.Playing
          ? "To'xtatish"
          : isAudioPlaying
            ? "Boshqa audio o'qilmoqda"
            : "O'qib berish"
      }
      icon={
        isLoading ? (
          <LoadingOutlined />
        ) : mode === AudioModeEnum.Playing ? (
          <PauseOutlined />
        ) : mode === AudioModeEnum.Paused ? (
          <Play size={15} />
        ) : (
          <VolumeUpIconSVG />
        )
      }
      disabled={
        isLoading ||
        ((mode === AudioModeEnum.Finished || mode === AudioModeEnum.Paused) &&
          isAudioPlaying)
      }
      type={mode === AudioModeEnum.Playing ? 'default' : 'primary'}
      aria-label="Ovoz orqali eshitish"
      className="voice-btn"
      {...props}
    />
  );
};

export default VoiceBtn;
