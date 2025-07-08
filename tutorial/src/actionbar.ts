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
    },
    options: {
        scrollBar: true,
        header: {
            visible: true,
            caption: 'Action Bar',
        },
        actionBar: {
            visible: true,
            action: 'delete',
            delete: {
                label: '삭제',
                confirmMessage: '삭제할까요?'
            }
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
