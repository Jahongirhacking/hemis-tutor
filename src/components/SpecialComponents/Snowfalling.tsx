import { ChristmasTreeEmoji, PartyConfettiEmoji } from '@/assets/emojis';
import moment, { Moment } from 'moment';
import Snowfall, { SnowfallProps } from 'react-snowfall';

interface IDateRange {
  startDate: Moment;
  endDate: Moment;
  images: string[];
  radius: [number, number];
  snowflakeCount: number;
  opacity: [number, number];
  speed: [number, number];
}

const Snowfalling = (props: SnowfallProps) => {
  // Get the current date
  const currentDate = moment();

  // Define the start and end dates
  const winterDate: IDateRange = {
    startDate: moment('12-01', 'MM-DD'), // 1st December
    endDate: moment('01-31', 'MM-DD'), // 31st January
    images: ['/images/snow.png', ChristmasTreeEmoji],
    radius: [10, 30],
    snowflakeCount: 15,
    opacity: [0, 0.1],
    speed: [0, 0.5],
  };

  // Adjust year for the range check
  if (currentDate.month() < 11) {
    winterDate.startDate.year(currentDate.year() - 1); // 1st Dec of the previous year
    winterDate.endDate.year(currentDate.year());
  } else {
    winterDate.startDate.year(currentDate.year());
    winterDate.endDate.year(currentDate.year() + 1); // 31st Jan of the next year
  }

  const graduationDate: IDateRange = {
    startDate: moment('05-01', 'MM-DD').year(currentDate.year()), // 1st May
    endDate: moment('06-01', 'MM-DD').year(currentDate.year()), // 1st June
    images: ['/images/mortarboard.png', PartyConfettiEmoji],
    radius: [10, 40],
    snowflakeCount: 12,
    opacity: [0, 0.01],
    speed: [0, 0.1],
  };

  const dates: IDateRange[] = [winterDate, graduationDate];
  let current: IDateRange | null = null;

  // Check if the current date is within the range
  for (const tempDate of dates) {
    if (
      currentDate.isBetween(tempDate.startDate, tempDate.endDate, null, '[]')
    ) {
      current = tempDate;
      break;
    }
  }

  if (!current) return null;

  const images = current.images.map(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image;
    return imgElement;
  });

  return (
    <Snowfall
      images={images}
      snowflakeCount={current.snowflakeCount}
      speed={current.speed}
      radius={current.radius}
      opacity={current.opacity}
      {...props}
    />
  );
};

export default Snowfalling;
