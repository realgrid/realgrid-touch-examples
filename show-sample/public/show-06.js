function init() {
  let data, list;

  const row_template = {
    template: {
      layout: 'hlinear',
      children: [
        'itmsNm',
        {
          value: '-',
        },
        {
          field: 'mrktCtg',
        },
        {
          space: '*',
        },
        {
          type: 'field',
          fields: ['clpr', 'hipr', 'lopr'],
        },
      ],
    },
    rowStyle: {
      checked: {
        backgroundColor: 'skyblue',
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
      row: {
        template: 'row',
      },
      editBar: {
        visible: true,
        action: "delete",
        link: {
          url: 'http://daum.net',
        },
        custom: {
          label: 'check',
          onClick: (args) => {
            // list.checkRow(args.row, !list.isRowChecked(args.row));
            alert('Custom!');
          },
        },
      },
      rowBar: {
        visible: false,
        display: 'order',
        order: {
          suffix: ' .',
        },
        button: {
          label: 'editBar',
          onClick: () => {
            console.log(list);
            list.options.editBar.visible = !list.options.editBar.visible;
          },
        },
        shape: {
          shape: '@circle',
          shapeCallback: (args) => {
            const shapes = ['@star', '@circle', '@drag'];
            return shapes[args.row % shapes.length];
          },
          styleCallback: (args) => {
            const colors = ['shape-red', 'shape-blue', 'shape-orange'];
            return colors[args.row % colors.length];
          },
        },
        image: {
          imageUrl: '../asset/images/admob.png',
        },
      },
      header: {
        visible: true,
        buttons: [
          {
            shape: '@delete',
            onClick: (args) => {
              const rows = list.getCheckedRows();
              data.deleteRows(rows);
            },
          },
        ],
      },
    },
  };

  $.ajax({
    url: '../data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    data = RealTouch.createListData('data', {}, json);
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
    window.list = list;
  });

  window.next = () => {
    window.location.href = './show-07.html';
  };
}
