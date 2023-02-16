import { footer_template, row_template } from "./templates";
import { useEffect, useState } from "react";
import styles from "../realgridtouch/realtouch-style.css";
import RealTouch from "../realgridtouch/realtouch.0.9.11.min.js";
import { yososu } from "./yososu.js";

const RealGridTouch = ({ domName }) => {
  
  const [data, setData] = useState(null);
  const [list, setList] = useState(null);

  const fields = {
    fields: [
      {
        name: "OILSTATN_NM",
      },
      {
        name: "LOCPLC_ROADNM_ADDR",
      },
      {
        name: "TELNO",
      },
      {
        name: "QTY",
        type: "number",
      },
      {
        name: "LAT",
        type: "number",
      },
      {
        name: "LOGT",
        type: "number",
      },
      {
        name: "DATA_STD_DTM",
      },
    ],
  };

  const config = {
    props: {
      numberFormat: ",",
      templates: {
        row: row_template,
        footer: footer_template,
      },
      rowCommands: {
        "@delete": { label: "삭  제" },
      },
      onRowSwipe: function(args){
        console.log("SWIPE ROW", args.row);
      }
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
          onClick: (args) => {
            window.location.href = "./index.html";
          },
        },{
          name: "edit",
          label: "편집",
          style: {
            color: "blue",
          },
          onClick: (args) => {
            const button = args.button;
  
            if (button.label === "완료") {
              args.control.options.rowBar.display = "order";
              args.control.checkAll(false);
  
              button.label = "편집";
              args.control.options.header.setButton(button);
  
              args.control.options.footer.hideButton("delete");
              args.control.state = null;
            } else {
              args.control.options.rowBar.display = "check";
              args.control.checkAll(false);
              args.control.options.rowBar.visible = true;
  
              button.label = "완료";
              args.control.options.header.setButton(button);
  
              args.control.options.footer.showButton("delete");
              args.control.state = "edit";
            }
          },
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
          enabled: (args) => {
            return args.control.checkedRowCount > 0;
          },
          onClick: (args) => {
            const rows = args.control.getCheckedRows();
            args.control.data.deleteRows(rows);
          },
          style: {
            color: "red",
          },
        }],
        layoutParams: {
          checkVisible: (args) => {
            return args.control?.state === "edit";
          },
        },
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


  useEffect(() => {
    const listData = RealTouch.createListData("",fields,{values:yososu}).createView('view').build();
    if(listData){
      const listControl = RealTouch.createListControl(document, domName);
      listControl.setConfig(config);
      listControl.data = listData
      setList(listControl);
    }
    setData(listData);
  }, []);



  return (<div id={domName} style={{
    position: 'absolute',
    overflow: 'scroll',
    width: 100+'%',        
    height: 100+'%',
  }}></div>);
};

export default RealGridTouch;
