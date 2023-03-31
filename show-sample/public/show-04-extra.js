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
    extra: {
      layout: 'vlinear',
      children: [
        {
          space: '10',
        },
        {
          renderer: {
            type: 'shape',
            shape: '@down',
          },
        },
        {
          space: '10',
        },
        {
          field: 'itmsNm',
          value: '${@value} 검색하기',
          renderer: {
            type: 'link',
            linkField: 'itmsNm',
            root: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=',
            style: {
              textDecoration: 'none',
            },
          },
          style: {
            padding: '15px',
            border: '1px solid black',
            borderRadius: '4px',
          },
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

  const config = {
    props: {
      numberFormat: ',',
      templates: {
        row: row_template,
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
      },
      header: {
        visible: true,
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
