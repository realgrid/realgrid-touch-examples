// 기존 show-13 템플릿 가져옴
// 기본으로 제공되는 info_template과 edit_template을 보여준 후 아래 사용자 template을 작성한다.

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
      updated: {
        backgroundColor: '#00880018 ',
      },
    },
  };
  const edit_template = {
    template: {
      layout: 'vlinear',
      children: [
        {
          field: 'SIGUN_NM',
          left: 10,
          style: {
            paddingTop: '30px',
            paddingLeft: '10px',
            fontSize: '48px',
            fontWeight: 'bold',
          },
        },
        {
          space: '30',
        },
        {
          renderer: 'line',
          width: '90%',
        },
        {
          space: '30',
        },
        {
          layout: 'form',
          width: '90%',
          children: [
            {
              field: 'DIV',
              label: '구분',
              editor: {
                type: 'text'
              },
            },
            {
              field: 'ENTRPS_NM',
              label: '품명',
              editor: {
              },
            },
            {
              field: 'PRODLST_NM',
              label: '품목',
              editor: {
              },
            },
            {
              field: 'TELNO',
              label: '연락처',
              editor: {
              },
            },
          ],
        },
        {
          space: '30',
        },
        {
          renderer: 'line',
          width: '90%',
        },
        {
          layout: 'hlinear',
          style: {
            paddingTop: '15px',
          },
          children: [
            {
              renderer: {
                type: 'button',
                label: '저장',
                imageWidth: 32,
                imageUrl: '../asset/images/show/save.png',
                borderless: true,
                onClick: (args) => {
                  args.control.closeEditPage(true);
                },
                style: { fontSize: '13px', color: '#0088ff' },
              },
            },
            {
              space: 130,
            },
            {
              renderer: {
                type: 'button',
                label: '취소',
                // labelPosition: 'top',
                imageWidth: 32,
                imageUrl: '../asset/images/show/cancel.png',
                borderless: true,
                onClick: (args) => args.control.closeEditPage(false),
                style: { fontSize: '13px', color: '#0088ff' },
              },
            },
          ],
        },
      ],
    },
  };
  const info_template = {
    vars: {
      fieldFont: '18px',
    },
    template: {
      layout: 'vlinear',
      children: [
        {
          field: 'SIGUN_NM',
          left: 10,
          style: {
            paddingTop: '30px',
            paddingLeft: '10px',
            fontSize: '48px',
            fontWeight: 'bold',
          },
        },
        {
          space: '30',
        },
        {
          renderer: 'line',
          width: '90%',
        },
        {
          space: '30',
        },
        {
          layout: 'hlinear',
          left: 10,
          style: {
            padding: '10px',
          },
          children: [
            {
              value: '구분 : ',
              style: {
                fontSize: '--fieldFont',
                fontWeight: 'bold',
              },
            },
            {
              field: 'DIV',
            },
          ],
        },
        {
          layout: 'hlinear',
          left: 10,
          style: {
            padding: '10px',
          },
          children: [
            {
              value: '품명 : ',
              style: {
                fontSize: '--fieldFont',
                fontWeight: 'bold',
              },
            },
            {
              field: 'ENTRPS_NM',
            },
          ],
        },
        {
          layout: 'hlinear',
          left: 10,
          style: {
            padding: '10px',
          },
          children: [
            {
              value: '품목 : ',
              style: {
                fontSize: '--fieldFont',
                fontWeight: 'bold',
              },
            },
            {
              field: 'PRODLST_NM',
            },
          ],
        },
        {
          layout: 'hlinear',
          left: 10,
          style: {
            padding: '10px',
          },
          children: [
            {
              value: '연락처 : ',
              style: {
                fontSize: '--fieldFont',
                fontWeight: 'bold',
              },
            },
            {
              field: 'TELNO',
            },
          ],
        },
        {
          space: '30',
        },
        {
          renderer: 'line',
          width: '90%',
        },
        {
          layout: 'hlinear',
          style: {
            paddingTop: '15px',
          },
          children: [
            {
              renderer: {
                type: 'button',
                label: '메시지',
                imageWidth: 32,
                imageUrl: '../asset/images/google/chat.png',
                borderless: true,
                onClick: () => {
                  alert('메시지!');
                },
                style: { fontSize: '13px', color: '#0088ff' },
              },
            },
            {
              space: 130,
            },
            {
              renderer: {
                type: 'button',
                label: '전화',
                // labelPosition: 'top',
                imageWidth: 32,
                imageUrl: '../asset/images/google/call.png',
                borderless: true,
                onClick: () => {
                  alert('휴대전화!');
                },
                style: { fontSize: '13px', color: '#0088ff' },
              },
            },
          ],
        },
      ],
    },
  };

  const config = {
    props: {
      templates: {
        detail: detail_template,
        master: master_template,
        info: info_template,
        edit: edit_template,
      },
    },
    options: {
      row: {
        template: 'detail',
        commands: ['@info', '@edit', '@delete'],
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
      infoPage: {
        header: {
          caption: '상세 페이지',
        },
        viewType: 'B',
        template: 'info',
      },
      editPage: {
        header: {
          caption: '수정 페이지',
        },
        template: 'edit',
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

      window.list = list;
    });
  });

  window.next = () => {
    window.location.href = './show-15.html';
  };
}
