var data; // RtListData를 담을 변수. debug에 용이하도록 전역 변수로 설정함.
var list; // RtListControl을 담을 변수. debug에 용이하도록 전역 변수로 설정함.

const footer_template = {
  template: {
    layout: "hlinear", // 수평 레이아웃 설정
    children: [{ 
        value: "%{@row_count} 개", // 데이터 행 수를 갖는 stock param
        style: { fontWeight: "bold", color: "#555" }, // CSS 스타일 설정.
        renderer: { // 텍스트 렌더러가 기본 렌더러. 생략 가능.
          type: 'text',
        }
      }
    ],
  },
};
const row_template = {
  template: {
    layout: "vlinear", // 수직 레이아웃 설정
    children: [
      {
        // 수직 레이아웃 Child #1
        layout: "hlinear", // 수평 레이아웃 설정
        width: "100%",
        children: [
          // 수평 레이아웃 Child #1
          {
            field: "OILSTATN_NM", // 데이터 필드명을 설정하여 바인딩 한다.; 주요소 이름
            style: { fontSize: "17px", fontWeight: "bold", color: "#555" },
          },
          // 수평 레이아웃 Child #2
          {
            width: "*"
          },
          // 수평 레이아웃 Child #3
          {
            field: "QTY", // 요소수 수량
            style: { fontSize: "14px", color: "#555", fontWeight: 500 },
            renderer: {
              style: {
                color: "${qtyColor}"
              }
            }
          }
        ]
      },
      // 수직 레이아웃 Child #2
      {
        field: "LOCPLC_ROADNM_ADDR", // 주요소 주소
        style: { fontSize: "14px", color: "#777" },
      },
    ],
  },
  params: {
    qtyColor: ({value}) => {
      return value >= 3000 ? 'limegreen' : 'orange'
    }
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
}
