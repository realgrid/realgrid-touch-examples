// 테이블 
// 전부 다 작성한다.
const table = {
    colCount: 5,
    minWidth: "100%",
    columns: [60, 70, 100, 60, { width: 100, grow: 1 }]
};

const row_template = {
    template: {
        cells: [
            {
                field: "SIGUN_NM",
                header: {
                    renderer: {
                        label: "시군",
                        orderVisible: false,
                        markVisible: false,
                    },
                },
            },
            {
                field: "DIV",
                header: {
                    renderer: {
                        type: "field",
                        label: "구분",
                    },
                },
            },
            {
                field: "ENTRPS_NM",
                renderer: {
                    wrap: true,
                },
                style: {
                    fontWeight: "bold",
                    color: "#55f",
                },
                header: "품명",
            },
            {
                field: "PRODLST_NM",
                header: "품목",
            },
            {
                field: "TELNO",
                header: "연략처",
                footer: {
                    value: "${@count}건",
                    align: "right"
                }
            },
        ],
    },
    rowStyle: {
        fontSize: "15px",
        checked: {
            backgroundColor: "#0088ff20",
        },
    },
};

const config = {
    props: {
        templates: {
            row: row_template,
        },
        tables: {
            table: table,
        },
    },
    options: {
        rowType: "table",
        table: "table",
        row: {
            template: "row",
        },
        header: {
            visible: true,
            caption: "경기도 특산품 현황",
            style: {
                padding: "10px",
            }
        },
    },
};

function init() {
    let data, list;
    

    $.ajax({
        url: "../data/gyounggi-tuksanpum.json",
        method: "GET",
        dataType: "json",
    }).done((json) => {
        window.oncontextmenu = function () {
            return false;
        };
        data = RealTouch.createListData("data", null, json).createView("view");
        list = RealTouch.createListControl(document, "realtouch");
        list.setConfig(config);
        list.data = data;
    });
}
