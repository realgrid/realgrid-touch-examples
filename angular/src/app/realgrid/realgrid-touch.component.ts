import { Component, OnInit } from '@angular/core';
import * as realgridTouch from './realgrid-touch.0.9.11.min.js';
import { yososu } from './yososu.js';

@Component({
  selector: 'app-realgrid-touch',
  templateUrl: './realgrid-touch.component.html',
  styleUrls: ['./realgrid-touch.component.css'],
})
export class RealgridComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var data;
    var list;
    const footer_template = {
      template: {
        layout: 'hlinear',
        children: [
          {
            value: 'Σ',
            style: { fontSize: '19px' },
          },
          {
            space: '*',
          },
          {
            value: '${@row_count} 개',
            style: { fontWeight: 'bold', color: '#555' },
          },
          {
            space: 5,
            visible: '${checkVisible}',
          },
          {
            value: '${@check_count}',
            visible: '${checkVisible}',
            style: { color: 'red' },
          },
          {
            value: ' checked.',
            visible: '${checkVisible}',
          },
        ],
      },
    };
    const row_template = {
      template: {
        layout: 'vlinear',
        children: [
          {
            layout: 'hlinear',
            width: '100%',
            children: [
              {
                field: 'OILSTATN_NM',
                left: 0,
                style: { fontSize: '17px', fontWeight: 'bold', color: '#555' },
                tag: 'name',
              },
              {
                space: '*',
              },
              {
                value: '수량 :',
                style: {
                  fontSize: '14px',
                  color: '#333',
                },
              },
              {
                field: 'QTY',
                left: 0,
                style: { fontSize: '14px', color: '#555' },
                tag: 'qty',
                styleCallback: (ctx) => {
                  if (ctx.value < 2000)
                    return {
                      color: 'red',
                    };
                },
              },
            ],
          },
          {
            layout: 'hlinear',
            width: '100%',
            children: [
              {
                field: 'LOCPLC_ROADNM_ADDR',
                left: 0,
                style: { fontSize: '14px', color: '#777' },
                tag: 'addr',
                renderer: {
                  wrap: true,
                },
              },
            ],
          },
        ],
      },
      rowStyle: {
        checked: {
          backgroundColor: '#0088ff20',
        },
      },
    };

    const config = {
      props: {
        numberFormat: ',',
        templates: {
          row: row_template,
          footer: footer_template,
        },
        rowCommands: {
          '@delete': { label: '삭  제' },
        },
        onRowSwipe: (args) => {
          console.log('SWIPE ROW', args.row);
        },
        onRowClick: (args) => {
          console.log('ROW: ' + args.row);
        },
      },
      options: {
        row: {
          template: 'row',
          commands: ['@info', '@delete'],
          clickAction: 'info',
        },
        rowBar: {
          visible: true,
          display: 'order',
          order: {
            suffix: '.',
            style: { fontSize: '19px', color: '#777' },
          },
        },
        scrollBar: true,
        scrollIndicator: {
          position: 'top',
        },
        header: {
          visible: true,
          clickAction: 'field',
          caption: '요소수 구입처',
          captionAlign: 'center',
          buttons: [
            {
              name: 'home',
              position: 'head',
              label: '처음',
              onClick: (args) => {
                location.href = './index.html';
              },
            },
            {
              name: 'edit',
              label: '편집',
              style: {
                color: 'blue',
              },
              onClick: (args) => {
                const button = args.button;

                if (button.label === '완료') {
                  list.options.rowBar.display = 'order';
                  list.checkAll(false);

                  button.label = '편집';
                  list.options.header.setButton(button);

                  list.options.footer.hideButton('delete');
                  list.state = null;
                } else {
                  list.options.rowBar.display = 'check';
                  list.checkAll(false);
                  list.options.rowBar.visible = true;

                  button.label = '완료';
                  list.options.header.setButton(button);

                  list.options.footer.showButton('delete');
                  list.state = 'edit';
                }
              },
            },
          ],
        },
        footer: {
          visible: true,
          template: 'footer',
          buttons: [
            {
              name: 'delete',
              label: '삭제',
              position: 'tail',
              visible: false,
              enabled: () => {
                return list.checkedRowCount > 0;
              },
              onClick: (args) => {
                const rows = list.getCheckedRows();
                data.deleteRows(rows);
              },
              style: {
                color: 'red',
              },
            },
          ],
          layoutParams: {
            checkVisible: (args) => {
              return list.state === 'edit';
            },
          },
        },
        commandBox: {
          mode: 'overlap',
        },
        infoPage: {
          header: { caption: '요소수 정보' },
          viewType: 'B',
          showDirection: 'right',
        },
      },
      portrait: {},
      landscape: {},
    };

    function init() {
      const options = {
        title: '요소수 판매 정보',
        fields: [
          { name: 'OILSTATN_NM', label: '주유소 명' },
          { name: 'LOCPLC_ROADNM_ADDR', label: '도로명 주소' },
          { name: 'TELNO', label: '전화 번호' },
          { name: 'QTY', label: '수량', type: 'number' },
          { name: 'LAT', label: '위도', type: 'number' },
          { name: 'LOGT', label: '경도', type: 'number' },
          { name: 'DATA_STD_DTM', type: 'date', label: '데이터 입력 일시' },
        ],
      };
      data = realgridTouch
        .createListData('', options, { values: yososu })
        .createView('view', { sort: 'OILSTATN_NM' })
        .slice('slice', [0, 15])
        .sort(['OILSTATN_NM'])
        .build();
      list = realgridTouch.createListControl(document, 'realgridTouch');
      list.setConfig(config);
      list.data = data;
    }
    init();
    console.log(list)
  }
}

const loadData = function () {};
