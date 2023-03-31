function init() {
    var data, list;

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
            {
                id: "item_02",
                label: "필터패널",
                onClick: (control, item) => {
                    control.showFilterPanel();
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
                commands: ["@delete", "userCommand"],
                styleCallback: (args) => {
                    const v = args.data.getValue(args.row, "관리기관명");
                    if (v === "경기도 가평군청") {
                        return {
                            backgroundColor: "#e1bee7",
                        };
                    }
                },
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
        url: "./data/cctv-s.csv",
        method: "GET",
        dataType: "text",
    }).done((csv) => {
        const rows = csv.split("\n");
        const headers = rows[0];
        const YData = [];
        const PData = [];
        let csvData = headers + "\n";

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(",");
            if (row[0] === "경기도 가평군청") {
                PData.push(row);
            } else if (row[0] === "경기도 고양시") {
                YData.push(row);
            }
        }

        PData.forEach((e, i) => {
            csvData += e.join(",") + "\n";
            csvData += YData[i].join(",") + "\n";
        });

        data = RealTouch.createListData(
            "data",
            {},
            { type: "csv", values: csvData, fieldHeader: 0, startRow: 1, quoted: true }
        ).createView("view", {
            filter: {
                filters: [
                    {
                        name: "A",
                        label: "가평군청",
                        enabled: false,
                        filter: (row, values) => values["관리기관명"] === "경기도 가평군청",
                    },
                    {
                        name: "B",
                        label: "고양시",
                        enabled: false,
                        filter: (row, values) => values["관리기관명"] === "경기도 고양시",
                    },
                ],
            },
        });
        list = RealTouch.createListControl(document, "realtouch");
        list.setConfig(config);
        list.data = data;
        window.list = list;
    });

    window.next = () => {
        window.location.href = "./show-04.html";
    };
}
