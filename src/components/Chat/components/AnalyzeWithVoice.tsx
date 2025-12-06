import { AudioModeEnum } from '@/hooks/useTTS';
import { Flex, FlexProps } from 'antd';
import VoiceAnimation from './VoiceAnimation';

const AnalyzeWithVoice = ({
  mode,
  children,
  stopAudio,
  ...props
}: FlexProps & { mode: AudioModeEnum; stopAudio: () => void }) => {
  return (
    <Flex vertical {...props}>
      {children}
      {mode === AudioModeEnum.Playing && (
        <div className="voice-container">
          <VoiceAnimation onCancel={stopAudio} />
        </div>
      )}
    </Flex>
  );
};

export default AnalyzeWithVoice;
