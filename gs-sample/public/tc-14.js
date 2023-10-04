var data; // RtListData를 담을 변수. debug에 용이하도록 전역 변수로 설정함.
var list; // RtListControl을 담을 변수. debug에 용이하도록 전역 변수로 설정함.

// 리스트 푸터 템플릿
const footer_template = {
  template: {
    layout: "hlinear", // 수평 레이아웃 설정
    children: [
      {
        value: "${@row_count} 개", // 데이터 행 수를 갖는 stock param
        style: { fontWeight: "bold", color: "#555" }, // CSS 스타일 설정.
        renderer: {
          // 텍스트 렌더러가 기본 렌더러. 생략 가능.
          type: "text",
        },
      },
    ],
  },
};
// 데이터 로우 템플릿
const row_template = {
  template: {
    layout: "vlinear", // 수직 레이아웃 설정
    children: [
      {
        // 수직 레이아웃 Child #1
        layout: "hlinear", // 수평 레이아웃 설정
        width: "100%",
        height: 70,
        itemsAlign: "bottom",
        children: [
          // 수평 레이아웃 Child #1
          {
            field: "OILSTATN_NM", // 데이터 필드명을 설정하여 바인딩 한다.; 주요소 이름
            style: { fontSize: "17px", fontWeight: "bold", color: "#555" },
          },
          // 수평 레이아웃 Child #2
          {
            field: "QTY", // 요소수 수량
            style: { fontSize: "14px", color: "#555" },
          },
        ],
      },
      // 수직 레이아웃 Child #2
      {
        field: "LOCPLC_ROADNM_ADDR", // 주요소 주소
        style: { fontSize: "14px", color: "#777" },
      },
      {
        field: "DATA_STD_DTM", // 주요소 주소
        style: { fontSize: "14px", color: "#777" },
      },
    ],
  },
};

const header_template = {
  template: {
    layout: "hlinear",
    children: [
      {
        id: "title",
        value: "헤더영역",
      },
      {
        id: "title2",
        value: "",
      },
      {
        width: "*",
      },
      {
        editor: {
          onChange: (args) => {
            args.ctx.setValue(
              "title2",
              args.ctx.getValue("title") + args.editValue
            );
          },
        },
      },
    ],
  },
};

const config = {
  props: {
    templates: {
      // 키, 값 쌍으로 템플릿 등록
      row: row_template,
      footer: footer_template,
      header: header_template,
    },
  },
  options: {
    row: {
      // 데이터 로우 영역 모델 설정.
      template: "row", // props에서 등록한 템플릿 키 설정. row_template이 사용된.
    },
    rowBar: {
      visible: true, // rowBar 표시
      display: "order", // 순번으로 표현
    },
    footer: {
      // 리스트 푸터 영역 모델 설정.
      template: "footer", // props에서 등록한 템플릿 키 설정. footer_template이 사용됨.
    },
    header: {
      visible: true,
      template: "header",
    },
  },
};

async function createListData(dataurl) {
  try {
    const res = await fetch(dataurl);
    const json = (await res.json()).map((d) => {
      d["DATA_STD_DTM"] = d["DATA_STD_DTM"].substring(
        0,
        d["DATA_STD_DTM"].length - 3
      );
      return d;
    });

    // RtListData 생성
    return RealTouch.createListData(
      "",
      {
        fields: [
          { name: "OILSTATN_NM", label: "주유소 명" },
          { name: "LOCPLC_ROADNM_ADDR", label: "도로명 주소" },
          { name: "TELNO", label: "전화 번호" },
          { name: "QTY", label: "수량", type: "bigint" },
          { name: "LAT", label: "위도", type: "number" },
          { name: "LOGT", label: "경도", type: "number" },
          { name: "DATA_STD_DTM", type: "date", label: "데이터 입력 일시" },
        ],
      },
      { values: json }
    );
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  data = await createListData("./data/yososu.json");
  // id가 'realtouch'인 Dom에 리스트 뷰를 생성하고 RtListControl을 리턴.
  list = RealTouch.createListControl(document, "realtouch");
  list.setConfig(config);
  list.data = data;
}
