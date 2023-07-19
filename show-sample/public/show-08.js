function init() {
  let data, list;

  // default footer를 먼저 소개하기 때문에 사용자 footer template은 추 후 작성한다.

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

  const footer = {
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
          value: '${@max.mkp;;#,##0.00}',
          style: { color: 'red' },
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
          field: 'mkp',
          renderer: {
            prefix: '시장가격: ',
          },
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
        footer: footer,
      },
    },
    options: {
      header: true,
      row: {
        template: 'row',
      },
      footer: {},
      //   footer: {
      //     template: 'footer',
      //   },
    },
  };

  $.ajax({
    url: './data/sample-01.json',
    method: 'GET',
    dataType: 'json',
  }).done((json) => {
    data = RealTouch.createListData('data', {}, json);
    list = RealTouch.createListControl(document, 'realtouch');
    list.setConfig(config);
    list.data = data;
  });

  window.next = () => {
    window.location.href = './show-09.html';
  };
}
