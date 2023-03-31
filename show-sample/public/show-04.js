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

// default footer
const it_list_footer = {
  name: '@it_list_footer',
  description: 'List footer template',
  props: {},
  template: {
    layout: 'hlinear',
    children: [
      {
        value: 'Σ',
        style: { fontSize: '19px' },
        tag: 'sigma',
      },
      {
        width: '*',
        renderer: 'spacer',
        tag: 'spacer',
      },
      {
        value: '${@row_count}',
        tag: 'count',
      },
      {
        value: ' rows.',
        tag: 'rows',
      },
    ],
  },
};

// template을 직접 작성한다.

// detail, extra, collapsed 소개가 끝난 후 header 와 footer template을 작성한다.
const header_template = {
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
const footer_template = {
  template: {
    layout: 'hlinear',
    children: [
      {
        value: '${@row_count}',
        tag: 'count',
      },
      {
        value: ' rows.',
        tag: 'rows',
      },
      {
        space: '*',
      },
      {
        // summary param
        value: '${@avg.mkp;;#,##0.00}',
        style: { color: 'red' },
      },
    ],
  },
};

// 각각 config.props.templates 와 config.options.header, footer에 등록한다.
function init() {
  let data, list;

  const row_template = {
    vars: {
      'num-size': '18px',
      won: '원',
    },
    // 기본 row => row2
    template: row,
    params: {
      'mkp-color': (args) => {
        return args.values.clpr - args.values.mkp >= 0 ? 'red' : 'blue';
      },
    },
    rowStyle: {
      alternate: {
        backgroundColor: '#fafafa',
      },
      checked: {
        backgroundColor: '#bbdefb',
      },
    },
  };

  const config = {
    props: {
      numberFormat: ',',
      templates: {
        row: row_template,
        header_template,
        footer_template,
      },
      onRowClick: (args) => {
        const isChecked = args.control.isRowChecked(args.row);
        args.control.checkRow(args.row, !isChecked);
        return true;
      },
    },
    options: {
      row: {
        template: 'row',
      },
      header: {
        visible: true,
        caption: '헤더',
        captionAlign: 'center',
        // template: "header_template"
      },
      footer: {
        visible: true,
        // template: "footer_template"
      },
    },
  };

  $.ajax({
    url: '../data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    data = RealTouch.createListData('data', null, {
      values: json,
      reader: (props, value) => {
        return props === 'vs' ? value + '' : value;
      },
    });
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
    window.list = list;
  });

  window.skeleton = () => {
    window.location.href = '../demo/skeleton-view.html';
  };
  window.detail = () => {
    window.location.href = './show-04-detail.html';
  };
  window.extra = () => {
    window.location.href = './show-04-extra.html';
  };
  window.collapsed = () => {
    window.location.href = './show-04-collapsed.html';
  };
  window.multi = () => {
    window.location.href = './show-04-multi.html';
  };
  window.table = () => {
    window.location.href = './show-04-table.html';
  };
  window.next = () => {
    window.location.href = '../demo/landscape-horz.html';
  };
}

const row = {
  layout: 'hlinear',
  width: '100%',
  children: [
    {
      type: 'field',
      field: 'itmsNm',
    },
    {
      value: '-',
    },
    {
      field: 'mrktCtg',
      value: '${@value}',
    },
    {
      space: '*',
    },
    {
      fields: ['mkp', 'lopr', 'hipr', 'clpr'],
      width: 100,
      height: 30,
      renderer: {
        type: 'sparkbar',
        maxStyle: {
          fill: '#283593',
        },
        minStyle: {
          fill: '#ff1744',
        },
      },
    },
  ],
};

const row2 = {
  layout: 'vlinear',
  children: [
    {
      layout: 'hlinear',
      itemGap: 20,
      width: '100%',
      children: [
        {
          field: 'itmsNm',
          value: '${@value}',
          renderer: {
            style: {
              color: 'red',
            },
          },
        },
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
          fields: ['mkp', 'lopr', 'hipr', 'clpr'],
          width: 100,
          height: 30,
          renderer: {
            type: 'sparkbar',
            maxStyle: {
              fill: '#283593',
            },
            minStyle: {
              fill: '#ff1744',
            },
          },
        },
      ],
    },
    {
      layout: 'hlinear',
      width: '100%',
      children: [
        {
          field: 'mkp',
          left: 0,
          renderer: {
            prefix: '시장 최초가 : ',
            suffix: '--won',
          },
          style: {
            color: '${mkp-color}',
            fontSize: '--num-size',
          },
        },
        {
          space: '*',
        },
        {
          field: 'clpr',
          renderer: {
            prefix: '시장 마감가 : ',
            suffix: '--won',
          },
          style: {
            color: '${mkp-color}',
            fontSize: '--num-size',
          },
        },
      ],
    },
    {
      layout: 'hlinear',
      width: '100%',
      children: [
        {
          field: 'hipr',
          left: 0,
          renderer: {
            prefix: '시장 최고가 : ',
            suffix: '--won',
            numberFormatter: '${formatter}',
          },
          style: {
            color: '${mkp-color}',
            fontSize: '--num-size',
          },
        },
        {
          space: '*',
        },
        {
          field: 'lopr',
          renderer: {
            prefix: '시장 최저가 : ',
            suffix: '--won',
          },
          style: {
            color: '${mkp-color}',
            fontSize: '--num-size',
          },
        },
      ],
    },
  ],
};
