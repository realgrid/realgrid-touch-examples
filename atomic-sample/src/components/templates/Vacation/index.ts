import { RtListControl, RtSimpleData } from 'realgrid-touch';
import { card } from './card';

//////////////////////////////////////////////////////
// templates
//////////////////////////////////////////////////////
export const row = {
    template: card({
        // label: '',
        // value: undefined
    }),
    params: {
        type: ({control, row}: { control: RtListControl, row: number }) => {
            console.log((control.data as RtSimpleData).getValues(row));
            return control.data.getValue(row, 'type');
        }, 
        enabled: ({control, row}: { control: RtListControl, row: number }) => {
            return control.data.getValue(row, 'enabled');
        }, 
    }
}
export const row2 = {
//   vars: styles,
  template: {
    layout: 'vlinear',
    children: [
        card({
            label: '휴가유형', 
            required: true,
            type: 'list',
            value: '연차휴가',
        }),
        card({
            label: '사용기간', 
            value: '2025-01-02 ~ 2025-01-05',
        }),
        card({
            label: '미사용연차', 
            value: '15.125',
            enabled: false
        }),
        card({
            label: '사용단위', 
            required: true,
            type: 'list',
            value: '종일',
        }),

    ]
  }
};



export const header = {
    template: {
        caption: '휴가 신청',
        buttons: [
            // { label: '닫기', onClick: () => {  }},
            { label: '신청', onClick: () => { alert('신청'); }}
        ]
    }
};