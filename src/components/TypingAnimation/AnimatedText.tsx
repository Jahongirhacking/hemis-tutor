import { ReactElement, useEffect, useState } from 'react';

const TypingAnimationText = ({
  text,
  index,
  onComplete,
}: {
  text: string;
  index: number;
  onComplete: () => void;
}) => {
  const [completedTyping, setCompletedTyping] = useState<boolean>(false);
  const [displayResponse, setDisplayResponse] = useState<
    ReactElement | string
  >();

  useEffect(() => {
    if (completedTyping) onComplete();
  }, [completedTyping]);

  useEffect(() => {
    let i = 0;

    const intervalId = setInterval(() => {
      setDisplayResponse(text.slice(0, i));

      i += 1;

      if (i > text.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 7);

    return () => clearInterval(intervalId);
  }, []);

  if (index % 2 === 1)
    return (
      <strong>
        {displayResponse}
        {!completedTyping && '_'}
      </strong>
    );
  return (
    <span>
      {displayResponse}
      {!completedTyping && '_'}
    </span>
  );
};

export default TypingAnimationText;
