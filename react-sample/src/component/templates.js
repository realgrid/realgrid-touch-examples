
export const row_template = {
  template: {
    layout: "vlinear",
    children: [
      {
        field: "OILSTATN_NM",
        left: 0,
        style: {
          fontSize: "17px",
          fontWeight: "bold",
          color: "#555",
        },
        tag: "name",
      },
      {
        field: "LOCPLC_ROADNM_ADDR",
        left: 0,
        style: {
          fontSize: "14px",
          color: "#777",
        },
        tag: "addr",
      },
    ],
  },
  rowStyle: {
    paddingTop: "11px",
    paddingBottom: "11px",
    paddingLeft: "5px",
    paddingRight: "5px",
    checked: {
      backgroundColor: "#0088ff20",
    },
  },
};

export const footer_template = {
  props: {},
  template: {
    layout: "hlinear",
    children: [
      {
        value: "Σ",
        style: { fontSize: "19px" },
      },
      {
        space: "*",
      },
      {
        value: "${@row_count}"
      },
      {
        value: " rows.",
      },
      {
        renderer: {
          type: "spacer",
          width: 10,
        },
        visible: "${checkVisible}",
      },
      {
        value: "${@check_count}",
        style: {
          color: "red",
        },
        visible: "${checkVisible}",
      },
      {
        value: " checked.",
        visible: "${checkVisible}",
      },
    ],
  },
};
