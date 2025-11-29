import { RootState } from '@/store/store';
import { Image } from 'antd';
import { useSelector } from 'react-redux';

const TutorLogo = ({ className }: { className?: string }) => {
  const themeColor = useSelector((store: RootState) => store.themeSlice.color);
  return (
    <div
      className={`flex items-center gap-2 group cursor-pointer ${className || ''}`}
    >
      <Image src="/images/hemis-icon.svg" preview={false} />
      <span
        className={`text-xl font-bold transition-colors ${themeColor === 'light' ? 'text-black' : 'text-white'}`}
      >
        tyutor<span className="text-teal-500">.hemis.uz</span>
      </span>
    </div>
  );
};

const SmallLogo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/hemis-icon.svg"
      className={`${className}`}
      preview={false}
    />
  );
};

TutorLogo.Small = SmallLogo;
export default TutorLogo;
