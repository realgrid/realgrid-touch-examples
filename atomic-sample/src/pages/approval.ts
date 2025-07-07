import RealTouch from 'realgrid-touch';
import { row, header } from '@components/approval';

const list = RealTouch.createListControl(document, 'realtouch');
const config = {
    props: {
        templates: {
            row: row,
        },
        style: {
            backgroundColor: '#f5f5f5'
        }
    },
    options: {
        header,
        row: {
            template: 'row',
            touchEffect: false,
        },
        scrollIndicator: false,
        footer: false,
        overScrollEffect: 'none',
    },
};

list.setConfig(config);
list.data = RealTouch.createListData('', {}, [
  {
    status: '진행',
    id: 'AP20250700001',
    title: '휴가 신청서 (연차) - 기획팀 김유니',
    request: '2025-07-01 09:10',
    approval: '2025-07-01 09:45',
    attachment: 1,
    comment: 2,
    lines: ['김유니', '홍길동']
  },
  {
    status: '완료',
    id: 'AP20250600045',
    title: '휴가 신청서 (연차) - 개발팀 최우선',
    request: '2025-06-15 13:20',
    approval: '2025-06-15 14:50',
    attachment: 2,
    comment: 1,
    lines: ['최우선', '박팀장']
  },
  {
    status: '진행',
    id: 'AP20250600033',
    title: '휴가 신청서 (오전 반차) - 디자인팀 이예림',
    request: '2025-06-10 08:55',
    approval: '2025-06-10 09:30',
    attachment: 0,
    comment: 0,
    lines: ['이예림', '이상무']
  },
  {
    status: '진행',
    id: 'AP20250500110',
    title: '휴가 신청서 (연차) - 운영팀 조아라',
    request: '2025-05-22 10:15',
    approval: '2025-05-22 11:00',
    attachment: 3,
    comment: 1,
    lines: ['조아라', '홍길동', '박부장']
  },
  {
    status: '진행',
    id: 'AP20250500087',
    title: '휴가 신청서 (연차) - 마케팅팀 장보람',
    request: '2025-05-17 15:40',
    approval: '2025-05-17 16:05',
    attachment: 1,
    comment: 0,
    lines: ['장보람', '정매니저']
  },
  {
    status: '반려',
    id: 'AP20250400064',
    title: '휴가 신청서 (연차) - 품질팀 김철수',
    request: '2025-04-20 14:10',
    approval: '2025-04-20 14:35',
    attachment: 1,
    comment: 3,
    lines: ['김철수', '이부장']
  },
  {
    status: '진행',
    id: 'AP20250400102',
    title: '휴가 신청서 (오후 반차) - 기획팀 김유니',
    request: '2025-04-01 17:24',
    approval: '2025-04-01 17:42',
    attachment: 0,
    comment: 0,
    lines: ['김유니', '홍길동']
  },
  {
    status: '완료',
    id: 'AP20250300112',
    title: '휴가 신청서 (연차) - 전략팀 박지훈',
    request: '2025-03-30 09:50',
    approval: '2025-03-30 11:00',
    attachment: 2,
    comment: 2,
    lines: ['박지훈', '김부장']
  },
  {
    status: '진행',
    id: 'AP20250300098',
    title: '휴가 신청서 (연차) - 개발팀 최우선',
    request: '2025-03-26 11:06',
    approval: '2025-03-26 14:11',
    attachment: 0,
    comment: 1,
    lines: ['최우선', '김개발', '박팀장']
  },
  {
    status: '진행',
    id: 'AP20250200031',
    title: '휴가 신청서 (연차) - 인사팀 유재현',
    request: '2025-02-10 08:45',
    approval: '2025-02-10 09:20',
    attachment: 0,
    comment: 0,
    lines: ['유재현', '김과장']
  }
]);