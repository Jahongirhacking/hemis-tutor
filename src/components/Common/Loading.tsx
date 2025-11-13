import { IUniversityInfo } from '@/pages/auth/Login/UniversityForm';
import { getLocalStorage, localStorageNames } from '@/utils/storageFunc';
import { Flex, Image, Typography } from 'antd';
import './Loading.scss';

const Loading = () => {
  const hemis: IUniversityInfo = {
    logo: '/images/hemis-icon.svg',
    name: 'HEMIS - axborot tizimi',
  };
  const university: IUniversityInfo = getLocalStorage(
    localStorageNames.university
  );

  const UniversityLogo = ({ className }: { className: string }) => (
    <Flex vertical className={className}>
      <Image
        src={university ? university.logo : hemis.logo}
        fallback="/images/gerb.png"
        alt="university icon"
        preview={false}
      />
      <Typography.Text strong>
        {university ? university.name : hemis.name}
      </Typography.Text>
    </Flex>
  );

  return (
    <Flex className="overlay">
      <div className="flip-card">
        <div className="flip-card-inner">
          <Flex vertical className="flip-card-front">
            <Image src={hemis.logo} alt="hemis icon" preview={false} />
            <Typography.Text strong>{hemis.name}</Typography.Text>
          </Flex>
          <UniversityLogo className="flip-card-back" />

          {/* hidden */}
          <UniversityLogo className="flip-card-hidden" />
        </div>
      </div>
    </Flex>
  );
};

export default Loading;
