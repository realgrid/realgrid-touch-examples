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
        created: {
            backgroundColor: 'lightblue',
            color: 'white',
        }
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
        header: {
            visible: true,
            buttons: [
                    {
                    name: 'update',
                    label: '수정',
                    action: 'update',
                    style: {
                        color: 'blue'
                    },
                    // onClick: args => {
                    //     const row = args.control.focusedRow;
                    //     if (row >= 0) {
                    //         args.control.data.beginUpdate(row);
                    //     } else {
                    //         alert('수정할 행을 먼저 선택하세요.');
                    //     }
                    // }
                }, {
                    name: 'insert',
                    label: '삽입',
                    action: 'insert',
                    style: {
                        color: '#000088'
                    }
                }, {
                    name: 'append',
                    label: '추가',
                    action: 'append',
                    style: {
                        color: 'green'
                    }
                }
            ]
        },
        row: {
            commands: ['@edit', '@delete'],
            focusable: true,
        },
        edit: {
            template: 'edit',
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
}]).createEditableView('ev');

// list.data.onRowsUpdate = ({data, rows}) => {};
