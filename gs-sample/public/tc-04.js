var data;
var list;



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
  }
};

const edit_template = {
  template: {
    layout: "vlinear",
    children: [{
        layout: "hlinear",
        width: "100%",
        children: [{
          field: "OILSTATN_NM",
          editor: {
            placeholder: "주유소명",
          },
          style: { fontSize: "17px", fontWeight: "bold", color: "#555" },
        }, {
          width: "*"
        }, {
          field: "QTY",
          editor: {
            type: "number",
            placeholder: "보유 수량",
          },
          style: { fontSize: "14px", color: "#555" },
        }],
      }, {
        layout: "hlinear",
        width: "100%",
        children: [{
          field: "LOCPLC_ROADNM_ADDR",
          editor: {
            placeholder: "도로명 주소",
          },
          style: { fontSize: "14px", color: "#777" },
          renderer: {
            wrap: true,
          },
        }],
      }
    ],
  },
};

const config = {
  props: { // 
    templates: {
      row: row_template, 
      edit: edit_template
    },
  },
  options: {
    edit: { // 직접 행 편집 설정 모델
      template: "edit", // 편집모드 생성에 사용되는 템플릿 이름 등록
    },
    row: {  // 데이터행 설정 모델
      template: "row", // 데이터행 레이아웃 생성에 사용되는 템플릿 이름 등록
      focusable: true, // focused상태로 지정할 수 있도록 설정
    },
    rowBar: { // Row Bar 설정 모델
      visible: true, // 표시 여부 설정
      display: "order", // 행 앞에 번호를 표기하는 설정
    },
    header: { // header 설정 모델
      visible: true, // 표시 여부 설정
      caption: "데이터 편집", // header 캡션 설정
      buttons: [{ // header섹션에 버튼 추가 설정
        label: '추가', // 버튼에 포시되는 텍스트 설정
        action: 'append', // 버튼 클릭시 실행되는 action 설정
        style: { // 버튼에 적용되는 스타일 셋 
            color: 'green'
        }
      }, {
        label: "수정",
        action: "update"
      }, {
        label: '삭제',
        onClick: ({control}) => { // 버튼 클릭시 호출되는 콜백 등록
          if(control.focusedRow > -1){ // 현재 포커스행 확인 
            control.data.deleteRow(control.focusedRow); // 현재 포커스되어있는 행 삭제
          }
        },
        style: {
            color: 'red'
        }
      }]
    },
    footer: !false // footer 표시 여부 설정
  },
};

async function createListData(dataurl, callback) {
  try {
    const res = await fetch(dataurl);
    const json = await res.json();

    data = RealTouch.createListData("", {}, { values: json }) 
      .createEditableView("view", {}) 
      .build();
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
