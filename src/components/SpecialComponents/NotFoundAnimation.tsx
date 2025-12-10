import { animation_2 } from '@/assets/animations';
import { Card, Flex, Typography } from 'antd';
import Lottie, { LottieComponentProps } from 'lottie-react';
import { CircleX } from 'lucide-react';
import { CSSProperties, ReactElement } from 'react';

export interface INotFoundProps extends Partial<LottieComponentProps> {
  description?: string;
  icon?: ReactElement;
  strong?: boolean;
  textAlign?: CSSProperties['textAlign'];
  maxWidth?: CSSProperties['maxWidth'];
}

const NotFoundAnimation = ({
  description,
  icon,
  strong = true,
  textAlign = 'left',
  maxWidth = 'min(500px, 100%)',
  ...props
}: INotFoundProps) => (
  <Flex
    gap={4}
    vertical
    align="center"
    style={{
      maxWidth,
      margin: 'auto',
      width: '100%',
    }}
  >
    <Lottie
      key={'not-found'}
      animationData={animation_2}
      loop
      autoplay
      className="w-[min(200px,100%)]"
      {...(props ?? {})}
    />
    <Flex gap={12} style={{ marginBottom: 12 }} align="center">
      <Flex flex={1}>{icon !== null && (icon || <CircleX size={20} />)}</Flex>
      <Typography.Text strong={strong} style={{ textAlign }}>
        {description || "Ma'lumot topilmadi"}
      </Typography.Text>
    </Flex>
  </Flex>
);

const DashboardAnimation = (props?: Partial<INotFoundProps>) => (
  <NotFoundAnimation
    icon={null}
    strong={false}
    textAlign="center"
    maxWidth={'min(350px, 100%)'}
    {...(props || {})}
  />
);

const CardAnimation = (props?: Partial<INotFoundProps>) => (
  <Card style={{ width: '100%', height: 'fit-content' }}>
    <Flex justify="center" align="center">
      <NotFoundAnimation
        icon={null}
        strong={false}
        textAlign="center"
        {...(props || {})}
      />
    </Flex>
  </Card>
);

NotFoundAnimation.Card = CardAnimation;
NotFoundAnimation.Dashboard = DashboardAnimation;

export default NotFoundAnimation;
