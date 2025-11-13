import axios from 'axios';

export const getInnerValue = (
  data: object,
  ...keys: string[]
): number | object | string | undefined => {
  let temp = data;
  keys.forEach(key => {
    if (!temp) return undefined;
    if (key in temp) {
      temp = temp[key];
    } else return undefined;
  });
  return temp;
};

export const parseXML = (xmlString: string): any => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'application/xml');

  // Check for parsing errors
  const parserError = xml.getElementsByTagName('parsererror');
  if (parserError.length) {
    throw new Error('Error parsing XML');
  }

  // Convert XML to JSON (simple conversion)
  const obj = {};
  const traverse = (node, obj) => {
    if (node.nodeType === Node.TEXT_NODE) {
      obj.value = node.nodeValue;
      return;
    }

    obj[node.nodeName] = {};
    Array.from(node.childNodes).forEach(child => {
      traverse(child, obj[node.nodeName]);
    });
  };

  traverse(xml.documentElement, obj);
  return obj;
};

export const sendMessage = async ({
  message,
}: {
  message: object | string | number;
}): Promise<boolean> => {
  let msg = '';
  if (typeof message === 'object') {
    Object.keys(message).forEach(key => {
      msg += `${key}: ${JSON.stringify(message[key])}\n\n`;
    });
  } else {
    msg = String(message);
  }
  try {
    await axios.post(
      'https://hemis-edu.netlify.app/.netlify/functions/send-message',
      JSON.stringify({
        message: msg,
      })
    );
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getPureJSON = (data: string): any => {
  try {
    return data ? JSON.parse(data?.replace(/```json|```/g, '').trim()) : null;
  } catch (err) {
    console.error(err);
    return data;
  }
};
