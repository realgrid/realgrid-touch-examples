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

const menu = {
    alwaysHide: true,
    onShow: (args:any) => {
        const d = args.control.options.rowBar.display;
        args.menu.getItem(d).checked = true;
    },
    onClick: (args:any) => {
        args.control.options.rowBar.display = args.item.id;
    },
    items: [{
        id: 'none',
        type: 'radio',
        label: 'None'
    }, {
        id: 'order',
        type: 'radio',
        label: 'Order',
        checked: true
    }, {
        id: 'check',
        type: 'radio',
        label: 'Check'
    }, {
        id: 'shape',
        type: 'radio',
        label: 'Shape'
    }, {
        id: 'letter',
        type: 'radio',
        label: 'Letter'
    }, {
        id: 'image',
        type: 'radio',
        label: 'Image'
    }, {
        id: 'button',
        type: 'radio',
        label: 'Button'
    }, {
        id: 'move',
        type: 'radio',
        label: 'Move'
    }]
};


const list = RealTouch.createListControl(document, "realtouch");

list.setConfig({
    props: {
        templates: { 
            row: rowTemplate
        },
    },
    options: {
        rowBar: {
            visible: true,
            display: 'order',
            order: {
                suffix: '.',
                style: { fontSize: '19px', color: '#777' }
            },
            check: {
            },
            letter: {
                cellStyle: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                },
                styleCallback: (args:any) => { 
                    if (args.row % 2) {
                        return {
                            color: 'red'
                        }
                    } else {
                        return {
                            fontWeight: 'bold',
                            color: '#00c'
                        }
                    }
                }
            },
            button: {
                minWidth: 60,
                // height: '80%',
                label: '확 인',
                onClick: ({button, row}: {button:any, row:number}) => {
                    alert('BUTTON' + ': ' + row);
                }
            },
            shape: {
                shape: '@circle',
                size: 20,
                clickable: true,
                style: { fill: 'green' },
                onClick: (args:any) => {
                    alert(args.row + ', ' + args.shape);
                },
                shapeCallback: (args:any) => {
                    if (args.row % 3 == 1) return '@star';
                },
                styleCallback: (args:any) => {
                    if (args.row % 3 == 1) return {
                        fill: 'red'
                    };
                }
            },
            image: {
                clickable: true,
                imageUrl: '../asset/images/admob.png',
                onClick: (args:any) => {
                    alert(`IMAGE, ${args.row}, ${args.imageUrl}`);
                },
                urlCallback: (args:any) => {
                    if (args.row % 3 === 1) return '../asset/images/slack.png';
                }
            }
        },
        scrollBar: true,
        header: {
            visible: true,
            caption: 'Row Bar',
            buttons: [{
                name: 'menu',
                shape: '@menu',
                onClick: (args: any) => {
                    args.control.showMenu(menu);
                }
            }]
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
