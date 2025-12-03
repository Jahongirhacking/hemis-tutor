import { getLocalStorage, localStorageNames } from './storageFunc';

export const enum SearchParams {
  Drawer = 'drawer',
  Modal = 'modal',
  DrawerProps = 'drawer-props',
  ChatTopic = 'chat-topic',
  Story = 'story',
  StudentId = 'student-id',
  ActiveTab = 'active-tab',
  DrawerTab = 'drawer-tab',
}

export const enum DrawerChildTypes {
  Attendance = 'attendance',
  Notifications = 'notifications',
  AuthExtraOptions = 'auth-extra-options',
  StudentInfo = 'student-info',
  GroupInfo = 'group-info',
}

export const enum ChatTopic {
  GpaSummary = 'gpa-summary',
  AttendanceSummary = 'attendance-summary',
  TimetableSummary = 'timetable-summary',
  CourseRecommendation = 'course-recommendation',
  PlagiarismCheck = 'plagiarism-check',
  ContractSummary = 'contract-summary',
}

export const isTestUniversity = () =>
  getLocalStorage(localStorageNames.employeeApi) ===
  'https://student.hemis.uz/rest/v1';

export const testUniversities = [
  'student.ttyesi.uz',
  'student.hemis.uz',
  'hstudent.nuu.uz',
  'student.tiiame.uz',
  'student.jdpu.uz',
  'tsue.uz',
  'student.buxdu.uz',
  'student.samdu.uz',
  'student.tersu.uz',
  'student.nordicun.uz',
  'student.uwed.uz',
  'student.alfraganusuniversity.uz',
  'student.fdu.uz',
  'student.qarshidu.uz',
  'student.kokanduni.uz',
  'student.kuaf.uz',
  'student.nspi.uz',
  'student.samdchti.uz',
  'student.karsu.uz',
  'student.utas.uz',
  'student.sammu.uz',
  'student.uzswlu.uz',
  'student.iiau.uz',
  'student.tdtu.uz',
  'student.kokandsu.uz',
  'student.univ-silkroad.uz',
  'student.kkmi.uz',
  'student.jspi.uz',
  'student.tma.uz',
  'student.pharmi.uz',
  'student.tdtutf.uz',
];

export function loadRecaptcha(siteKey: string) {
  return new Promise<void>(resolve => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}
