var data;
var list;

const footer_template = {
  template: {
    layout: "hlinear",
    children: [
      {
        value: "${@row_count} 개",
        style: { fontWeight: "bold", color: "#555" },
      },
    ],
  },
};

const master_template = {
  template: {
    layout: "hlinear",
    children: [
      {
        field: "SIGUN_NM",
        left: 0,
        style: {
          fontSize: "17px",
          fontWeight: "bold",
          color: "#555",
        },
      },
    ],
  },
};

const detail_template = {
  template: {
    layout: "vlinear",
    children: [
      {
        layout: "hlinear",
        left: 0,
        children: [
          {
            field: "SIGUN_NM",
            style: { fontSize: "14px" },
          },
          {
            field: "DIV",
            style: {
              fontSize: "16px",
              color: "#55f",
            },
          },
        ],
      },
      {
        layout: "hlinear",
        left: 0,
        width: "100%",
        children: [
          {
            field: "ENTRPS_NM",
            style: {
              fontSize: "15px",
              fontWeight: "bold",
              color: "#555",
            },
          },
          {
            field: "PRODLST_NM",
            style: {
              fontSize: "14px",
              color: "#777",
            },
          },
          {
            width: "*"
          },
          {
            field: "TELNO",
            style: {
              fontSize: "14px",
              color: "#777",
            },
          },
        ],
      },
    ],
  },
};

const config = {
  props: {
    templates: {
      // 템플릿 등록
      master: master_template,
      detail: detail_template,
      footer: footer_template,
    },
  },
  options: {
    row: {
      // 데이터행 설정 모델
      template: "detail", // 데이터행 레이아웃 생성에 사용되는 템플릿 이름 등록
    },
    rowInfos: { // 데이터소스별로 설정하는 데이터행 구성 목록
      master: { template: "master" }, // 모든 데이터소스에 대한 기본 데이터행 설정 정보
    },
    footer: {
      // 푸터 설정 모델
      template: "footer", // 푸터 레이아웃 생성에 사용되는 템플릿 이름 등록
    },
  },
};

async function createListData(dataurls) {
  const masterRes = await fetch(dataurls[0]);
  let json = await masterRes.json();
  const master = RealTouch.createListData("master", null, json) // 마스터 listData 생성
    .createView("master")
    .sort(["SIGUN_NM"], true);
  
  const detailRes = await fetch(dataurls[1]);
  json = await detailRes.json();
  const detail = RealTouch.createListData("detail", null, json) // 디테일 listData 생성
    .createView("detail")
    .sort(["SIGUN_NM"], true);

  return RealTouch.createDataLink("main", master, { // 다중 데이터 뷰 생성
    data: detail,
    keyFields: ["SIGUN_NM"],
  });
}

async function init() {
  data = await createListData(
    ["../data/gyounggi.json", "../data/gyounggi-tuksanpum.json"]
  );
  list = RealTouch.createListControl(document, "realtouch");
  list.setConfig(config);
  list.data = data;
  list.dataGroupBy();
}
