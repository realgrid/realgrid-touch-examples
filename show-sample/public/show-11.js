// searching
// 아래 searchBar를 추가한다.
//

function init() {
  let data, list;
  const row_template = {
    template: {
      layout: 'hlinear',
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
          type: 'field',
          field: 'clpr',
          renderer: {
            suffix: '원',
          },
        },
      ],
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
        styleCallback: (args) => {
          const val = list.data.getValue(args.row, 'vs');
          if (val > 0) {
            return {
              color: '#ff1744',
            };
          } else if (val < 0) {
            return {
              color: '#2979ff',
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
        caption: '패널 열기',
        captionAlign: 'center',
        clickAction: 'search',
        buttons: [
          {
            label: ' searchBar',
            onClick: (args) => {
              args.control.current.searchBar.visible =
                !args.control.current.searchBar.visible;
            },
          },
        ],
      },
      searchBar: {
        visible: false,
      },
      searchResultBar: {
        position: 'after',
      },
    },
  };

  $.ajax({
    url: './data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    data = RealTouch.createListData(
      'data',
      {
        fields: [
          {
            name: 'itmsNm',
          },
          {
            name: 'mrktCtg',
          },
          {
            name: 'clpr',
          },
          {
            name: 'vs',
          },
        ],
      },
      json
    );
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
    window.list = list;
  });

  window.next = () => {
    window.location.href = './show-12-01.html';
  };
}
