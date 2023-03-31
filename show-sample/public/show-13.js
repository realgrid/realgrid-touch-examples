// 템플릿만 미리 생성해 두고 아래 코드는 직접 작성한다.
//

// 데이터 그룹핑시 아래 코드 추가
// list.dataGroupBy({});

// 페이징시 아래 코드 추가
// list.setPaging({level: 0});

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
            paddingLeft: '5px',
          },
        },
      ],
    },
    rowStyle: {
      backgroundColor: '#efefef',
    },
  };

  const detail_template = {
    template: {
      layout: 'vlinear',
      children: [
        {
          field: 'DIV',
          left: 0,
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#55f',
          },
        },
        {
          layout: 'hlinear',
          width: '100%',
          left: 0,
          children: [
            {
              field: 'PRODLST_NM',
              style: {
                fontSize: '18px',
              },
            },
            {
              field: 'ENTRPS_NM',
              renderer: {
                wrap: true,
                prefix: '( ',
                suffix: ' )',
              },
            },
            {
              space: '*',
            },
            {
              field: 'TELNO',
            },
          ],
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
    },
    options: {
      row: {
        template: 'detail',
        commands: ['@info', '@delete'],
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
      pageNavigator: {
        position: 'bottom',
      },
    },
  };
  $.ajax({
    url: '../data/gyounggido.json',
    method: 'GET',
    dataType: 'json',
  }).done((masterData) => {
    master = RealTouch.createListData('master', null, masterData);
    $.ajax({
      url: '../data/gyounggi-tuksanpum.json',
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
      window.list = list;
      list.dataGroupBy({});

      list.setPaging({ level: 0 });
    });
  });

  window.linkView = () => {
    window.location.href = '../demo/data-link.html';
  };
  window.next = () => {
    window.location.href = './show-14.html';
  };
}
