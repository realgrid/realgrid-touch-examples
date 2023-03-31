// group_header와 group_footer template을 작성한다.
// theme를 보여준다.
// rowGroup: {
//     theme: "classic"
// }

// config.options.rowGroup등록한다.

function init() {
  let data, list;
  const group_header = {
    template: {
      layout: 'hlinear',
      children: [
        {
          value: '일자 : ',
          style: {
            paddingLeft: '15px',
          },
        },
        {
          value: '${@group_value}',
          style: {
            fontWeight: 'bold',
          },
          tag: 'value',
        },
      ],
    },
    collapsed: {
      layout: 'hlinear',
      children: [
        {
          value: '${@group_value}',
          style: {
            paddingLeft: '15px',
            fontWeight: 'bold',
          },
        },
        {
          space: '*',
        },
        {
          value: '${@row_count}',
          style: {
            fontWeight: 'bold',
          },
          renderer: {
            prefix: '( ',
            suffix: '건 )',
          },
        },
      ],
    },
  };
  const sub_group_header = {
    template: {
      layout: 'hlinear',
      children: [
        {
          value: '전날 대비 상승 여부 : ${@group_value}',
          style: {
            paddingLeft: '15px',
          },
          renderer: {
            textFormatter: (value) => {
              var ret = '';
              if (value.split(':')[1].trim() === 'true') {
                ret = '전날 대비 상승';
              } else {
                ret = '전날 대비 하락';
              }
              return ret;
            },
          },
        },
      ],
    },
    collapsed: {
      layout: 'hlinear',
      children: [
        {
          value: '${@group_value}',
          style: {
            paddingLeft: '25px',
            fontWeight: 'bold',
          },
        },
        {
          space: '*',
        },
        {
          value: '${@row_count}',
          style: {
            fontWeight: 'bold',
          },
          renderer: {
            prefix: '( ',
            suffix: '건 )',
          },
        },
      ],
    },
  };
  const group_footer = {
    template: {
      layout: 'hlinear',
      children: [
        {
          space: '*',
        },
        {
          value: '${@row_count}',
          renderer: {
            suffix: '건. ',
          },
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
          field: 'basDt',
          renderer: {
            type: 'text',
            textFormatter: (value) => {
              return value.substr(6, 8) + '일';
            },
            prefix: '(',
            suffix: ')',
          },
        },
        {
          space: '*',
        },
        {
          type: 'field',
          field: 'clpr',
          renderer: {
            suffix: '원',
            numberFormat: '#,##0',
          },
        },
      ],
    },
  };

  const config = {
    props: {
      numberFormat: ',',
      templates: {
        row: row_template,
        group_header,
        group_footer,
        sub_group_header,
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
        clickAction: 'detail',
        styleCallback: (args) => {
          const val = list.data.getValue(args.row, 'vs');
          if (val < 0) {
            return {
              color: '#1976d2',
            };
          } else if (val > 0) {
            return {
              color: '#d32f2f',
            };
          } else {
            return {
              color: '#222222',
            };
          }
        },
      },
      header: {
        visible: true,
      },
      rowGroup: {
        header: {
          template: '',
        },
        footer: {
          template: 'group_footer',
        },
      },
    },
  };

  $.ajax({
    url: '../data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    json.forEach((e) => {
      e.vs > 0 ? (e.isup = true) : (e.isup = false);
    });
    data = RealTouch.createListData('data', null, {
      values: json,
      reader: (props, value) => {
        return props === 'vs' ? value + '' : value;
      },
    })
      .createView('view')
      .sort('itmsNm')
      .build();
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
    // 아래와 같이 그룹별로 헤더와 푸터 템플릿 지정이 가능하다.
    list.rowGroupBy([
      {
        field: 'basDt',
        header: {
          template: 'group_header',
        },
      },
      {
        field: 'isup',
        header: {
          template: 'sub_group_header',
        },
        footer: {
          visible: false,
        },
      },
    ]);
  });

  window.next = () => {
    window.location.href = './show-10-01.html';
  };
}
