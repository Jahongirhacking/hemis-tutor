import { INotFoundProps } from '@/components/SpecialComponents/NotFoundAnimation';
import { ReactElement } from 'react';

export interface IAnalyzeResultProps {
  showRequestLoading?: () => ReactElement | null;
  showResponseLoading?: () => ReactElement | null;
  openChat?: (noReply?: boolean) => ReactElement | null;
  setResult?: React.Dispatch<React.SetStateAction<string>>;
  showResult?: () => ReactElement | null;
  showNotFound?: (props?: INotFoundProps) => ReactElement | null;
}
