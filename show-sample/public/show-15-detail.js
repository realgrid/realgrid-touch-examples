function init() {
    let data, list;
    const table = {
        colCount: 5,
        minWidth: "100%",
        columns: [60, 70, 100, 60, { width: 100, grow: 1 }],
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
                    footer: {
                        value: "Σ",
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
                        align: "right",
                    },
                },
            ],
        },
        extra: {
            layout: "vlinear",
            children: [
                {
                    renderer: {
                        type: "shape",
                        shape: "@down",
                    },
                },
                {
                    layout: "hlinear",
                    width: "50%",
                    itemGap: 10,
                    style: {
                        padding: "10px"
                    },
                    children: [
                        {
                            field: "ENTRPS_NM",
                            renderer: {
                                type: "button",
                                label: "업체 전화",
                                imageWidth: 32,
                                imageUrl: "../asset/images/google/call.png",
                                borderless: true,
                                onClick: () => {
                                    alert("휴대전화");
                                },
                                style: { fontSize: "13px", color: "#0088ff" },
                            },
                        },
                        {
                            space: "*",
                        },
                        {
                            renderer: {
                                type: "button",
                                label: "검색하기",
                                imageWidth: 32,
                                imageUrl: "../asset/images/google/search.png",
                                borderless: true,
                                onClick: () => {
                                    alert("검색하기");
                                },
                                style: { fontSize: "13px", color: "#0088ff" },
                            },
                        },
                    ],
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

    const menu = {
        items: [
            {
                id: "item_01",
                label: "시군 정렬",
                onClick: (control, item) => {
                    control.data.sort({ field: "SIGUN_NM", dir: "descending" }).build();
                    return true;
                },
            },
        ],
    };

    const config = {
        props: {
            templates: {
                row: row_template,
            },
            tables: {
                table: table,
            },
            onRowDetail: () => {
                console.log("detail");
            },
        },
        options: {
            rowType: "table",
            table: "table",
            row: {
                template: "row",
                commands: ["@info", "@delete"],
                clickAction: "detail",
                touchEffect: false,
            },
            header: {
                visible: true,
                caption: "경기도 특산품 현황",
                style: {
                    padding: "10px",
                },
                buttons: [
                    {
                        shape: "@menu",
                        onClick: (args) => {
                            args.control.showMenu(menu);
                        },
                    },
                ],
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
        data = RealTouch.createListData("data", null, json).createView("view");
        list = RealTouch.createListControl(document, "realtouch");
        list.setConfig(config);
        list.data = data;
    });
}
