function init() {
  let data, list;

  // default header를 먼저 소개하기 때문에 사용자 header template은 추 후 작성한다.

  // defualt header
  const it_list_header = {
    name: '@it_list_header',
    description: 'List header template',
    props: {},
    template: {
      layout: 'hlinear',
      style: '${@style}',
      children: [
        {
          value: '${@caption;Header}',
          tag: 'caption',
          width: '*',
          style: {
            textAlign: '${@caption-align}',
            fontWeight: 'bold',
            color: '${@caption-color;#333}',
          },
        },
      ],
    },
  };

  const header = {
    template: {
      layout: 'vlinear',
      itemGap: 10,
      children: [
        {
          value: '사용자 지정 Header Template',
          left: 10,
        },
      ],
    },
  };

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

  const menu = {
    items: [
      {
        id: 'item_01',
        label: '메뉴 항목 1',
        onClick: (control, item) => {
          alert('메뉴 항목 1');
          return true;
        },
      },
      {
        id: 'item_02',
        label: '메뉴 항목 2',
        onClick: (control, item) => {
          alert('메뉴 항목 2');
          return true;
        },
      },
      {
        id: 'check_01',
        type: 'check',
        label: '체크 아이템 1',
        checked: true,
        onClick: (control, item) => {},
      },
      {
        id: 'check_02',
        type: 'check',
        label: '체크 아이템 2',
      },
      {
        id: 'radio_01',
        type: 'radio',
        label: 'Radio 아이템 1',
        checked: true,
      },
      {
        id: 'radio_02',
        type: 'radio',
        label: 'Radio 아이템 2',
      },
      {
        id: 'radio_03',
        type: 'radio',
        label: 'Radio 아이템 3',
      },
    ],
  };

  const config = {
    props: {
      templates: {
        row: row_template,
        header: header,
      },
      menus: {
        menu: menu,
      },
    },
    options: {
      row: {
        template: 'row',
      },
      header: {
        visible: true,
        // caption: '헤더',
        captionAlign: 'center',
      },
      //   header: {
      //     visible: true,
      //     template: 'header',
      //     buttons: [
      //       {
      //         shape: '@menu',
      //         onClick: (args) => {
      //           args.control.showMenu(menu);
      //         },
      //       },
      //     ],
      //   },
      menu: 'menu',
      buttonPanel: {
        buttons: [
          {
            label: '메세지',
            imageUrl: '../asset/images/google/chat.png', // call mail
            imageWidth: 24,
            onClick: () => alert('hello?'),
          },
        ],
      },
    },
  };

  $.ajax({
    url: './data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    data = RealTouch.createListData('data', {}, json).createView('view', {
      filter: {
        filters: [
          {
            name: 'f_up',
            label: '상승 종목',
            enabled: false,
            filter: (row, values) => +values['vs'] > 0,
          },
          {
            name: 'f_down',
            label: '하락 종목',
            enabled: false,
            filter: (row, values) => +values['vs'] < 0,
          },
        ],
      },
    });
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
  });

  window.next = () => {
    window.location.href = './show-08.html';
  };
}
