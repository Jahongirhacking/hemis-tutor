import { ChatTopic, SearchParams } from '@/utils/config';
import { useSearchParams } from 'react-router-dom';

const useAnalyzeModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAnalayzeGpa = (chatTopic: ChatTopic) => {
    const params = new URLSearchParams(searchParams);
    params.delete(SearchParams.Drawer);
    if (chatTopic) {
      params.set(SearchParams.Modal, chatTopic);
    } else {
      params.delete(SearchParams.ChatTopic);
    }
    setSearchParams(params);
  };

  return {
    handleAnalayzeGpa,
    searchParams,
  };
};

export default useAnalyzeModal;
