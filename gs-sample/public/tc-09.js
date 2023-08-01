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
      layout: 'vlinear',
      children: [{
          layout: 'hlinear',
          children: [{
              field: 'SIGUN_NM',
              style: {
                  fontSize: '17px',
                  fontWeight: 'bold',
                  color: '#555'
              },
          }, {
              field: 'DIV',
              style: {
                  fontSize: '15px',
                  color: '#55f'
              },
          }]
      }, {
          layout: 'hlinear',
          width: '100%',
          children: [{
              field: 'ENTRPS_NM',
              style: {
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#555'
              },
          }, {
              field: 'PRODLST_NM',
              style: {
                  fontSize: '14px',
                  color: '#777'
              }
          }, {
              space: '*'
          }, {
              field: 'TELNO',
              style: {
                  fontSize: '14px',
                  color: '#797'
              }
          }]
      }]
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
      template: "footer" // 푸터 레이아웃 생성에 사용되는 템플릿 이름 등록
    },
  },
};

async function createListData(dataurl, callback) {
  try {
    const res = await fetch(dataurl);
    const json = await res.json();

    data = RealTouch.createListData("", {}, { values: json })
      .createView('dataview',  {})
      .sort(['SIGUN_NM']) // 그룹핑 기준으로 정렬
      .build();
    callback && callback(data);
  } catch (error) {
    console.error(error);
  }
}

function init() {
  createListData("./data/gyounggi-tuksanpum.json", (data) => {
    list = RealTouch.createListControl(document, "realtouch");
    list.setConfig(config);
    list.data = data;
    list.rowGroupBy(['SIGUN_NM']); // '시군'필드를 기준으로 행그룹핑 설정
  });
}
