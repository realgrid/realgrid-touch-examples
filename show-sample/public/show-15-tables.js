// 수평모드에서 table 변경을 위해 landscape 추가
// landscape: {
//     rowType: "table",
//     table: "table2",
//     row: {
//         template: "row"
//     }
// }
function init() {
  let data, list;
  const table = {
    colCount: 3,
    minWidth: '100%',
    columns: [70, 70, { width: 80, grow: 1 }],
  };

  const table2 = {
    colCount: 5,
    minWidth: '100%',
    columns: [70, 70, 80, 80, { width: 80, grow: 1 }],
  };

  const row_template = {
    template: {
      cells: [
        {
          field: 'SIGUN_NM',
          header: '시군',
        },
        {
          field: 'DIV',
          header: {
            renderer: {
              type: 'field',
              label: '구분',
            },
          },
        },
        {
          field: 'ENTRPS_NM',
          renderer: {
            wrap: true,
          },
          style: {
            fontWeight: 'bold',
            color: '#55f',
          },
          header: '품명 / 품목',
        },
        {
          field: 'PRODLST_NM',
          header: '품목',
        },
        {
          field: 'TELNO',
          header: '연략처',
        },
      ],
    },
    rowStyle: {
      fontSize: '15px',
      checked: {
        backgroundColor: '#0088ff20',
      },
    },
  };

  const config = {
    props: {
      templates: {
        row: row_template,
      },
      tables: {
        table: table,
        table2: table2,
      },
    },
    options: {
      rowType: 'table',
      table: 'table',
      row: {
        template: 'row',
        commands: ['@info', '@delete'],
        clickable: true,
        swipeAction: 'none',
        longPressAction: 'command',
      },
      header: {
        visible: true,
        caption: '경기도 특산품 현황',
        style: {
          padding: '10px',
        },
      },
      landscape: {
        rowType: 'table',
        table: 'table2',
        row: {
          template: 'row',
        },
      },
    },
  };

  $.ajax({
    url: '../data/gyounggi-tuksanpum.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    window.oncontextmenu = function () {
      return false;
    };
    data = RealTouch.createListData('master', null, json)
      .createView('view')
      .build();
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
  });
}
