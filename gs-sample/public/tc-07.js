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
          space: "*",
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
    },
    rowBar: { // Row Bar 설정 모델
      visible: true, // 표시 여부 설정
      display: "order", // 행 앞에 번호를 표기하는 설정
    },
    footer: { // 푸터 설정 모델
      template: "footer" // 푸터 레이아웃 생성에 사용된느 템플릿 이름 등록
    },
    header: {// header 설정 모델
      visible: true, // 표시 여부 설정
      caption: "데이터 필터", // header 캡션 설정
      buttons: [{ // header섹션에 버튼 추가 설정
        label: "필터적용", // 버튼에 표시되는 텍스트 설정
        onClick: ({control}) => { // 버튼 클릭시 호출되는 콜백 등록
          control.data.enableFilter('filter1', true, true); // 필터를 적용
        }
      }, {
        label: "필터해제",
        onClick: ({control}) => {
          control.data.enableFilter('filter1', false, true); // 필터적용을 해제
        }
      }]
    }
  },
};

async function createListData(dataurl, callback) {
  try {
    const res = await fetch(dataurl);
    const json = await res.json();

    data = RealTouch.createListData("", {}, { values: json })
      .createView('dataview',  { 
        filter: { // 필터 등록
          name: 'filter1', // 필터셋 이름.
          label: '남은수량 2500개 이상', // 필터 패널 등에서 필터를 표시하는 이름설정
          enabled: false, // 필터 활성화 여부.
          filter: (row, values) => +values['QTY'] >= 2500 // 필터 콜백 지정
        }
    });
    callback && callback(data);
  } catch (error) {
    console.error(error);
  }
}

function init() {
  createListData("./data/yososu.json", (data) => {
    list = RealTouch.createListControl(document, "realtouch");
    list.setConfig(config);
    list.data = data;
  });
}
