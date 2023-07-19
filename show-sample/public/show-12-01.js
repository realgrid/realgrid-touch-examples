// config.options.fieldBar를 작성한다.
// fieldBar: {
//     visible: false,
//     fields: ["mkp", "itmsNm"]
// },
function init() {
  var data, list;
  // Sorting
  const row_template = {
    template: {
      layout: 'vlinear',
      itemsAlign: "center",
      children: [
        {
          layout: 'hlinear',
          children: [
            {
              field: 'itmsNm',
            },
            {
              space: '*',
            },
            {
              field: 'mrktCtg',
            },
          ],
        },
        {
          layout: 'hlinear',
          children: [
            {
              layout: 'vlinear',
              children: [
                {
                  field: 'mkp',
                  renderer: {
                    numberFormat: ',',
                    prefix: '최초 가격 : ',
                    suffix: '원',
                    numberFormatter: (value) => {
                      return value * 100;
                    },
                  },
                },
                {
                  field: 'mkp',
                  renderer: {
                    type: 'meter',
                    maxValue: '1000',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };
  const menu = {
    origin: 'right',
    items: [
      {
        id: 'check_01',
        type: 'check',
        label: '필드바 표시여부',
        checked: false,
        onClick: (control, item) => {
          control.options.fieldBar.visible = !control.options.fieldBar.visible;
          control.closeMenu(menu);
        },
      },
      {
        id: 'check_02',
        type: 'check',
        label: 'sortMarkVisible 표시',
        checked: true,
        onClick: (control, item) => {
          control.options.fieldBar.sortMarkVisible =
            !control.options.fieldBar.sortMarkVisible;
        },
      },
      {
        id: 'check_03',
        type: 'check',
        label: 'sortOrderVisible 표시',
        checked: true,
        onClick: (control, item) => {
          control.options.fieldBar.sortOrderVisible =
            !control.options.fieldBar.sortOrderVisible;
        },
      },
    ],
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
        commands: ['@info', '@delete'],
      },
      header: {
        visible: true,
        buttons: [
          {
            shape: '@menu',
            onClick: (args) => {
              args.control.showMenu(menu);
            },
          },
        ],
      },
      fieldBar: {
        fields: ['mkp', 'itmsNm'],
        sortOrderVisible: true,
        sortMarkVisible: true,
      },
    },
  };
  $.ajax({
    url: './data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    const reader = (prop, value) => {
      if (prop === 'mkp') {
        return Number(value) / 100;
      }
      return value;
    };
    data = RealTouch.createListData('data', {}, { values: json, reader })
      .createView('view')
      .slice('f1', [0, 100])
      .sort({ field: 'mkp', dir: 'descending' })
      .build();
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
  });

  window.next = () => {
    window.location.href = './show-12-02.html';
  };
}
