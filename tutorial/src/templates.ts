import RealTouch from 'realgrid-touch';

const data = [
    {name: 'name1', age: 35, salary: '$4000'},
    {name: 'name2', age: 27, salary: '$3000'}
];
const template = {
    rowProps: {
        minHeight: 30,
        height: 50,
        maxHeight: 100
    },
    var: {
        'num-style': { color: 'blue', fontWeight: 'bold' }
    },
    template: {
        type: 'layout',
        layout: 'hlinear',
        // layout: 'vlinear',
        children: [{
            field: 'age',
            style: '--num-style'
        }, {
            field: 'salary',
            style: '--num-style'
        }]
    },
    rowStyle: {
        background: 'yellow',
        color: 'gray',
        checked: {},
        updated: {}
    }
}

const config = {
    props: {
        templates: { row: template }
    },
    options: {
        row: {
            template: 'row'
        }
    }
}

const list = RealTouch.createListControl(document, 'realtouch');
list.setConfig(config);
list.data = RealTouch.createListData("data", {}, data);