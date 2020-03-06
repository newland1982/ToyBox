/* eslint-disable no-param-reassign */
import { configStorageUrl } from '../../../CONFIG/CONFIG';

// const regexImage = new RegExp(`#(${configStorageUrl}/blog/(origin|reply)/image/[a-z0-9.]+)#`, 'g');
const regexImage = new RegExp('#(blob:.+[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})#', 'g');
const rules = [
  [/</g, '&lt;'],
  [/>/g, '&gt;'],
  [/^\n/g, ''],
  [/\*\*([^*]+)\*\*/g, '<b>$1</b>'],
  [/\*([^*]+)\*/g, '<i>$1</i>'],
  [/((https?|ftp):\/\/([wW]{3}\.)?(([a-zA-Z0-9-]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?)[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]*)/g,
    '<a href=$1>&nbsp$4&nbsp;</a>'],
  [regexImage,
    '<div style="display: inline;"><img src=$1 alt="" border="0" /></div>'],
  [/\n/g, '<br>'],
  [/^(\s{8})/g, ''],
  [/(\s{6})+$/g, ''],
];
export default {
  bind(el) {
    let html = el.textContent;
    rules.forEach(([regex, template]) => {
      html = html.replace(regex, template);
    });
    const element = el;
    element.innerHTML = html;
  },
};
