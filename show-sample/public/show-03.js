function init() {
    var data, list;

    // Json Load
    const jsonLoad = () => {
        $.ajax({
            url: "../data/sample-01.json",
            method: "GET",
            dataType: "json",
        }).done((json) => {
            data = RealTouch.createListData("data", {}, json);
            list = RealTouch.createListControl(document, "realtouch");
            list.data = data;
        });
    };
    // jsonLoad();

    // CSV Load
    const csvLoad = () => {
        $.ajax({
            url: "../data/cctv-s.csv",
            method: "GET",
            dataType: "text",
        }).done((csv) => {
            data = RealTouch.createListData(
                "data",
                {},
                { type: "csv", values: csv, fieldHeader: 0, startRow: 1, quoted: true }
            )
                .createView("view")
                .sort({ field: "관리기관명", dir: "descending" })
                .build();
            list = RealTouch.createListControl(document, "realtouch");
            list.data = data;
        });
    };
    // csvLoad();

    // 행 삭제 시연
    const deleteCommand = ["@delete"];
    const userCommand = ["@delete", "userCommand"];
    const menu = {
        items: [
            {
                id: "item_01",
                label: "필드바 생성",
                onClick: (control, item) => {
                    control.options.fieldBar.visible = true;
                    control.options.fieldBar.fields = [
                        "관리기관명",
                        "설치목적구분",
                        "소재지지번주소",
                    ];
                    return true;
                },
            },
        ],
    };
    const row_template = {
        template: {
            layout: "vlinear",
            children: [
                {
                    layout: "hlinear",
                    children: [
                        {
                            field: "관리기관명",
                        },
                        {
                            space: "*",
                        },
                        {
                            field: "설치목적구분",
                        },
                    ],
                },
                {
                    field: "소재지지번주소",
                },
            ],
        },
    };

    const config = {
        props: {
            templates: {
                row: row_template,
            },
        },
        options: {
            row: {
                template: "row",
                commands: deleteCommand,
            },
            header: {
                visible: true,
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
        url: "../data/cctv-s.csv",
        method: "GET",
        dataType: "text",
    }).done((csv) => {
        data = RealTouch.createListData(
            "data",
            {},
            { type: "csv", values: csv, fieldHeader: 0, startRow: 1, quoted: true }
        )
            .createView("view", {
                filter: {
                    filters: [
                        {
                            name: "A",
                            label: "경기도 가평군청",
                            enabled: false,
                            filter: (row, values) => values["관리기관명"] === "경기도 가평군청",
                        },
                        {
                            name: "B",
                            label: "경기도 고양시",
                            enabled: false,
                            filter: (row, values) => values["관리기관명"] === "경기도 고양시",
                        },
                    ],
                },
            })
            .sort({ field: "관리기관명", dir: "descending" })
            .build();
        list = RealTouch.createListControl(document, "realtouch");
        list.setConfig(config);
        list.data = data;
        list.registerRowCommand("userCommand", {
            label: "사용자 커맨드",
            run: (ctx, dv, row) => {
                alert("사용자 커맨드 실행!");
            },
        });
    });

    window.next = () => {
        window.location.href = "./show-03-filter.html";
    };
}
