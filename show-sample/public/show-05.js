function init() {
  let data, list;

  // 수평모드
  // config부분과 rowStyle부분만 작성한다.

  const row_template = {
    template: {
      layout: 'vlinear',
      children: [
        {
          field: 'itmsNm',
          width: "150px",
          style: {
            fontSize: '24px',
            fontWeight: 'bold',
            padding: '10px 15px',
          },
        },
        {
          field: 'mrktCtg',
          style: {
            paddingBottom: '20px',
          },
        },
        {
          field: 'basDt',
          style: {
            paddingBottom: '20px',
          },
        },
        {
          value: '시장 시작 가격',
        },
        {
          field: 'mkp',
          renderer: {
            suffix: '원',
          },
          style: {
            paddingBottom: '20px',
          },
        },
        {
          value: '전날 대비 등락',
        },
        {
          field: 'vs',
          renderer: {
            suffix: '원',
          },
          style: {
            paddingBottom: '20px',
          },
        },
        {
          value: '시장 마감 가격',
        },
        {
          field: 'clpr',
          renderer: {
            suffix: '원',
          },
          style: {
            paddingBottom: '20px',
          },
        },
      ],
    },
    rowStyle: {
      callback: (args) => {
        const value = args.data.getValue(args.row, 'vs');
        if (value > 0) {
          return { backgroundColor: '#ffcdd2' };
        } else if (value < 0) {
          return { backgroundColor: '#bbdefb' };
        } else {
          return { backgroundColor: '#ffffff' };
        }
      },
    },
  };

  const config = {
    props: {
      templates: {
        row: row_template,
      },
    },
    options: {
      orientation: 'horizontal',
      row: {
        template: 'row',
      },
    },
  };

  $.ajax({
    url: '../data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    data = RealTouch.createListData('data', null, json);
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
  });
}
// 수평 모드
// https://touch.realgrid.com/demo/no-scroll.html
// https://touch.realgrid.com/demo/premode.html - 개발자모드에서 - 행 element 보여주기
