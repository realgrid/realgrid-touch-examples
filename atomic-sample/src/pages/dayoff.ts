import RealTouch from 'realgrid-touch';
import { row, header } from '@components/templates/Dayoff'

console.log(row);
const list = RealTouch.createListControl(document, 'realtouch');
const config = {
    props: {
        templates: {
            row,
        },
        style: {
            backgroundColor: '#f5f5f5'
        }
    },
    options: {
        header,
        singleRow: {
            visible: true,
        },
        footer: false,
        scrollIndicator: false,
        overScrollEffect: 'none',
    },
};

list.setConfig(config);
list.data = RealTouch.createListData('', {}, [
    { type: 'paid', started_at: '2025-01-02', ended_at: '2025-01-05', remains: 15.125, unit: 'half' }
]);