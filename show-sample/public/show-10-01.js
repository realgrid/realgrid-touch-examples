// show-04가 완료된 후 해당 js를 가져온다.
// paging을 위해 setPaging을 호출
//         list.setPaging({
//             size: 5
//         })
// pageNavigator 추가
//             pageNavigator: {
//                 position: 'default'
//             },

function init() {
  let data, list;
  const row_template = {
    vars: {
      'num-size': '18px',
      won: '원',
    },
    template: {
      layout: 'vlinear',
      children: [
        {
          layout: 'hlinear',
          width: '100%',
          children: [
            {
              field: 'itmsNm',
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
          renderer: {
            type: 'spacer',
            space: '10',
          },
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
              },
              style: {
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
                fontSize: '--num-size',
              },
            },
          ],
        },
      ],
    },
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
        template: 'header_template',
      },
      footer: {
        template: 'footer_template',
      },
      pageNavigator: {
        position: 'default', // left, right, top, bottom
      },
    },
  };

  $.ajax({
    url: './data/sample-01.json',
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
    list.setPaging({
      size: 5,
    });

    window.list = list;
  });

  window.next = () => {
    window.location.href = './show-10-02.html';
  };
}
