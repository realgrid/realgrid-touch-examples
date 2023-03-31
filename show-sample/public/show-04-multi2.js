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

  const row_template2 = {
    template: {
      layout: 'vlinear',
      children: [
        {
          value: '${@itmsNm}',
          style: {
            fontSize: '24px',
          },
        },
        {
          field: 'vs',
          renderer: {
            type: 'text',
            textFormatter: (value) => {
              let str = '어제보다 ' + value + '원이 ';
              str += value > 0 ? '증가' : '감소';
              str += '하였습니다.';
              return str;
            },
            styleCallback: (args) => {
              if (args.value > 0) {
                return {
                  fontWeight: 'bold',
                  color: 'red',
                };
              } else if (args.value < 0) {
                return {
                  color: 'blue',
                };
              }
            },
          },
        },
      ],
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
        row2: row_template2,
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
        templateCallback: (args) => {
          return args.row % 2 ? 'row' : 'row2';
        },
      },
      header: {
        visible: true,
        template: 'header_template',
      },
      footer: {
        template: 'footer_template',
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
  });
}
