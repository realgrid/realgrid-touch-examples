import RealTouch from 'realgrid-touch';
import { row, header } from '@components/vacation/request'

const list = RealTouch.createListControl(document, 'realtouch');
const config = {
    props: {
        templates: {
            row,
            // header
        },
    },
    options: {
        header: {
            visible: true,
            // template: 'header'
            caption: '휴가 신청',
            buttons: [
                // { label: '닫기', onClick: () => {  }},
                { label: '신청', onClick: () => { alert('신청'); }}
            ]
        },
        footer: false,
        overScrollEffect: 'none',
    },
};

list.setConfig(config);
list.data = RealTouch.createListData('', {}, [
    {
        label: '휴가유형', 
        required: true,
        type: 'list',
        value: '연차휴가',
        enabled: true,
    },
    {
        label: '사용기간', 
        value: '2025-01-02 ~ 2025-01-05',
    },
    {
        label: '미사용연차', 
        value: '15.125',
        enabled: false
    },
    {
        label: '사용단위', 
        required: true,
        type: 'list',
        value: '종일',
    },
]);