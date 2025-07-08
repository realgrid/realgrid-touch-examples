import RealTouch from 'realgrid-touch';
import { row } from '@components/templates/Login'

const list = RealTouch.createListControl(document, 'realtouch');
const config = {
    props: {
        templates: {
            row: row,
        },
    },
    options: {
        row: {
            template: 'row',
        },
        singleRow: {
            visible: true,
        },
        scrollIndicator: false,
        footer: false,
        overScrollEffect: 'none',
    },
};

list.setConfig(config);
list.data = RealTouch.createListData('', {}, [{ user: '', password: '' }]);