import RealTouch from 'realgrid-touch';
const data = [
    { message: 'hello', target: 'world', distance: 100 },
    { message: 'bye', target: 'earth', distance: 200 },
];
const templateVlin = {
    template: {
        layout: 'vlinear',
        children: [{
            field: 'message',
            style: { backgroundColor: 'lightgray' }
        }, {
            field: 'target',
            style: { backgroundColor: '#0088ff', color: 'white' }
        }, {
            field: 'distance',
            style: { backgroundColor: 'yellow', border: '1px solid green', padding: '4px'}
        }],
        style: { fontSize: '18px' },
    }
};
const templateHlin = {
    template: {
        layout: 'hlinear',
        children: [{
            field: 'message',
            style: { backgroundColor: 'lightgray' }
        }, {
            field: 'target',
            style: { backgroundColor: '#0088ff', color: 'white' }
        }, {
            field: 'distance',
            style: { backgroundColor: 'yellow', border: '1px solid green', padding: '4px'}
        }],
        style: { fontSize: '18px' },
    }
};
const templateFrame = {
    template: {
        layout: 'frame',
        children: [{
            field: 'message',
            left: 10,
            top: 10,
            style: { backgroundColor: 'lightgray' }
        }, {
            field: 'target',
            style: { backgroundColor: '#0088ff', color: 'white' }
        }, {
            field: 'distance',
            right: 10,
            bottom: 10,
            style: { backgroundColor: 'yellow', border: '1px solid green', padding: '4px'}
        }],
        style: { background: '#00ff8840', fontSize: '18px', border: '1px dashed gray' },
    },
    rowProps: {
        height: 100
    }
};
const templateStack = {
    template: {
        layout: 'stack',
        activeChild: '${active;target}',
        children: [{
            id: 'message',
            field: 'message',
            style: { backgroundColor: 'lightgray' }
        }, {
            id: 'target',
            field: 'target',
            style: { backgroundColor: '#0088ff', color: 'white' }
        }, {
            id: 'distance',
            field: 'distance',
            style: { backgroundColor: 'yellow', border: '1px solid green', padding: '4px'}
        }],
        style: { background: '#00ff8840', fontSize: '18px', border: '1px dashed gray' },
    },
    rowProps: {
        height: 60
    },
    params: {
        active: (arg:any) => {
            switch (arg.row % 3) {
                case 0: return 'message';
                case 1: return 'target';
                default: return 'distance';
            }
        }
    }
};
const templateForm = {
    template: {
        layout: 'form',
        labelWidth: '30%',
        labelStyle: {
            textAlign: 'right',
            fontWeight: 'bold'
        },
        children: [{
            field: 'message',
            label: '메시지:',
            editor: { maxLength: 30 }
        }, {
            field: 'target',
            label: 'Target:',
            editor: { placeholder: '대상 입력' }
        }, {
            field: 'distance',
            label: '거리:',
            editor: { type: 'number' }
        }],
    },
    rowProps: {
        // height: 144
    },
}
const templateHtml = {
    template: {
        type: 'html',
        domid: 'row',
    },
    rowProps: {
        height: undefined
    }
};

const config = {
    props: {
        templates: { 
            templateHlin,
            templateVlin,
            templateFrame,
            templateStack,
            templateForm,
            templateHtml
        },
    },
    options: {
        row: { template: 'templateForm' }
    }
}

console.log(config)

const list = RealTouch.createListControl(document, 'realtouch');
list.setConfig(config);
list.data = RealTouch.createListData("data", {}, data);
