import RealTouch from 'realgrid-touch';

// '../data/gyounggido.json', '../data/gyounggi-tuksanpum.json'
const masterData = await(await fetch('../data/gyounggido.json')).json();
const detailData = await(await fetch('../data/gyounggi-tuksanpum.json')).json();

const list = RealTouch.createListControl(document, 'realtouch');

list.setConfig({
    props: {
        templates: {
            master: { 
                template: {
                    children: [
                        {field: 'SIGUN_NM',}
                    ]
                },
                rowStyle: {
                    backgroundColor: '#efefef',
                }
            }
        },
    },
    options: {
        row: {
            template: {
                layout: 'hlinear',
                children: [
                    { field: 'ENTRPS_NM' },
                    { field: 'PRODLST_NM' },
                    { field: 'TELNO' },
                ]
            }
        },
        rowInfos: {
            master: {
                template: 'master',
            },
        }
    }
})

const master = RealTouch.createListData('master', {}, masterData).createView('master').sort(['SIGUN_NM'], true);
const detail = RealTouch.createListData('detail', {}, detailData).createView('detail').sort(['SIGUN_NM'], true);

const data = RealTouch.createDataLink('main', master, {
    data: detail,
    keyFields: ['SIGUN_NM']
});

list.data = data;
list.dataGroupBy({});