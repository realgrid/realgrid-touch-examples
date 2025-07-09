import { RtListControl } from 'realgrid-touch';

export const menu = () => {
    return {
        onClick: ({item}: { control: RtListControl, item: any }) => {
            // alert('click item')
            window.location.href = `/${item.id}.html`
        },
        items: [
            {
                id: 'login',
                label: '로그인',
                style: {
                    border: 'none'
                },
            },
            {
                id: 'approval',
                label: '휴가결재',
                style: {
                    border: 'none'
                },
            },
            {
                id: 'dayoff',
                label: '휴가신청',
                style: {
                    border: 'none'
                },
            }
        ]
    }
}

const MenuButton = () => {
    return {
        name: 'menu',
        shape: '@menu',
        onClick: ({control}: { control: RtListControl }) => {
            control.showMenu(menu());
        }
    }
}

export default MenuButton;