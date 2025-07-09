import { Card, Tag, Header } from '@components/atoms';
import MenuButton from '@molecules/Menu';
import { RtListControl } from 'realgrid-touch';

const Label = ({label, field, options}: { label?: string, field?: string, options?: any }) => ({
    field,
    renderer: {
        text: label,
        style: {
            color: '#aaa',
            fontSize: '11pt'
        },
        ...options
    },
});
const KeyValueBox = ({label, field, space=4}: { label: string, field: string, space?: number }) => ({
    layout: 'hlinear',
    children: [
        Label({ label }),
        {
            space,
        },
        {
            field,
            renderer: {
                style: {
                    fontSize: '11pt'
                }    
            }
        }
    ]
});

export const header = Header({
    caption: '결재하기',
    buttons: [
        MenuButton()
    ]
});

export const row = {
    template: Card({
        header: {
            layout: 'vlinear',
            style: { padding: '20px' },
            children: [
                {
                    layout: 'hlinear',
                    width: '100%',
                    children: [
                        { 
                            renderer: Tag({
                                value: '휴가신청서', style: { color: 'black', fontWeight: '700' }
                            })
                        },
                        { space: '*' },
                        { field: 'status',  renderer: Tag() },
                    ]
                },
                Label({ field: 'id'}),
                {
                    field: 'title',
                    renderer: {
                        style: {
                            fontSize: '12pt',
                            fontWeight: '700'
                        }
                    }
                },
                {
                    layout: 'hlinear',
                    width: '100%',
                    children: [
                        KeyValueBox({
                            label: '기안',
                            field: 'request'
                        }),
                        { space: '*' },
                        KeyValueBox({
                            label: '첨부',
                            field: 'attachment',
                            space: 1,
                        }),
                        KeyValueBox({
                            label: '의견',
                            field: 'comment',
                            space: 1,
                        })
                    ],
                    itemGap: 10
                },
                KeyValueBox({
                    label: '결재',
                    field: 'approval'
                })
            ]
        },
        body: {
            id: 'approval',
            layout: 'repeater',
            direction: 'horizontal',
            field: 'lines',
            children: [
                Label({ field: 'name' }),
                Label({ field: 'name', options: { prefix: ' > ' } }),
            ],
            layoutCallback: (args: {row: number, count: number, index: number}) => {
                return args.index == 0 ? 0 : 1;
            }
            // layout: 'hlinear',
            // children: [
            //     Label({ field: 'lines.0'}),
            //     ...Array.from({length: 4}).map((c: any, i: number) => {
            //         return Label({field: 'lines.' + (i + 1), options: { prefix: ' > '}});
            //     })
            // ],
        }
    }),
}