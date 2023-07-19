var data;
var list;

const footer_template = {
    template: {
        layout: "hlinear",
        children: [{
            value: "Σ",
            style: { fontSize: '19px' }
        }, {
            space: '*'
        }, {
            value: "${@row_count}",
            style: { fontWeight: 'bold', color: '#555' }
        }, {
            value: " rows.",
        }, {
            space: 5,
            visible: "${checkVisible}"
        }, {
            value: "${@check_count}",
            visible: "${checkVisible}",
            style: { color: 'red' }
        }, {
            value: " checked.",
            visible: "${checkVisible}"
        }]
    }
};
const row_template = {
    template: {
        layout: 'vlinear',
        children: [{
            field: 'OILSTATN_NM',
            left: 0,
            style: { fontSize: '17px', fontWeight: 'bold', color: '#555' },
            tag: 'name'
        }, {
            field: 'LOCPLC_ROADNM_ADDR',
            left: 0,
            style: { fontSize: '14px', color: '#777' },
            tag: 'addr',
            renderer: {
                wrap: true
            }
        }]
    },
    rowStyle: {
        checked: {
            backgroundColor: '#0088ff20'
        }
    }
};
const row_template2 = {
    template: {
        layout: 'hlinear',
        children: [{
            field: 'OILSTATN_NM',
            shrink: 1,
            style: { fontSize: '17px', fontWeight: 'bold', color: '#555' },
            tag: 'name',
        }, {
            field: 'TELNO',
            shrink: 1,
            style: { fontSize: '14px', color: 'red' },
            tag: 'addr',
        }, {
            space: '*'
        }, {
            field: 'QTY',
            shrink: 0,
            style: { fontSize: '18px', fontWeight: 'bold', color: '#008' },
            tag: 'addr',
            renderer: {
                suffix: ' 개'
            }
        }]
    },
    rowStyle: {
        backgroundColor: '#0088ff10',
        checked: {
            backgroundColor: '#0088ff20'
        }
    }
};

const config = {
    props: {
        numberFormat: ',',
        templates: {
            'row': row_template,
            'row2': row_template2,
            'footer': footer_template
        },
        onRowSwipe: (args) => {
            console.log('SWIPE ROW', args.row);
        },
        onRowClick: (args) => {
            alert('ROW: ' + args.row);
        },
    },
    options: {
        row: {
            template: 'row',
            templateCallback: args => {
                return args.row % 2 ? 'row' : 'row2'
            },
            commands: ['@info', '@delete'],
            link: {
                rootUrl: 'https://namu.wiki/w/',
                linkField: '영화명',
                linkCallback: ({control, row}) => {
                    const v = control.data.getValue(row, '영화명');
                    return v;
                }
            },
            // clickAction: 'info'
        },
        rowBar: {
            visible: true,
            display: 'order',
            check: {
                dragMode: 'toggle',//'check'
            },
            order: {
                suffix: '.',
                style: { fontSize: '19px', color: '#080' }
            },
        },
        editBar: {
            visible: false,
            action: 'delete',
            link: { url: 'http://daum.net' },
            delete: { confirmMessage: '삭제할까요?' },
            custom: { 
                height: '80%',
                onClick: (args) => {
                    const v = data.getValue(args.row, 'OILSTATN_NM');
                    alert(`CUSTOM, ${args.row}, ${v}`);
                }
            }
        },
        scrollBar: true,
        scrollIndicator: {
            // position: 'right'
        },
        header: {
            visible: true,
            clickAction: 'field',
            caption: 'Multi Templates',
            captionAlign: 'center',
            buttons: [{
                name: 'home',
                label: '처음',
                position: 'head',
                onClick: (args) => {
                    location.href = './index.html';
                }
            }, {
                name: 'edit',
                label: '편집',
                style: {
                    color: 'blue'
                },
                onClick: (args) => {
                    const button = args.button;

                    if (button.label === '완료') {
                        list.options.rowBar.display = 'order';
                        list.checkAll(false);
    
                        button.label = '편집';
                        list.options.header.setButton(button);
    
                        list.options.footer.hideButton('delete');
                        delete list.state['edit']
    
                    } else {
                        list.options.rowBar.display = 'check';
                        list.checkAll(false);
                        list.options.rowBar.visible = true;
        
                        button.label = '완료';
                        list.options.header.setButton(button);
    
                        list.options.footer.showButton('delete');
                        list.state['edit'] = true;
                    }
                }
            }]
        },
        footer: {
            visible: true,
            template: 'footer',
            buttons: [{
                name: 'delete',
                label: '삭제',
                position: 'tail',
                visible: false,
                enabled: () => {
                    return list.checkedRowCount > 0;
                },
                onClick: (args) => {
                    const rows = list.getCheckedRows();
                    data.deleteRows(rows);
                },
                style: {
                    color: 'red'
                },
            }],
            layoutParams: {
                checkVisible: (args) => {
                    return list.state['edit'];
                }
            }
        },
        commandBox: {
            mode: 'overlap'
        },
        infoPage: {
            header: { caption: '요소수 정보' },
            viewType: 'B', //'form',// 'B',
            showDirection: 'right'
        }
    },
    portrait: {
    },
    landscape: {
    }
}

function createListData(dataurl, callback) {
    $.ajax({
        url: dataurl,
        method: 'GET',
        dataType: 'json'
    })
    .done(function (json) {
        const reader = (prop, value) => {
            if (prop === 'DATA_STD_DTM') {
                return new Date(value.substring(0, value.length - 3));
            }
            return value;
        }
        const options = {
            title: '요소수 판매 정보',
            fields: [
                { name: 'OILSTATN_NM', label: '주유소 명' },
                { name: 'LOCPLC_ROADNM_ADDR', label: '도로명 주소' },
                { name: 'TELNO', label: '전화 번호' },
                { name: 'QTY', label: '수량', type: 'number' },
                { name: 'LAT', label: '위도', type: 'number' },
                { name: 'LOGT', label: '경도', type: 'number' },
                { name: 'DATA_STD_DTM', type: 'date', label: '데이터 입력 일시' }
            ],
        };
        data = RealTouch.createListData('', options, {values: json, reader: reader})
            .createView('view', { sort: 'OILSTATN_NM' })
            .build();
        callback();
    })
    .fail(function(xhr, status, error) { 
        alert(error + ': ' + status);
    });
}

function init() {
    RealTouch.setLogging(true);
    RealTouch.setDebugging(true);
    // RealTouch.setBounding(true);
    // console.log('RealTouch v' + RealTouch.getVersion());

    createListData('./data/yososu.json', () => {
        list = RealTouch.createListControl(document, 'realtouch');
        list.setConfig(config);
        list.data = data;
    })
}
     