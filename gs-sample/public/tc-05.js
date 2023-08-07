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
        }, {
          width: "*"
        }, {
          field: "QTY",
          style: { fontSize: "14px", color: "#555" },
        }],
      }, {
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
  },
};

const config = {
  props: { 
    templates: { // 템플릿 등록
      row: row_template, 
      footer: footer_template
    },
  },
  options: {
    row: {  // 데이터행 설정 모델
      template: "row", // 데이터행 레이아웃 생성에 사용되는 템플릿 이름 등록
      commands: ['@delete'] // 데이터행 커맨드상자 action 등록
    },
    rowBar: { // Row Bar 설정 모델
      visible: true, // 표시 여부 설정
      display: "order", // 행 앞에 번호를 표기하는 설정
    },
    footer: { // 푸터 설정 모델
      template: "footer" // 푸터 레이아웃 생성에 사용되는 템플릿 이름 등록
    }
  },
};

async function createListData(dataurl) {
  try {
    const res = await fetch(dataurl);
    const json = await res.json();
    // RtListData 생성
    return RealTouch.createListData("", {}, { values: json });
  }
  catch(error) {
    console.error(error);
  };
}

async function init() {
  data = await createListData("./data/yososu.json");
  // id가 'realtouch'인 Dom에 리스트 뷰를 생성하고 RtListControl을 리턴.
  list = RealTouch.createListControl(document, "realtouch");
  list.setConfig(config);
  list.data = data;
}
