import { RtListControl } from 'realgrid-touch';
import gauge from '@atoms/Gauge';

export const header = {
    template: {
        width: "100%",
        layout: "hlinear",
        children: [
            gauge({ value: 50 }),
            {
                width: "50%",
                layout: "vlinear",
                itemsAlign: "left",
                itemGap: 20,
                children: [
                    {
                        layout: "hlinear",
                        children: [
                            {
                                renderer: {
                                    type: "shape",
                                    shape: 'circle',
                                    // shapes: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"],
                                    // svgWidth: 18,
                                    // svgHeight: 18,
                                    // vboxWidth: 24,
                                    // vboxHeight: 24,
                                    style: {
                                        fill: "none",
                                        stroke: "--greenStyle",
                                        strokeWidth: "7px",
                                    },
                                },
                            },
                            {
                                value: (args: any) => {
                                    // return performTasksCounts(args, true);
                                },
                            },
                            {
                                value: "Finished",
                            },
                        ]
                    },
                    {
                        layout: "hlinear",
                        children: [
                            {
                                renderer: {
                                    type: "shpae",
                                    shape: 'circle',
                                    // shapes: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"],
                                    // svgWidth: 18,
                                    // svgHeight: 18,
                                    // vboxWidth: 24,
                                    // vboxHeight: 24,
                                    style: {
                                        fill: "none",
                                        stroke: "--orangeStyle",
                                        strokeWidth: "7px",
                                    },
                                },
                            },
                            {
                                value: (args: any) => {
                                    // return performTasksCounts(args, false);
                                },
                            },
                            {
                                value: "Voided",
                            },
                        ]
                    },
                ],
                style: {
                    paddingLeft: "20px",
                },
            },
        ],
        style: {
            padding: "0 15px",
            color: "#333",
        },
    },
    laytoutParams: {
        data: ({ control }: { control: RtListControl }) => {
            return {};
        }
    }
};

export const row = {
    template: {

    }
};