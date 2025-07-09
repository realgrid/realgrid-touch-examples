import { card } from './card';
import { Header } from '@components/atoms';
import MenuButton from '@molecules/Menu';

//////////////////////////////////////////////////////
// templates
//////////////////////////////////////////////////////
export const row = {
    template: {
        layout: 'vlinear',
        children: [
            card({
                label: '휴가유형',
                required: true,
                type: 'select',
                values: ['paid', 'half', 'sick', 'official'],
                labels: ['연차휴가', '반차', '병가', '공가'],
                editable: true,
                field: 'type',
            }),
            card({
                label: '사용기간',
                type: 'text',
                field: 'started_at'
            }),
            card({
                label: '미사용 연차',
                type: 'text',
                field: 'remains'
            }),
            card({
                label: '사용단위',
                required: true,
                type: 'select',
                editable: true,
                field: 'unit',
                values: ['all', 'half'],
                labels: ['종일', '반차'],
            })
        ],
        itemGap: 14,
        style: {
            padding: '8px',
        }
    },
};

export const header = Header({
    caption: '휴가 신청',
    buttons: [
        // { label: '닫기', onClick: () => {  }},
        { 
            name: 'request',
            label: '신청',
            // position: 'head',
            onClick: () => { alert('신청'); },
            style: {
                color: '#fff',
                background: '#1E90FF',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '11pt'
            }
        },
        MenuButton()
    ],
});