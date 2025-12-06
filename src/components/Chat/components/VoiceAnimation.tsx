import { Button, Flex } from 'antd';
import { HeadphoneOff } from 'lucide-react';

const VoiceAnimation = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div id="voice-animation">
      <Flex gap={10} align="center">
        <Flex align="center" className="voice-bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </Flex>
        <Button
          icon={<HeadphoneOff size={20} />}
          type="text"
          onClick={onCancel}
        />
      </Flex>
    </div>
  );
};

export default VoiceAnimation;
