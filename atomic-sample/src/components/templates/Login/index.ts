//////////////////////////////////////////////////////
// events
//////////////////////////////////////////////////////
const handleLoginClick = async () => {
    // await fetch('/api/hello');
    // return true;
    window.location.href = '/approval.html';
}
//////////////////////////////////////////////////////
// styles
//////////////////////////////////////////////////////
const styles = {
    'input-style':  {
        paddingLeft: '15px',
        border: '1px solid #eee',
        color: '#9a9a9a',
    },
    'button-style': {
        width: '100%',
        height: '100%',
        color: '#fff',
        fontSize: '16px',
    },
}

const rowStyle = {
    fontFamily:
      "'Noto Sans KR', NotoKR, 'Malgun Gothic', Gulim, Arial, AppleGothic, sans-serif",
};

// parts
export const row = {
  vars: styles,
  template: {
    layout: 'vlinear',
    itemsAlign: 'center',
    itemGap: 10,
    children: [
      {
        width: '100%',
        layout: 'vlinear',
        itemsAlign: 'center',
        children: [
          {
            width: '100%',
            align: 'center',
            renderer: {
              type: 'image',
              url: '/images/logo-unipost.svg',
              onClick: () => {
                // window.location.href = Site.ORG_PAGE_LINK;
              },
            },
            style: {
              padding: '35px 0',
            },
            styleCallback: () => 'cursor',
          },
          {
            width: '100%',
            align: 'center',
            renderer: {
              type: 'text',
              text: '인사 관리 시스템'
            },
            style: {
              fontSize: '28pt',
              // fontWeight: 800,
              fontFamily: 'AppleGothic, "Black Han Sans", sans-serif',
              // fontFamily: 'IBM Plex Sans KR, sans-serif',
              textAlign: 'center',
              lineHeight: 'normal',
              color: '#222',
            },
          },
        ],
      },
      {
        space: 30,
      },
      {
        width: '100%',
        renderer: {
          type: 'line',
          dir: 'horizontal',
          lineColor: '#eee',
        },
      },
      {
        space: 10,
      },
      {
        width: '95%',
        layout: 'vlinear',
        itemsAlign: 'center',
        children: [
          {
            id: 'user',
            width: '95%',
            height: 47,
            field: 'user',
            editor: {
              type: 'text',
              fitHeight: 1,
              placeholder: '아이디',
              required: true,
              style: '--input-style',
              onChange: ({ editValue }: { editValue: string }) => {
                const passwordInput = editValue &&
                   document.querySelector('input[type="password"]');
                if (passwordInput) {
                    (passwordInput as HTMLElement).focus();
                }
              },
            },
          },
          {
            id: 'password',
            width: '95%',
            height: 47,
            field: 'password',
            editor: {
              type: 'password',
              fitHeight: 1,
              placeholder: '비밀번호',
              required: true,
              style: '--input-style',
              //maxLength: 16,
            },
          },
        ],
      },
      {
        width: '95%',
        layout: 'vlinear',
        itemsAlign: 'center',
        children: [
          {
            width: '95%',
            height: 47,
            renderer: {
              type: 'button',
              label: '로그인',
              borderless: true,
              style: '--button-style',
              styleCallback: () => {
                return {
                  backgroundColor: '#1a88cb',
                };
              },
              onClick: handleLoginClick,
            },
          },
        ],
      },
      {
        space: 20,
      },
      {
        width: '100%',
        layout: 'hlinear',
        itemsArrange: 'center',
        children: [
          {
            renderer: {
              type: 'shape',
              shape: '@home',
            },
          },
          {
            value: 'RealGrid Touch Demo Page',
            renderer: {
              type: 'link',
              link: 'https://touch.realgrid.com/demo',
              style: {
                textDecoration: 'none',
                color: '#222',
              },
            },
          },
        ],
      },
    ],
  },
  rowStyle
};