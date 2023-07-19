// config.options.FilterPanel 및 헤더에 버튼 추가

function init() {
  let data, list;
  const row_template = {
    template: {
      layout: 'hflex',
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
        buttons: [
          {
            label: '필터 패널',
            onClick: () => {
              list.showFilterPanel();
            },
          },
        ],
      },
      filterPanel: {
        position: 'right',
        autoApply: false,
        autoClose: false,
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
    }).createView('view', {
      filter: {
        filters: [
          {
            name: 'A',
            label: '상승 종목',
            enabled: false,
            filter: (row, values) => values['vs'] > 0,
          },
          {
            name: 'B',
            label: '하락 종목',
            enabled: false,
            filter: (row, values) => values['vs'] < 0,
          },
        ],
      },
    });
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
    window.list = list;
  });

  window.next = () => {
    window.location.href = './show-13.html';
  };
}
