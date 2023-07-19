// 데이터 불러오는 부분만 남겨둔 후, table, row_template, config를 작성한다.

function init() {
  let master, detail, data, list;
  const table = {
    colCount: 5,
    minWidth: '100%',
    columns: [120, 120, 120, 120, { width: 120, grow: 1 }],
    header: {
      sortOrderVisible: false,
      // sortMarkVisible: false,
    },
  };

  const row_template = {
    template: {
      cells: [
        {
          field: 'SIGUN_NM',
          header: {
            renderer: {
              label: '시군',
              orderVisible: false,
              // markVisible: false,
            },
          },
          footer: {
            value: '${@count}건',
            align: 'right',
          },
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
          header: '품명',
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

  const menu = {
    items: [
      {
        id: 'item_01',
        label: '시군 정렬',
        onClick: (control, item) => {
          control.data.sort({ field: 'SIGUN_NM', dir: 'descending' }).build();
          return true;
        },
      },
    ],
  };

  const config = {
    props: {
      templates: {
        row: row_template,
      },
      tables: {
        table: table,
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
        buttons: [
          {
            shape: '@menu',
            onClick: (args) => {
              args.control.showMenu(menu);
            },
          },
        ],
      },
    },
  };

  $.ajax({
    url: './data/gyounggi-tuksanpum.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    window.oncontextmenu = function () {
      return false;
    };
    data = RealTouch.createListData('data', null, json).createView('view');
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
  });

  window.layouts = () => {
    window.location.href = './show-15-layouts.html';
  };
  window.tables = () => {
    window.location.href = './show-15-tables.html';
  };
  window.detail = () => {
    window.location.href = './show-15-detail.html';
  };
  window.masterDetail = () => {
    window.location.href = './show-15-master-detail.html';
  };
}
