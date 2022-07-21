import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';

export const mainMenu = [
  {
    name: 'หน้าแรก',
    path: '/',
  },
  {
    name: 'ประกวด/แข่งขัน',
    path: '/activity',
  },
];

export const memberMenu = {
  main: [
    {
      name: 'หน้าแรก',
      path: '/member',
      icon: <HomeIcon fontSize="small" />,
    },
    {
      name: 'กิจกรรมที่เข้าร่วม',
      path: '/member/competition',
      icon: <WidgetsIcon fontSize="small" />,
    },
    {
      name: 'ผลการแข่งขัน',
      path: '/member/competition_result',
      icon: <WidgetsIcon fontSize="small" />,
    },
    {
      name: 'แบบสอบถามกิจกรรม',
      path: '/member/form_activity',
      icon: <FormatListBulletedIcon fontSize="small" />,
    },
  ],
  account: [
    {
      name: 'ข้อมูลส่วนตัว',
      path: '/member/profile',
      icon: <ManageAccountsIcon fontSize="small" />,
    },
    {
      name: 'เปลี่ยนรหัสผ่าน',
      path: '/member/security',
      icon: <PasswordIcon fontSize="small" />,
    },
  ],
};

export const menu1 = [
  {
    name: 'หน้าแรก',
    path: '/admin/view1',
  },
  {
    name: 'รายชื่อโรงเรียน',
    path: '/admin/view1/school'
  },
  {
    name: 'ระดับการแข่งขัน',
    path: '/admin/view1/activity_level',
  },
  {
    name: 'ระดับรางวัล',
    path: '/admin/view1/award_level',
  },
  {
    name: 'บัญชีเจ้าหน้าที่',
    path: '/admin/view1/admin_manage',
  },
  {
    name: 'บัญชีสมาชิก',
    path: '/admin/view1/member_manage',
  },
  {
    name: 'ตั้งค่าเว็บไซต์',
    path: '/admin/view1/site',
  },
  {
    name: 'ข้อมูลส่วนตัว',
    path: '/admin/view1/profile',
  },
  {
    name: 'เปลี่ยนรหัสผ่าน',
    path: '/admin/view1/security',
  },
];

export const menu2 = [
  {
    name: 'หน้าแรก',
    path: '/admin/view2',
  },
  {
    name: 'จัดการกิจกรรม',
    path: '/admin/view2/activity',
  },
  {
    name: 'จัดการโปรแกรมแข่งขัน',
    path: '/admin/view2/program',
  },
  {
    name: 'รายชื่อผู้มาร่วมกิจกรรม',
    path: '/admin/view2/participant',
  },
  {
    name: 'ผลการแข่งขัน',
    path: '/admin/view2/competition_result',
  },
  {
    name: 'จัดการแบบสอบถามกิจกรรม',
    path: '/admin/view2/form_activity',
  },
  {
    name: 'การตอบกลับแบบสอบถามกิจกรรม',
    path: '/admin/view2/form_activity_response',
  },
  {
    name: 'แจ้งข่าวสาร',
    path: '/admin/view2/mail',
  },
  {
    name: 'รายงานรายชื่อผู้มาร่วมกิจกรรม',
    path: '/admin/view2/report_participant',
  },
  {
    name: 'รายงานรายชื่อผู้ที่ได้รับรางวัล',
    path: '/admin/view2/report_competiton_award',
  },
  {
    name: 'ข้อมูลส่วนตัว',
    path: '/admin/view2/profile',
  },
  {
    name: 'เปลี่ยนรหัสผ่าน',
    path: '/admin/view2/security',
  },
];

export const menu3 = [
  {
    name: 'หน้าแรก',
    path: '/admin/view3',
  },
  {
    name: 'การส่งผลการแข่งขัน',
    path: '/admin/view3/check_competition_result',
  },
  {
    name: 'ผลการแข่งขัน',
    path: '/admin/view3/competition_result',
  },
  {
    name: 'รูปเกียรติบัตร',
    path: '/admin/view3/certificate',
  },
  {
    name: 'แบบสอบถามวันวิทย์ศาสตร์',
    path: '/admin/view3/form_science_day',
  },
  {
    name: 'การตอบกลับแบบสอบถามวันวิทย์',
    path: '/admin/view3/form_science_day_response',
  },
  {
    name: 'รายชื่อผู้ประเมินความพึงพอใจวันวิทย์',
    path: '/admin/view3/form_science_day_survey',
  },
  {
    name: 'รายงานจำนวนผู้สมัครเข้าร่วมกิจกรรม',
    path: '/admin/view3/report_count_competition',
  },
  {
    name: 'รายงานรายชื่อผู้สมัครเข้าร่วมกิจกรรม',
    path: '/admin/view3/report_name_list',
  },
  {
    name: 'รายงานผลการแข่งขัน',
    path: '/admin/view3/report_competition_result',
  },
  {
    name: 'ข่าวประชาสัมพันธ์',
    path: '/admin/view3/news',
  },
  {
    name: 'ข้อมูลส่วนตัว',
    path: '/admin/view3/profile',
  },
  {
    name: 'เปลี่ยนรหัสผ่าน',
    path: '/admin/view3/security',
  },
];

export const menu4 = [
  {
    name: 'หน้าแรก',
    path: '/admin/view4',
  },
  {
    name: 'หลักฐานการจ่ายเงินรางวัล',
    path: '/admin/view4/proof_of_payment',
  },
  {
    name: 'เอกสารประกอบขอรับเงินรางวัล',
    path: '/admin/view4/award_attachment',
  },
  {
    name: 'รายงานรายชื่อผู้ที่ได้รับรางวัล',
    path: '/admin/view4/report_competiton_award',
  },
  {
    name: 'รายงานไฟล์หลักฐานการจ่ายเงิน',
    path: '/admin/view4/report_proof_of_payment',
  },
  {
    name: 'ข้อมูลส่วนตัว',
    path: '/admin/view4/profile',
  },
  {
    name: 'เปลี่ยนรหัสผ่าน',
    path: '/admin/view4/security',
  },
];

export const menu5 = [
  {
    name: 'หน้าแรก',
    path: '/admin/view5',
  },
  {
    name: 'รายงานจำนวนผู้สมัครเข้าร่วมกิจกรรม',
    path: '/admin/view5/report_count_competition',
  },
  {
    name: 'รายงานรายชื่อผู้สมัครเข้าร่วมกิจกรรม',
    path: '/admin/view5/report_name_list',
  },
  {
    name: 'รายงานผลการแข่งขัน',
    path: '/admin/view5/report_competition_result',
  },
  {
    name: 'รายงานรายชื่อผู้ที่ได้รับรางวัล',
    path: '/admin/view5/report_competiton_award',
  },
  {
    name: 'ข้อมูลส่วนตัว',
    path: '/admin/view5/profile',
  },
  {
    name: 'เปลี่ยนรหัสผ่าน',
    path: '/admin/view5/security',
  },
];
