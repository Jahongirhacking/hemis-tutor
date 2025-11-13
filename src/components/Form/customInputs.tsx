import { Input } from 'antd';
import createCustomInputs from './createCustomInputs';

export const FormattedPhoneNumberInput = createCustomInputs({
  name: 'phone-number',
  children: <Input placeholder="+998 XX XXX-XX-XX" />,
  formatFunc: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const beginChar = (str: string, char: string = ' ') => {
      return str ? `${char}${str}` : '';
    };
    const match = cleaned.match(
      /^(\d{1,3})\s*(\d{0,2})\s*(\d{0,3})\s*(\d{0,2})\s*(\d{0,2})$/
    );
    if (match) {
      return `+${match[1]}${beginChar(match[2])}${beginChar(match[3])}${beginChar(match[4], '-')}${beginChar(match[5], '-')}`;
    } else {
      return cleaned;
    }
  },
});

export const FormattedPassportNumberInput = createCustomInputs({
  name: 'passport-number',
  children: <Input placeholder="AA 0123456" />,
  formatFunc: (passportNumber: string) => {
    const cleaned = passportNumber.replace(/\W/g, '');
    const beginSpace = (str: string) => {
      return str ? ` ${str}` : '';
    };
    const match = cleaned.match(/^([A-Z]+)\s*(\d*)$/);
    if (match) {
      return `${match[1]}${beginSpace(match[2])}`;
    } else {
      return cleaned;
    }
  },
});
