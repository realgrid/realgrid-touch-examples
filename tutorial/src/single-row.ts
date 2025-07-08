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
        singleRow: true
    }
});

list.data = RealTouch.createListData("", {}, [{
    message: 'Hello',
    target: 'World'
}, {
    message: 'Goodbye',
    target: 'Earth!'
}]);
