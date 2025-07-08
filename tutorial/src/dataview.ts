import { createListControl, createListData, RtDataType } from 'realgrid-touch';
const json = await(await fetch('../data/yososu.json')).json();

const list = createListControl(document, 'realtouch');

list.setConfig(
    {
        options: {
            header: {
                visible: true,
                caption: '요소수',
                buttons: [{
                    label: '필터',
                    onClick: (args:any) => {
                        args.control.showFilterPanel();
                    }
                }]
            },
            row: {
                template: {
                    type: 'layout',
                    layout: 'vlinear',
                    children: [
                        { field: 'OILSTATN_NM' },
                        { field: 'QTY' },
                    ]
                }
            },
            filterPanel: {
                cancelLabel: '취소',
                okLabel: '적용'
            }
        }
    }
)

list.data = createListData("data", {
    fields: [
        {name: "OILSTATN_NM", type: RtDataType.TEXT },
        {name: "LOCPLC_ROADNM_ADDR", type: RtDataType.TEXT },
        {name: "TELNO", type: RtDataType.TEXT },
        {name: "QTY", type: RtDataType.NUMBER },
    ]
}, json).createView('dv', {
    sort: ['OILSTATN_NM', 'QTY'],
    // filterOp: 'or',
    filter: {
        filters: [{
            name: 'f1',     // 이름을 지정해야 나중에 enable/disable 시킬 수 있다.
            label: 'QTY > 0',
            enabled: true,  // 지정하지 않으면 true
            filter: (row: number, values: { [key: string]: any }) => values['QTY'] > 0
        },
        {
            name: 'f2',
            label: '인천',
            enabled: false,
            filter: (row: number, values: { [key: string]: any }) => values['LOCPLC_ROADNM_ADDR'].startsWith('인천')
        }]
    }
});

// const data = RealTouch.createListData("data", {}, json);
// const dv = RealTouch.createDataView('dv', data, {});
// list.data = dv;