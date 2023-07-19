let master, detail, data, list;
// master / detail 수평 스크롤 가능
function init() {
    const table = {
        colCount: 5,
        minWidth: "100%",
        columns: [70, 70, 80, 80, { width: 80, grow: 1 }],
    };

    const row_template = {
        template: {
            cells: [
                {
                    field: "SIGUN_NM",
                    header: "시군"
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

    const row_template2 = {
        template: {
            cells: [
                {
                    field: "SIGUN_NM",
                    style: {
                    },
                    header: "시군", style: {
                        fontWeight: "bold",
                    },
                },
                {
                    field: "DIV",
                    style: {
                        fontWeight: "bold",
                    },
                    header: {
                        renderer: {
                            type: "field",
                            label: "구분",
                        },
                    }, style: {
                    },
                },
                {
                    colspan: 2,
                    fields: ["ENTRPS_NM","PRODLST_NM"],
                    renderer: {
                        wrap: true,
                    },
                    style: {
                    },
                    header: "품명 / 품목",
                },
                {},
                {
                    field: "TELNO",
                    style: {
                    },
                    header: "연략처",
                },
            ],
        },
        rowStyle: {
            fontSize: "15px",
            fontWeight: "bold",
            color: "green",
            checked: {
                backgroundColor: "#0088ff20"
            },
        },
    };

    const menu = {
        autoHide: true,
        alwaysHide: true,
        items: [
            {
                id: "item_01",
                type: 'radio',
                label: "Template 1",
                checked: true,
                onClick: (control, item) => {
                    control.options.row.template = "row";
                },
            },
            {
                id: "item_02",
                type: 'radio',
                label: "Template 2",
                onClick: (control, item) => {
                    control.options.row.template = "row2";
                    console.log(control.options.row.template)
                },
            }
        ],
    };

    const config = {
        props: {
            templates: {
                row: row_template,
                row2: row_template2,
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
                templateCallback: args => {
                },
                commands: ["@info", "@delete"],
                clickable: true,
                swipeAction: "none",
                longPressAction: "command",
            },
            header: {
                visible: true,
                caption: "경기도 특산품 현황",
                style: {
                    padding: "10px",
                },
                buttons: [{
                    shape: "@menu",
                    onClick : (args) => {
                        args.control.showMenu(menu);
                    }
                }]
            },
        },
    };

    $.ajax({
        url: "./data/gyounggi-tuksanpum.json",
        method: "GET",
        dataType: "json",
    }).done((json) => {
        window.oncontextmenu = function () {
            return false;
        };
        data = RealTouch.createListData("master", null, json)
            .createView("view")
            .build();
        list = RealTouch.createListControl(document, "realtouch");
        list.setConfig(config);
        list.data = data;
    });
}
