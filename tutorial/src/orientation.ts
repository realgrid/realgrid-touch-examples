import RealTouch from 'realgrid-touch';

const row_template = {
    template: {
        layout: 'vlinear',
        height: '100%',
        itemsAlign: 'center',
        itemsArrange: 'center',
        children: ['message', 'target'],
        style: { fontSize: '30px' },
    }
};
const list = RealTouch.createListControl(document, "realtouch");

list.setConfig({
    props: {
        templates: { row: row_template }
    },
    options: {
        // orientation: 'horizontal'
    },
    landscape: {
        orientation: 'horizontal'
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
