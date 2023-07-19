// master / detail => 일반행으로 변경
function init() {
  let master, detail, data, list;
  const master_template = {
    template: {
      layout: 'hlinear',
      children: [
        {
          field: 'SIGUN_NM',
          left: 0,
          style: {
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#555',
          },
        },
      ],
    },
    rowStyle: {
      backgroundColor: '#efefef',
    },
  };

  const table = {
    colCount: 4,
    minWidth: '100%',
    columns: [80, 100, 80, { width: 100, grow: 1 }],
  };

  const detail_template = {
    template: {
      cells: [
        {
          field: 'DIV',
          header: {
            renderer: {
              type: 'field',
              label: '구분',
            },
          },
        },
        {
          field: 'ENTRPS_NM',
          renderer: {
            wrap: true,
          },
          style: {
            fontWeight: 'bold',
            color: '#55f',
          },
          header: '품명',
        },
        {
          field: 'PRODLST_NM',
          header: '품목',
        },
        {
          field: 'TELNO',
          header: '연략처',
        },
      ],
    },
    rowStyle: {
      fontSize: '15px',
      checked: {
        backgroundColor: '#0088ff20',
      },
    },
  };

  const config = {
    props: {
      templates: {
        detail: detail_template,
        master: master_template,
      },
      tables: {
        table: table,
      },
    },
    options: {
      rowType: 'table',
      table: 'table',
      row: {
        template: 'detail',
        commands: ['@info', '@delete'],
        clickable: true,
      },
      rowInfos: {
        master: { template: 'master' },
      },
      header: {
        visible: true,
        caption: '경기도 특산품 현황',
        style: {
          padding: '10px',
        },
      },
    },
  };

  $.ajax({
    url: './data/gyounggido.json',
    method: 'GET',
    dataType: 'json',
  }).done((masterData) => {
    master = RealTouch.createListData('master', null, masterData);
    $.ajax({
      url: './data/gyounggi-tuksanpum.json',
      method: 'GET',
      dataType: 'json',
    }).done((detailData) => {
      detail = RealTouch.createListData('detail', null, detailData);
      data = RealTouch.createDataLink('main', master, {
        data: detail,
        keyFields: ['SIGUN_NM'],
      });
      list = RealTouch.createListControl(document, 'realtouch');
      list.setConfig(config);
      list.data = data;
      list.dataGroupBy({});
    });
  });
}
