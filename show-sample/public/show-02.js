function init() {
    var list, data;

    const singleData = [
        {
            hello: "Hello,",
            world: "World!",
        },
    ];

    const multiData = [
        {
            hello: "Hello,",
            world: "World!",
        },
        {
            hello: "Hello,",
            world: "WooriTech!",
        },
        {
            hello: "Hello,",
            world: "RealGrid-Touch!",
        },
    ];

    const singleRow_template = {
        template: {
            layout: "vlinear",
            itemsAlign: "center",
            children: [
                {
                    field: "hello",
                },
                {
                    field: "world",
                },
            ],
        },
        rowStyle: {
            fontSize: "50px",
            height: "100%",
            alternate: {
                backgroundColor: "#fff9c4",
            },
        },
    };

    data = RealTouch.createListData("", null, multiData);
    list = RealTouch.createListControl(document, "realtouch");
    list.setConfig({
        props: {
            templates: {
                row: singleRow_template,
            },
        },
        options: {
            row: {
                template: "row",
            },
            header: {
                visible: true,
                buttons: [
                    {
                        label: "Scroll",
                        onClick: (args) => {
                            alert("Auto Scroll!");
                            args.control.options.singleRow.autoScroll.enabled = true;
                        },
                    },
                ],
            },
            singleRow: {
                visible: true,
                autoScroll: {
                    duration: 1000,
                },
            },
        },
    });
    list.data = data;
}
