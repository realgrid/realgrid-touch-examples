import RealTouch from 'realgrid-touch';

const rowTemplate = {
    template: {
        layout: 'vlinear',
        height: '100%',
        itemsAlign: 'center',
        itemsArrange: 'center',
        children: ['message', 'target'],
        style: { fontSize: '30px' },
    },
};
const list = RealTouch.createListControl(document, "realtouch");

list.setConfig({
    props: {
        templates: { 
            row: rowTemplate
        },
        rowCommands: {
            '@delete': { 
                label: '삭  제', 
                style: {
                    backgroundColor: '#c00000',
                    whiteSpace: 'pre',
                }},
            'alert': { 
                label: 'alert', run: () => { alert('Ok') }, enabled: () => true
            },
        },
        onRowSwipe: (args:any) => {
            args.cancel = args.dir == 'right';
        },
    },
    options: {
        row: {
            commands: ['@delete', 'alert'],
        }
    }
});

list.data = RealTouch.createListData("", {}, [{
    message: 'Good',
    target: 'Morning'
}, {
    message: 'Good',
    target: 'Afternoon'
} ,{
    message: 'Good',
    target: 'Evening'
}]);
