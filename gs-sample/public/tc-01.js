var data;
var list;

const footer_template = {
  template: {
    layout: "hlinear",
    children: [{ 
        value: "${@row_count} 개",
        style: { fontWeight: "bold", color: "#555" }
      }
    ],
  },
};
const row_template = {
  template: {
    layout: "vlinear",
    children: [{
      layout: "hlinear",
      width: "100%",
      children: [{
          field: "OILSTATN_NM",
          style: { fontSize: "17px", fontWeight: "bold", color: "#555" },
        },{
          space: "*",
        },{
          field: "QTY",
          style: { fontSize: "14px", color: "#555" },
      }],
      },{
        layout: "hlinear",
        width: "100%",
        children: [{
          field: "LOCPLC_ROADNM_ADDR",
          style: { fontSize: "14px", color: "#777" },
          renderer: {
            wrap: true,
          },
        }],
      },
    ],
  }
};

const config = {
  props: {
    templates: {
      row: row_template,
      footer: footer_template
    }
  },
  options: {
    row: {
      template: 'row',
    },
    rowBar: {
      visible: true,
      display: "order",
    },
    footer: {
      template: 'footer',
    }
  },
};

async function createListData(dataurl, callback) {
  try {
    const res = await fetch(dataurl);
    const json = await res.json();

    data = RealTouch.createListData("", {}, { values: json });
    callback && callback(data);
  }
  catch(error) {
    console.error(error);
  };
}

function init() {
  createListData("./data/yososu.json", (data) => {
    list = RealTouch.createListControl(document, "realtouch");
    list.setConfig(config);
    list.data = data;
  });
}
