import { converToFloatingFormat } from '@/utils/numberFunc';
import { Tag } from 'antd';

export const documentDetails = [
  {
    label: 'Hujjat raqami:',
    value: '373-26323/22-23',
  },
  {
    label: 'Sanasi:',
    value: '16.06.2023',
  },
  {
    label: 'Summa:',
    value: <Tag color="success">{converToFloatingFormat(7472630)} so'm</Tag>,
  },
  {
    label: 'Hisob raqam::',
    value: '400910860272487094100082001',
  },
  {
    label: 'F.I.SH:',
    value: '31010976640025 - ASOMOV ZIYODILLA HIKMATILLA O‘G‘LI',
  },
  {
    label: 'Tashkilot:',
    value: 'TOSHKENT DAVLAT AGRAR UNIVERSITETI',
  },
  {
    label: 'Fakultet:',
    value: '5410900 - Ipakchilik va tutchilik',
  },
  {
    label: 'Ta’lim yo‘nalishi:',
    value: 'Ipakchilik va tutchilik',
  },
  {
    label: 'To‘lov maqsadi:',
    value:
      '09510~400910860272487094100082001~201678867~TOSHKENT DAVLAT AGRAR UNIVERSITETI~ PaymentID fdab67b2-7947-4506-b67c-17bcca58e692~4-курс талабаси 31010976640025 - ASOMOV ZIYODILLA HIKMATILLA O‘G‘LIнинг шартнома B3732311446/K 16.06.2023 га асосан тўлов контракти',
  },
];
