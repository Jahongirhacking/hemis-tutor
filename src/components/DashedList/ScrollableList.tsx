import { Flex, FlexProps } from 'antd';
import { ChevronDown } from 'lucide-react'; // yoki boshqa icon
import { useEffect, useRef, useState } from 'react';

export default function ScrollableList({ children, ...props }: FlexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Agar oxirigacha scroll qilinmagan bo‘lsa -> icon ko‘rsin
      if (scrollTop + clientHeight < scrollHeight - 30) {
        setShowScrollBottom(true);
      } else {
        setShowScrollBottom(false);
      }
    };

    // Initial check
    handleScroll();

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Flex vertical className="scrollable-list">
      {/* Scrollable content */}
      <Flex vertical ref={containerRef} {...props}>
        {children}
      </Flex>

      {/* Warning icon (not clickable) */}
      {showScrollBottom && <ChevronDown className="scroll-icon" />}
    </Flex>
  );
}
