var data;
var list;

const template_params = {
    "rate-color": (args) => {
        return args.values["fltRt"] === 0 ? "#555" : args.values["fltRt"] > 0 ? "red" : "blue";
    },
    "rate-shape": (args) => {
        return args.values["fltRt"] >= 0 ? "@up" : "@down";
    },
    "mkp-color": (args) => {
        return args.values["clpr"] > args.values["mkp"] ? "blue" : "red";
    },
    "hipr-color": (args) => {
        return args.values["clpr"] > args.values["hipr"] ? "blue" : "red";
    },
    "lopr-color": (args) => {
        return args.values["clpr"] > args.values["lopr"] ? "blue" : "red";
    },
    "mkp-rate": (args) => {
        return ((args.values["mkp"] - args.values["clpr"]) / args.values["clpr"]) * 100;
    },
    "hipr-rate": (args) => {
        return ((args.values["hipr"] - args.values["clpr"]) / args.values["clpr"]) * 100;
    },
    "lopr-rate": (args) => {
        return ((args.values["lopr"] - args.values["clpr"]) / args.values["clpr"]) * 100;
    },
    "custom-row": (args) => {
        if (args.control.isRowDetailed(args.row)) {
            return {
                padding: "15px",
                border: "1.5px solid rgba(0,0,0,0.7)",
                borderBottom: "none",
            };
        } else {
            return {
                padding: "15px",
                border: "1.5px solid rgba(0,0,0,0.7)",
                borderRadius: "4px",
            };
        }
    },
    "custom-detailed-row": (args) => {
        if (args.control.isRowDetailed(args.row)) {
            return {
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "1.5px solid rgba(0,0,0,0.7)",
                borderTop: "none",
            };
        }
    },
};
const filters = [
    {
        name: "f_today",
        label: "02월 21일자",
        enabled: true,
        filter: (row, values) => values["basDt"] == "20230221",
    },
    {
        name: "f_up",
        label: "상승 종목",
        enabled: false,
        filter: (row, values) => +values["vs"] > 0,
    },
    {
        name: "f_down",
        label: "하락 종목",
        enabled: false,
        filter: (row, values) => +values["vs"] < 0,
    },
    {
        name: "f_up_5",
        label: "5% 이상 상승 종목",
        enabled: false,
        filter: (row, values) => +values["fltRt"] >= 5,
    },
    {
        name: "f_down_5",
        label: "5% 이상 하락 종목",
        enabled: false,
        filter: (row, values) => +values["fltRt"] <= -5,
    },
];

const menu = {
    origin: "right",
    onShow: (control, menu) => {},
    onClose: (control, menu) => {},
    onClick: (control, menu, item) => {},
    items: [
        {
            label: "검색",
            onClick: (control, item) => {
                list.showSearchPanel();
            },
        },
        {
            label: "필터 적용",
            onClick: (control, item) => {
                list.showFilterPanel();
            },
        },
    ],
};

const info_template = {
    template: {
        layout: "vlinear",
        style: {
            padding: "20px",
        },
        children: [
            {
                field: "itmsNm",
                left: 0,
                style: {
                    fontSize: "28px",
                    padding: "10px 0 0 10px",
                },
            },
            {
                layout: "hlinear",
                width: "100%",
                children: [
                    {
                        field: "mrktCtg",
                        left: 0,
                        style: {
                            padding: "0 10px",
                            color: "#999",
                        },
                    },
                    {
                        field: "lstgStCnt",
                        width: "100",
                        style: {
                            color: "#999",
                            fontSize: "18px",
                        },
                        renderer: {
                            suffix: " 주",
                        },
                    },
                ],
            },
            {
                field: "clpr",
                left: 0,
                style: {
                    padding: "20px 0 0 10px",
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: "${rate-color}",
                },
            },
            {
                layout: "hlinear",
                width: "100%",
                children: [
                    {
                        width: "50",
                        tag: "전일 대비 등락 비율",
                        renderer: {
                            type: "shape",
                            shape: "${rate-shape}",
                            shapeSize: "28",
                            style: {
                                padding: "0 0 0 10px",
                                fill: "${rate-color}",
                            },
                        },
                    },
                    {
                        width: "50",
                    },
                    {
                        width: "100",
                        field: "vs",
                        style: {
                            fontSize: "21px",
                            color: "${rate-color}",
                        },
                    },
                    {
                        width: "10",
                    },
                    {
                        field: "fltRt",
                        renderer: {
                            numberFormat: "a.00",
                            suffix: "%",
                        },
                        style: {
                            fontSize: "21px",
                            color: "${rate-color}",
                        },
                    },
                ],
            },
            {
                layout: "hlinear",
                width: "100%",
                style: {
                    padding: "20px 0 10px",
                    fontSize: "18px",
                },
                children: [
                    {
                        value: "시가",
                        style: {
                            color: "#aaa",
                        },
                    },
                    {
                        field: "mkp",
                        width: "70",
                        style: {
                            color: "${mkp-color}",
                            textAlign: "right",
                        },
                    },
                    {
                        value: "${mkp-rate}",
                        width: "100",
                        style: {
                            color: "${mkp-color}",
                            textAlign: "right",
                        },
                        renderer: {
                            numberFormat: "#.00",
                            prefix: "( ",
                            suffix: "% )",
                        },
                    },
                ],
            },
            {
                layout: "hlinear",
                width: "100%",
                style: {
                    padding: "10px 0",
                    fontSize: "18px",
                },
                children: [
                    {
                        value: "고가",
                        style: {
                            color: "#aaa",
                        },
                    },
                    {
                        field: "hipr",
                        width: "70",
                        style: {
                            color: "${hipr-color}",
                            textAlign: "right",
                        },
                    },
                    {
                        value: "${hipr-rate}",
                        width: "100",
                        style: {
                            color: "${hipr-color}",
                            textAlign: "right",
                        },
                        renderer: {
                            numberFormat: "#.00",
                            prefix: "( ",
                            suffix: "% )",
                        },
                    },
                ],
            },
            {
                layout: "hlinear",
                width: "100%",
                style: {
                    padding: "10px 0",
                    fontSize: "18px",
                },
                children: [
                    {
                        value: "저가",
                        style: {
                            color: "#aaa",
                        },
                    },
                    {
                        field: "lopr",
                        width: "70",
                        style: {
                            color: "${lopr-color}",
                            textAlign: "right",
                        },
                    },
                    {
                        value: "${lopr-rate}",
                        width: "100",
                        style: {
                            color: "${lopr-color}",
                            textAlign: "right",
                        },
                        renderer: {
                            numberFormat: "#.00",
                            prefix: "( ",
                            suffix: "% )",
                        },
                    },
                ],
            },
            {
                layout: "hlinear",
                children: [
                    {
                        height: 300,
                        style: {
                            paddingTop: "10px",
                        },
                        renderer: {
                            type: "html",
                            html: '<div style="width:300px; height: 300px;"><canvas id="myChart"></canvas></div>',
                        },
                    },
                ],
            },
        ],
    },
};

const row_template = {
    template: {
        layout: "vlinear",
        width: "100%",
        style: "${custom-row}",
        // border: "2px solid #d2d2d2",
        // borderRadius: "5px",
        // padding: "15px",
        children: [
            {
                layout: "hlinear",
                width: "100%",
                children: [
                    {
                        field: "srtnCd",
                        left: 0,
                        style: { fontSize: "12px", fontWeight: "bold", color: "skyblue" },
                        tag: "고유번호",
                    },
                    {
                        space: "*",
                    },
                    {
                        field: "basDt",
                        style: { fontSize: "12px", color: "#777" },
                        tag: "기준 일자",
                    },
                ],
            },
            {
                layout: "vlinear",
                width: "100%",
                children: [
                    {
                        layout: "hlinear",
                        grow: "1",
                        shrink: "1",
                        itemGap: 5,
                        width: "100%",
                        children: [
                            {
                                field: "itmsNm",
                                width: "100px",
                                style: {
                                    fontSize: "18px",
                                    color: "#222",
                                    fontWeight: "bold",
                                },
                                tag: "코드 이름",
                            },
                            {
                                space: "*",
                                width: "100px",
                            },
                            {
                                field: "clpr",
                                style: {
                                    paddingRight: "15px",
                                    fontSize: "18px",
                                    color: "${rate-color}",
                                    fontWeight: "bold",
                                    textAlign: "right",
                                },
                                tag: "최종 가격",
                            },
                            {
                                layout: "vlinear",
                                width: "70",
                                children: [
                                    {
                                        layout: "hlinear",
                                        children: [
                                            {
                                                width: "10",
                                                tag: "전일 대비 등락 비율",
                                                renderer: {
                                                    type: "shape",
                                                    shape: "${rate-shape}",
                                                    shapeSize: "12",
                                                    style: {
                                                        fill: "${rate-color}",
                                                    },
                                                },
                                            },
                                            {
                                                field: "fltRt",
                                                width: "60",
                                                style: {
                                                    fontSize: "13px",
                                                    color: "${rate-color}",
                                                    fontWeight: "bold",
                                                },
                                                tag: "전일 대비 등락 비율",
                                                renderer: {
                                                    numberFormat: "a.00",
                                                    suffix: "%",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        layout: "hlinear",
                                        children: [
                                            {
                                                field: "vs",
                                                width: "60",
                                                style: {
                                                    fontSize: "13px",
                                                    color: "${rate-color}",
                                                    fontWeight: "bold",
                                                },
                                                tag: "전일 대비 등락",
                                                renderer: {
                                                    wrap: true,
                                                    prefix: "₩ ",
                                                    numberFormat: "a,###",
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                layout: "vlinear",
                                width: "50",
                                children: [
                                    {
                                        field: "hipr",
                                        style: {
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                            width: "100%",
                                            textAlign: "right",
                                        },
                                        tag: "최고가격",
                                        renderer: {
                                            wrap: true,
                                        },
                                    },
                                    {
                                        field: "lopr",
                                        style: {
                                            fontSize: "13px",
                                            fontWeight: "bold",
                                            width: "100%",
                                            textAlign: "right",
                                        },
                                        tag: "최저가격",
                                        renderer: {
                                            wrap: true,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    extra: {
        layout: "vlinear",
        width: "100%",
        style: "${custom-detailed-row}",
        children: [
            {
                layout: "hlinear",
                itemGap: 30,
                style: {
                    fontSize: "18px",
                },
                children: [
                    {
                        value: "시가",
                        width: "60",
                        style: {
                            color: "#aaa",
                            textAlign: "center",
                        },
                    },
                    {
                        field: "mkp",
                        width: "60",
                        style: {
                            color: "${mkp-color}",
                            textAlign: "right",
                        },
                    },
                    {
                        value: "${mkp-rate}",
                        width: "100",
                        style: {
                            color: "${mkp-color}",
                            textAlign: "right",
                        },
                        renderer: {
                            numberFormat: "#.00",
                            prefix: "( ",
                            suffix: "% )",
                        },
                    },
                ],
            },
            {
                layout: "hlinear",
                itemGap: 30,
                style: {
                    fontSize: "18px",
                },
                children: [
                    {
                        value: "고가",
                        width: "60",
                        style: {
                            color: "#aaa",
                            textAlign: "center",
                        },
                    },
                    {
                        field: "hipr",
                        width: "60",
                        style: {
                            color: "${hipr-color}",
                            textAlign: "right",
                        },
                    },
                    {
                        value: "${hipr-rate}",
                        width: "100",
                        style: {
                            color: "${hipr-color}",
                            textAlign: "right",
                        },
                        renderer: {
                            numberFormat: "#.00",
                            prefix: "( ",
                            suffix: "% )",
                        },
                    },
                ],
            },
            {
                layout: "hlinear",
                itemGap: 30,
                style: {
                    fontSize: "18px",
                },
                children: [
                    {
                        value: "저가",
                        width: "60",
                        style: {
                            color: "#aaa",
                            textAlign: "center",
                        },
                    },
                    {
                        field: "lopr",
                        width: "60",
                        style: {
                            color: "${lopr-color}",
                            textAlign: "right",
                        },
                    },
                    {
                        value: "${lopr-rate}",
                        width: "100",
                        style: {
                            color: "${lopr-color}",
                            textAlign: "right",
                        },
                        renderer: {
                            numberFormat: "#.00",
                            prefix: "( ",
                            suffix: "% )",
                        },
                    },
                ],
            },
            {
                layout: "hlinear",
                itemGap: 30,
                style: {
                    paddingTop: "20px",
                    fontSize: "18px",
                },
                children: [
                    {
                    
                        renderer: {
                            type: "button",
                            label: "매도",
                            borderless: true,
                            style: {
                                padding: "0.5em 1em",
                                fontSize: "16px",
                                backgroundColor: "#f2f2f2",
                                border: "1px solid #c5c5c5",
                                borderRadius: "20px",
                                color: "#007aff",
                            },
                            onClick: (args) => {
                                alert("매도 버튼이 클릭되었습니다.");
                                return true;
                            },
                        },
                    },
                    {
                        renderer: {
                            type: "button",
                            label: "매수",
                            borderless: true,
                            style: {
                                padding: "0.5em 1em",
                                fontSize: "16px",
                                backgroundColor: "#f2f2f2",
                                border: "1px solid #c5c5c5",
                                borderRadius: "20px",
                                color: "#007aff",
                            },
                            onClick: (args) => {
                                alert("매수 버튼이 클릭되었습니다.");
                                return true;
                            },
                        },
                        style: {
                            paddingLeft: "15px",
                        },
                    },
                    {
                        style: {
                            paddingLeft: "15px",
                        },
                        renderer: {
                            type: "button",
                            label: "상세",
                            borderless: true,
                            style: {
                                padding: "0.5em 1em",
                                fontSize: "16px",
                                backgroundColor: "#f2f2f2",
                                border: "1px solid #c5c5c5",
                                borderRadius: "20px",
                                color: "#007aff",
                            },
                            onClick: (args) => {
                                const itmsNm = data.getValue(args.row, "itmsNm");
                                data.enableFilter("f_today", false, true);
                                const rows = data.$_d.getRows();
                                const detailClpr = [];
                                rows.filter((e) => {
                                    return e.values.itmsNm === itmsNm;
                                })
                                    .reverse()
                                    .forEach((e) => {
                                        detailClpr.push(e.values.clpr);
                                    });
                                list.showInfoPage(args.row, null, true);
                                setTimeout(() => {
                                    const ctx = document.getElementById("myChart").getContext("2d");
                                    new Chart(ctx, {
                                        type: "line",
                                        data: {
                                            labels: detailClpr,
                                            datasets: [
                                                {
                                                    label: "최근 10일",
                                                    data: detailClpr,
                                                    borderWidth: 1,
                                                },
                                            ],
                                        },
                                        options: {
                                            scales: {
                                                y: {
                                                    beginAtZero: false,
                                                },
                                                x: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    });
                                }, 500);
                                return true;
                            },
                        },
                    },
                ],
            },
        ],
    },
};
const landscape_template = {
    template: {
        layout: "vlinear",
        width: "100%",
        style: "${custom-row}",
        children: [
            {
                layout: "hlinear",
                width: "100%",
                children: [
                    {
                        field: "srtnCd",
                        style: { fontSize: "12px", fontWeight: "bold", color: "skyblue" },
                        tag: "고유번호",
                    },
                    {
                        space: "*",
                    },
                    {
                        field: "basDt",
                        style: { fontSize: "12px", color: "#777" },
                        tag: "기준 일자",
                    },
                ],
            },
            {
                layout: "hlinear",
                itemGap: 35,
                width: "100%",
                children: [
                    {
                        field: "itmsNm",
                        width: "100px",
                        style: {
                            fontSize: "18px",
                            color: "#222",
                            fontWeight: "bold",
                        },
                        tag: "코드 이름",
                    },
                    {
                        space: "*",
                        width: "100px",
                    },
                    {
                        field: "clpr",
                        style: {
                            paddingRight: "15px",
                            fontSize: "18px",
                            color: "${rate-color}",
                            fontWeight: "bold",
                            textAlign: "right",
                        },
                        tag: "최종 가격",
                    },
                    {
                        layout: "vlinear",
                        width: "70",
                        children: [
                            {
                                layout: "hlinear",
                                children: [
                                    {
                                        width: "10",
                                        tag: "전일 대비 등락 비율",
                                        renderer: {
                                            type: "shape",
                                            shape: "${rate-shape}",
                                            shapeSize: "12",
                                            style: {
                                                fill: "${rate-color}",
                                            },
                                        },
                                    },
                                    {
                                        field: "fltRt",
                                        width: "60",
                                        style: {
                                            fontSize: "13px",
                                            color: "${rate-color}",
                                            fontWeight: "bold",
                                        },
                                        tag: "전일 대비 등락 비율",
                                        renderer: {
                                            numberFormat: "a.00",
                                            suffix: "%",
                                        },
                                    },
                                ],
                            },
                            {
                                layout: "hlinear",
                                children: [
                                    {
                                        field: "vs",
                                        width: "60",
                                        style: {
                                            fontSize: "13px",
                                            color: "${rate-color}",
                                            fontWeight: "bold",
                                        },
                                        tag: "전일 대비 등락",
                                        renderer: {
                                            wrap: true,
                                            prefix: "₩ ",
                                            numberFormat: "a,###",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        layout: "vlinear",
                        width: "50",
                        children: [
                            {
                                field: "hipr",
                                style: {
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    width: "100%",
                                    textAlign: "right",
                                },
                                tag: "최고가격",
                                renderer: {
                                    wrap: true,
                                },
                            },
                            {
                                field: "lopr",
                                style: {
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    width: "100%",
                                    textAlign: "right",
                                },
                                tag: "최저가격",
                                renderer: {
                                    wrap: true,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    extra: {
        layout: "hlinear",
        width: "100%",
        style: "${custom-detailed-row}",
        children: [
            {
                layout: "vlinear",
                children: [
                    {
                        layout: "hlinear",
                        itemGap: 30,
                        left: 20,
                        style: {
                            fontSize: "18px",
                        },
                        children: [
                            {
                                value: "시가",
                                width: "60",
                                style: {
                                    color: "#aaa",
                                    textAlign: "center",
                                },
                            },
                            {
                                field: "mkp",
                                width: "60",
                                style: {
                                    color: "${mkp-color}",
                                    textAlign: "right",
                                },
                            },
                            {
                                value: "${mkp-rate}",
                                width: "100",
                                style: {
                                    color: "${mkp-color}",
                                    textAlign: "right",
                                },
                                renderer: {
                                    numberFormat: "#.00",
                                    prefix: "( ",
                                    suffix: "% )",
                                },
                            },
                        ],
                    },
                    {
                        layout: "hlinear",
                        itemGap: 30,
                        left: 20,
                        style: {
                            fontSize: "18px",
                        },
                        children: [
                            {
                                value: "고가",
                                width: "60",
                                style: {
                                    color: "#aaa",
                                    textAlign: "center",
                                },
                            },
                            {
                                field: "hipr",
                                width: "60",
                                style: {
                                    color: "${hipr-color}",
                                    textAlign: "right",
                                },
                            },
                            {
                                value: "${hipr-rate}",
                                width: "100",
                                style: {
                                    color: "${hipr-color}",
                                    textAlign: "right",
                                },
                                renderer: {
                                    numberFormat: "#.00",
                                    prefix: "( ",
                                    suffix: "% )",
                                },
                            },
                        ],
                    },
                    {
                        layout: "hlinear",
                        itemGap: 30,
                        left: 20,
                        style: {
                            fontSize: "18px",
                        },
                        children: [
                            {
                                value: "저가",
                                width: "60",
                                style: {
                                    color: "#aaa",
                                    textAlign: "center",
                                },
                            },
                            {
                                field: "lopr",
                                width: "60",
                                style: {
                                    color: "${lopr-color}",
                                    textAlign: "right",
                                },
                            },
                            {
                                value: "${lopr-rate}",
                                width: "100",
                                style: {
                                    color: "${lopr-color}",
                                    textAlign: "right",
                                },
                                renderer: {
                                    numberFormat: "#.00",
                                    prefix: "( ",
                                    suffix: "% )",
                                },
                            },
                        ],
                    },
                    {
                        layout: "hlinear",
                        left: 0,
                        style: {
                            paddingTop: "20px",
                            fontSize: "18px",
                        },
                        children: [
                            {
                                style: {
                                    paddingLeft: "50px",
                                },
                                renderer: {
                                    type: "button",
                                    label: "매도",
                                    borderless: true,
                                    style: {
                                        padding: "0.5em 1em",
                                        fontSize: "16px",
                                        backgroundColor: "#f2f2f2",
                                        border: "1px solid #c5c5c5",
                                        borderRadius: "20px",
                                        color: "#007aff",
                                    },
                                    onClick: (args) => {
                                        alert("매도 버튼이 클릭되었습니다.");
                                        return true;
                                    },
                                },
                            },
                            {
                                style: {
                                    paddingLeft: "50px",
                                },
                                renderer: {
                                    type: "button",
                                    label: "매수",
                                    borderless: true,
                                    style: {
                                        padding: "0.5em 1em",
                                        fontSize: "16px",
                                        backgroundColor: "#f2f2f2",
                                        border: "1px solid #c5c5c5",
                                        borderRadius: "20px",
                                        color: "#007aff",
                                    },
                                    onClick: (args) => {
                                        alert("매수 버튼이 클릭되었습니다.");
                                        return true;
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
            {
                width: 300,
                style: {
                    paddingLeft: "50px",
                    overflow: "visible",
                },
                renderer: {
                    type: "html",
                    html: '<div style=" width: 300px; height: 150px; padding-left: 80px"><canvas id="landscapeChart" style="width: 300px;" ></canvas></div>',
                },
            },
        ],
    },
};
const config = {
    props: {
        numberFormat: ",",
        templates: {
            row: row_template,
            rowinfo: info_template,
            landscape: landscape_template,
        },
        onRowSwipe: (args) => {
            console.log("SWIPE ROW", args.row);
        },
        onRowClick: (args) => {
            return true;
        },
        onRowDetail: (args) => {
            console.log("onRowDetail");
            const detailedRows = list.getDetailedRows(true);
            if (detailedRows.length === 0) {
                data.enableFilter("f_today", true, true);
            } else if (detailedRows.length === 1) {
                data.enableFilter("f_today", false, true);
            } else {
                const index = detailedRows.findIndex((e) => e == args.row);
                detailedRows.splice(index, 1);
                list.$_c.$_getFlags().detailRows(detailedRows, false);
            }
            if (args.control.landscape.isLandScape) {
                const itmsNm = data.getValue(args.row, "itmsNm");
                const rows = data.$_d.getRows();
                const detailClpr = [];
                rows.filter((e) => {
                    return e.values.itmsNm === itmsNm;
                })
                    .reverse()
                    .forEach((e) => {
                        detailClpr.push(e.values.clpr);
                    });
                setTimeout(() => {
                    const ctx = document.getElementById("landscapeChart");
                    if (ctx) {
                        new Chart(ctx, {
                            type: "line",
                            data: {
                                labels: detailClpr,
                                datasets: [
                                    {
                                        label: "최근 10일",
                                        data: detailClpr,
                                    },
                                ],
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                    },
                                    x: {
                                        display: false,
                                    },
                                },
                            },
                        });
                    }
                }, 1000);
            }
        },
    },

    options: {
        row: {
            template: "row",
            templateParams: template_params,
            clickable: true,
            clickAction: "detail",
            touchEffect: false
        },
        rowBar: {
            visible: false,
        },
        scrollBar: false,
        scrollIndicator: {
            position: "top",
        },
        header: {
            visible: true,
            caption: "주식 정보 서비스",
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
        footer: {
            visible: false,
            template: "footer",
        },
        infoPage: {
            header: {
                caption: "종목 상세 정보",
                style: {
                    padding: "10px",
                },
                buttons: [
                    {
                        shape: "@close",
                        onClick: (args) => {
                            list.closeInfoPage();
                            data.enableFilter("f_today", true, true);
                            // data.build();
                        },
                    },
                ],
            },
            templateParams: template_params,
            showDirection: "up",
            template: "rowinfo",
        },
        filterPanel: {
            position: "top",
            autoApply: true,
        },
    },
    portrait: {},
    landscape: {
        row: {
            templateParams: template_params,
            template: "landscape",
        },
    },
};

function createListData(dataurl, callback) {
    $.ajax({
        url: dataurl,
        method: "GET",
        dataType: "json",
    })
        .done(function (json) {
            const reader = (prop, value) => {
                if (prop === "hipr") {
                    return Number(value);
                }
                return value;
            };
            const options = {
                title: "주식 정보 서비스",
                fields: [
                    { name: "basDt", label: "기준 일자" },
                    { name: "srtnCd", label: "유일성이 보장되는 코드" },
                    { name: "isinCd", label: "채권 식별 번호" },
                    { name: "itmsNm", label: "유가증권 국제인증 고유번호 코드 이름" },
                    { name: "mrktCtg", label: "증가 * 상장주식수" },
                    { name: "clpr", label: "최종 가격", type: "number" },
                    { name: "vs", label: "전일 대비 등락", type: "number" },
                    {
                        name: "fltRt",
                        label: "전일 대비 등락에 따른 비율",
                        type: "number",
                    },
                    { name: "mkp", label: "최초가격", type: "number" },
                    { name: "hipr", label: "최고치", type: "number" },
                    { name: "lopr", label: "최저치", type: "number" },
                    { name: "trqu", label: "체결수량 누적 합계" },
                    { name: "trPrc", label: "체결가격 * 체결수량 누적 합계" },
                    { name: "lstgStCnt", label: "상장주식수", type: "number" },
                    { name: "mrktTotAmt", label: "종가 * 상장주식수" },
                ],
            };
            data = RealTouch.createListData("", options, {
                values: json,
                reader: reader,
            })
                .createView("view", {
                    filter: { filters },
                })
                .build();
            callback();
        })
        .fail(function (xhr, status, error) {
            alert(error + ": " + status);
        });
}

function init() {
    createListData("./data/sample-01.json", () => {
        list = RealTouch.createListControl(document, "realtouch");
        list.setConfig(config);
        list.data = data;
    });
}

window.addEventListener("DOMContentLoaded", function () {
    try {
        init();
    } catch (err) {
        alert(err);
        console.error(err);
    }
});
