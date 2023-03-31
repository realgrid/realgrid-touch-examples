function init() {
    // 한 행 보기
    const singleData = [{
      hello: "Hello, World!",
    }];
    // 여러행 보기
    const multiData = [
      {
          hello: "Hello,",
          world: "World!",
      },
      {
          hello: "Hello2,",
          world: "World!2",
      },
    ];
    RealTouch.createListControl(document, "realtouch").data = RealTouch.createListData("", null, singleData);
}
