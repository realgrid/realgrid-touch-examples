<template>
  <div :id="touchName"></div>
</template>

<script>
import RealGridTouch from "realgrid-touch"
import { yososu } from "./yososu.js";
import  {row_template ,footer_template } from "./templates.js";

export default {
  name: 'RealGridTouch',
  props:["domName"],
  data(){
    return {
      touchName: this.domName
    }
  },
  created(){
    this.fields = {
      fields: [{
        name: 'OILSTATN_NM'
      }, {
        name: 'LOCPLC_ROADNM_ADDR'
      }, {
        name: 'TELNO'
      }, {
        name: 'QTY',
        type: 'number'
      }, {
        name: 'LAT',
        type: 'number'
      }, {
        name: 'LOGT',
        type: 'number'
      }, {
        name: 'DATA_STD_DTM'
      }]
    }

    this.options = {
      title: "요소수 판매 정보",
      fields: [
        { name: "OILSTATN_NM", label: "주유소 명" },
        { name: "LOCPLC_ROADNM_ADDR", label: "도로명 주소" },
        { name: "TELNO", label: "전화 번호" },
        { name: "QTY", label: "수량", type: "number" },
        { name: "LAT", label: "위도", type: "number" },
        { name: "LOGT", label: "경도", type: "number" },
        { name: "DATA_STD_DTM", type: "date", label: "데이터 입력 일시" },
      ],
    },

    this.config = {
      props: {
        numberFormat: ",",
        templates: {
          row: row_template,
          footer: footer_template,
        },
        rowCommands: {
          "@delete": { label: "삭  제" },
        },
        onRowSwipe: this.onRowSwipe,
        onRowClick: this.onRowClick
      },
      options: {
        row: {
          template: "row",
          commands: ["@info", "@delete"],
          clickAction: "info",
        },
        rowBar: {
          visible: true,
          display: "order",
          order: {
            suffix: ".",
            style: { fontSize: "19px", color: "#777" },
          },
        },
        scrollBar: true,
        scrollIndicator: {
          position: "top",
        },
        header: {
          visible: true,
          clickAction: "field",
          caption: "요소수 구입처",
          captionAlign: "center",
          buttons: [{
            name: "home",
            position: "head",
            label: "처음",
            onClick: this.homeClicked,
          },{
            name: "edit",
            label: "편집",
            style: {
              color: "blue",
            },
            onClick: this.buttonClick,
          }],
        },
        footer: {
          visible: true,
          template: "footer",
          buttons: [{
            name: "delete",
            label: "삭제",
            position: "tail",
            visible: false,
            enabled: this.enabledDeleteButton,
            onClick: this.deleteClicked,
            style: {
              color: "red",
            },
          }],
          layoutParams: {
            checkVisible: this.checkVisible
          },
        },
        emptyPage: {
          onLoadClick: this.onLoadClick,
        },
        commandBox: {
          mode: "overlap",
        },
        infoPage: {
          header: { caption: "요소수 정보" },
          viewType: "B",
          showDirection: "right",
        },
      },
    };
  },

  methods:{
    onLoadClick() {
      console.log('"Load Data" Button Clicked!')
      this.data.source.appendRows(yososu)
    },
    reader(prop, value){
      if (prop === "DATA_STD_DTM") {
        return new Date(value.substring(0, value.length - 3));
      }
      return value;
    },
    buttonClick(args)  {
      const button = args.button;
      
      if (button.label === "완료") {
        this.list.options.rowBar.display = "order";
        this.list.checkAll(false);

        button.label = "편집";
        this.list.options.header.setButton(button);

        this.list.options.footer.hideButton("delete");
        this.list.state = null;
      } else {
        this.list.options.rowBar.display = "check";
        this.list.checkAll(false);
        this.list.options.rowBar.visible = true;

        button.label = "완료";
        this.list.options.header.setButton(button);

        this.list.options.footer.showButton("delete");
        this.list.state = "edit";
      }
    },
    deleteClicked () {
      const rows = this.list.getCheckedRows();
      this.data.deleteRows(rows);
    },
    enabledDeleteButton() {
      return this.list.checkedRowCount > 0;
    },
    checkVisible() {
      return this.list.state === "edit";
    },
    homeClicked() {
      location.href = "./index.html";
    },
    onRowClick(args) {
      console.log("ROW: " + args.row);
    },
    onRowSwipe(args) {
      console.log("SWIPE ROW", args.row);
    },
  },
  mounted(){
    this.data = RealGridTouch.createListData("",this.fields)
      .createView('view')
      .sort(['OILSTATN_NM'])
      .build();

    if(this.data){
      this.list = RealGridTouch.createListControl(document, "realtouch");
      this.list.setConfig(this.config);
      this.list.data = this.data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('realgrid-touch/dist/realgrid-touch-style.css');
#realtouch{
  position: absolute;
  overflow: scroll;
  width: 100%;        
  height: 100%;
  overflow: hidden;
}
</style>
