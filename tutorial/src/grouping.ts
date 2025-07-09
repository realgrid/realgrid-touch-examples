import RealTouch from 'realgrid-touch';
const list = RealTouch.createListControl(document, 'realtouch');

list.setConfig({
    props: {
        templates: {
            groupHeader: { 
                template: {
                    layout: 'hlinear',
                    children: [
                        {
                            value: '${@group_value}'
                        },
                        {
                            value: '${@sum.PRICE}'
                        }
                    ]
                },
                // collapsed: {},
            },
            groupFooter: {
                template: {
                    layout: 'hlinear',
                    children: [
                        { space: '*' },
                        { value: '${@sum.PRICE}', renderer: { type: 'text', prefix: 'Sum: ' } },
                        { value: '${@row_count}', renderer: { type: 'text', prefix: '(', suffix: '개)' }}
                    ]
                }
            }
        },
    },
    options: {
        row: {
            commands: ['@delete'],
            template: {
                layout: 'hlinear',
                children: [
                    { field: 'ENTRPS_NM' },
                    { field: 'PRODLST_NM' },
                    { field: 'TELNO' },
                ]
            }
        },
        rowGroup: {
            header: {
                template: 'groupHeader',
            },
            footer: {
                template: 'groupFooter'
            }
        }
    }
})

const json = await(await fetch('../data/gyounggi-tuksanpum.json')).json();
const data = RealTouch.createListData('data', {}, json).createView('dv').sort(['SIGUN_NM'], true);
list.data = data;
list.rowGroupBy(['SIGUN_NM'], { expandLevel: 0 });