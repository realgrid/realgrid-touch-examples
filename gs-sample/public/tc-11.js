var data; // RtListData를 담을 변수. debug에 용이하도록 전역 변수로 설정함.
var list; // RtListControl을 담을 변수. debug에 용이하도록 전역 변수로 설정함.

const footer_template = {
  template: {
    layout: "hlinear", // 수평 레이아웃 설정
    children: [{ 
        value: "${@row_count} 개", // 데이터 행 수를 갖는 stock param
        style: { fontWeight: "bold", color: "#555" }, // CSS 스타일 설정.
        renderer: { // 텍스트 렌더러가 기본 렌더러. 생략 가능.
          type: 'text',
        }
      }
    ],
  }
};
const row_template = {
  template: {
    layout: "vlinear",
    children: [{
      layout: "hlinear",
      width: "100%",
      children: [
        {
          field: "OILSTATN_NM", 
          style: { fontSize: "17px", fontWeight: "bold", color: "#555" },
        },
        {
          width: "*"
        },
        {
          field: "QTY",
          style: { fontSize: "14px", color: "#555" },
        }
      ],
      },
      {
        field: "LOCPLC_ROADNM_ADDR",
        style: { fontSize: "14px", color: "#777" },
      },
    ],
  },
  rowStyle: {
    created: {
      backgroundColor: 'lightgreen'
    },
    updated: {
      backgroundColor: 'yellow'
    },
  }
};

const config = {
  props: {
    templates: { // 키, 값 쌍으로 템플릿 등록
      row: row_template,
      footer: footer_template
    }
  },
  options: {
    row: {
      template: 'row', // props에서 등록한 템플릿 키 설정. row_template이 사용된.
    },
    rowBar: {
      visible: true, // rowBar 표시
      display: "order", // 순번으로 표현
    },
    footer: {
      template: 'footer', // props에서 등록한 템플릿 키 설정. footer_template이 사용됨.
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

  // 데이터 행 추가
  data.insertRow(0, {
    "OILSTATN_NM": "송파구청",
    "LOCPLC_ROADNM_ADDR": "서울 송파구 올림픽로 326",
    "TELNO": "02-2147-2000",
    "QTY": "100",
    "LAT": "37.5146107",
    "LOGT": "127.1060852",
    "DATA_STD_DTM": "2023-07-27  09:00:00 AM"
  });

  // 데이터 값 수정
  data.updateValue(1, 'QTY', 0);
}
