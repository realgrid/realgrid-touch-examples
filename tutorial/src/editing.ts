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
    rowStyle: {
        updated: {
            backgroundColor: 'green',
            color: 'white',
        },
    }
};
const editTemplate = {
    template: {
        layout: 'vlinear',
        children: [
            {
                renderer: {
                    type: 'label',
                    text: 'message:',
                    target: 'message'
                }
            },
            {
                id: 'message',
                field: 'message',
                width: '100%',
                editor: {
                    type: 'text'
                }
            },
            { space: 8 },
            {
                renderer: {
                    type: 'label',
                    text: 'target:',
                    target: 'target'
                }
            },
            {
                id: 'target',
                field: 'target',
                width: '100%',
                editor: {
                    type: 'text'
                }
            },
        ],
        style: {
            padding: '8px'
        }
    }
}
const list = RealTouch.createListControl(document, "realtouch");

list.setConfig({
    props: {
        templates: { 
            row: rowTemplate,
            edit: editTemplate,
        },
        onRowSwipe: (args:any) => {
            args.cancel = args.dir == 'right';
        },
    },
    options: {
        row: {
            commands: ['@edit', '@delete'],
        },
        editPage: {
            header: { caption: 'Editing' },
            template: 'edit',
        },
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

// list.data.onRowsUpdate = ({data, rows}) => {};
