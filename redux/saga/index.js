import { takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actionTypes';
import * as authSaga from './authSaga';
import * as memberSaga from './memberSaga';
import * as adminSaga from './adminSaga';
import * as schoolSaga from './schoolSaga';
import * as siteSaga from './siteSaga';
import * as newsSaga from './newsSaga';
import * as awardAttachmentSaga from './awardAttachmentSaga';
import * as certificateSaga from './certificateSaga';
import * as formScienceDaySaga from './formScienceDaySaga';
import * as activitySaga from './activitySaga';
import * as activityLevelSaga from './activityLevelSaga';
import * as programSaga from './programSaga';
import * as formScienceDaySurveySaga from './formScienceDaySurveySaga';
import * as formActivitySaga from './formActivitySaga';
import * as competitionSaga from './competitionSaga';
import * as participantSaga from './participantSaga';
import * as formActivityResponseSaga from './formActivityResponseSaga';
import * as formScienceDayResponseSaga from './formScienceDayResponseSaga';
import * as awardLevelSaga from './awardLevelSaga';
import * as competitionResultSaga from './competitionResultSaga';
import * as emailSaga from './emailSaga';
import * as reportSaga from './reportSaga';

// auth login saga
function* watchLogin() {
  yield takeEvery(actions.LOGIN_REQUEST, authSaga.login);
}
// auth forgot password saga
function* watchForgotPassword() {
  yield takeEvery(actions.FORGOT_PASSWORD_REQUEST, authSaga.forgotPassword);
}
// auth reset password saga
function* watchResetPassword() {
  yield takeEvery(actions.RESET_PASSWORD_REQUEST, authSaga.resetPassword);
}
// auth register saga
function* watchRegister() {
  yield takeEvery(actions.REGISTER_REQUEST, authSaga.register);
}

// auth change password saga
function* watchUpdatePassword() {
  yield takeEvery(actions.UPDATE_PASSWORD_REQUEST, authSaga.updatePassword);
}

// member saga
function* watchAddMember() {
  yield takeEvery(actions.ADD_MEMBER_REQUEST, memberSaga.addMember);
}
function* watchGetMember() {
  yield takeEvery(actions.GET_MEMBER_REQUEST, memberSaga.getMember);
}
function* watchGetMemberById() {
  yield takeEvery(actions.GET_MEMBER_BY_ID_REQUEST, memberSaga.getMemberById);
}
function* watchUpdateMember() {
  yield takeEvery(actions.UPDATE_MEMBER_REQUEST, memberSaga.updateMember);
}
function* watchDeleteMember() {
  yield takeEvery(actions.DELETE_MEMBER_REQUEST, memberSaga.deleteMember);
}

// admin saga
function* watchAddAdmin() {
  yield takeEvery(actions.ADD_ADMIN_REQUEST, adminSaga.addAdmin);
}
function* watchGetAdmin() {
  yield takeEvery(actions.GET_ADMIN_REQUEST, adminSaga.getAdmin);
}
function* watchGetAdminById() {
  yield takeEvery(actions.GET_ADMIN_BY_ID_REQUEST, adminSaga.getAdminById);
}
function* watchUpdateAdmin() {
  yield takeEvery(actions.UPDATE_ADMIN_REQUEST, adminSaga.updateAdmin);
}
function* watchDeleteAdmin() {
  yield takeEvery(actions.DELETE_ADMIN_REQUEST, adminSaga.deleteAdmin);
}

// school saga
function* watchAddSchool() {
  yield takeEvery(actions.ADD_SCHOOL_REQUEST, schoolSaga.addSchool);
}
function* watchgetSchool() {
  yield takeEvery(actions.GET_SCHOOL_REQUEST, schoolSaga.getSchool);
}
function* watchUpdateSchool() {
  yield takeEvery(actions.UPDATE_SCHOOL_REQUEST, schoolSaga.updateSchool);
}
function* watchDeleteSchool() {
  yield takeEvery(actions.DELETE_SCHOOL_REQUEST, schoolSaga.deleteSchool);
}

// site saga
function* watchGetSite() {
  yield takeEvery(actions.GET_SITE_REQUEST, siteSaga.getSite);
}
function* watchUpdateSite() {
  yield takeEvery(actions.UPDATE_SITE_REQUEST, siteSaga.updateSite);
}

// news saga
function* watchAddNews() {
  yield takeEvery(actions.ADD_NEWS_REQUEST, newsSaga.addNews);
}
function* watchGetNews() {
  yield takeEvery(actions.GET_NEWS_REQUEST, newsSaga.getNews);
}
function* watchGetNewsById() {
  yield takeEvery(actions.GET_NEWS_BY_ID_REQUEST, newsSaga.getNewsById);
}
function* watchUpdateNews() {
  yield takeEvery(actions.UPDATE_NEWS_REQUEST, newsSaga.updateNews);
}
function* watchDeleteNews() {
  yield takeEvery(actions.DELETE_NEWS_REQUEST, newsSaga.deleteNews);
}

// award attachment saga
function* watchAddAwardAttachment() {
  yield takeEvery(actions.ADD_AWARD_ATTACHMENT_REQUEST, awardAttachmentSaga.addAwardAttachment);
}
function* watchGetAwardAttachment() {
  yield takeEvery(actions.GET_AWARD_ATTACHMENT_REQUEST, awardAttachmentSaga.getAwardAttachment);
}
function* watchGetAwardAttachmentById() {
  yield takeEvery(actions.GET_AWARD_ATTACHMENT_BY_ID_REQUEST, awardAttachmentSaga.getAwardAttachmentById);
}
function* watchUpdateAwardAttachmentById() {
  yield takeEvery(actions.UPDATE_AWARD_ATTACHMENT_REQUEST, awardAttachmentSaga.updateAwardAttachment);
}
function* watchDeleteAwardAttachmentById() {
  yield takeEvery(actions.DELETE_AWARD_ATTACHMENT_REQUEST, awardAttachmentSaga.deleteAwardAttachment);
}

// certificate saga
function* watchAddCertificate() {
  yield takeEvery(actions.ADD_CERTIFICATE_REQUEST, certificateSaga.addCertificate);
}
function* watchGetCertificate() {
  yield takeEvery(actions.GET_CERTIFICATE_REQUEST, certificateSaga.getCertificate);
}
function* watchgetCertificateByType() {
  yield takeEvery(actions.GET_CERTIFICATE_BY_TYPE_REQUEST, certificateSaga.getCertificateByType);
}
function* watchUpdateCertificate() {
  yield takeEvery(actions.UPDATE_CERTIFICATE_REQUEST, certificateSaga.updateCertificate);
}
function* watchDeleteCertificate() {
  yield takeEvery(actions.DELETE_CERTIFICATE_REQUEST, certificateSaga.deleteCertificate);
}

// form science day
function* watchAddFormScienceDay() {
  yield takeEvery(actions.ADD_FORM_SCIENCE_DAY_REQUEST, formScienceDaySaga.addFormScienceDay);
}
function* watchGetFormScienceDay() {
  yield takeEvery(actions.GET_FORM_SCIENCE_DAY_REQUEST, formScienceDaySaga.getFormScienceDay);
}
function* watchGetFormScienceDayById() {
  yield takeEvery(actions.GET_FORM_SCIENCE_DAY_BY_ID_REQUEST, formScienceDaySaga.getFormScienceDayById);
}
function* watchUpdateFormScienceDay() {
  yield takeEvery(actions.UPDATE_FORM_SCIENCE_DAY_REQUEST, formScienceDaySaga.updateFormScienceDay);
}
function* watchDeleteFormScienceDay() {
  yield takeEvery(actions.DELETE_FORM_SCIENCE_DAY_REQUEST, formScienceDaySaga.deleteFormScienceDay);
}

// activity saga
function* watchAddActivity() {
  yield takeEvery(actions.ADD_ACTIVITY_REQUEST, activitySaga.addActivity);
}
function* watchGetActivity() {
  yield takeEvery(actions.GET_ACTIVITY_REQUEST, activitySaga.getActivity);
}
function* watchGetActivityByAdminId() {
  yield takeEvery(actions.GET_ACTIVITY_BY_ADMIN_ID_REQUEST, activitySaga.getActivityByAdminId);
}
function* watchGetActivityById() {
  yield takeEvery(actions.GET_ACTIVITY_BY_ID_REQUEST, activitySaga.getActivityById);
}
function* watchGetActivityDetail() {
  yield takeEvery(actions.GET_ACTIVITY_DETAIL_REQUEST, activitySaga.getActivityDetail);
}
function* watchUpdateActivity() {
  yield takeEvery(actions.UPDATE_ACTIVITY_REQUEST, activitySaga.updateActivity);
}
function* watchDeleteActivity() {
  yield takeEvery(actions.DELETE_ACTIVITY_REQUEST, activitySaga.deleteActivity);
}

// activity level saga
function* watchAddActivityLevel() {
  yield takeEvery(actions.ADD_ACTIVITY_LEVEL_REQUEST, activityLevelSaga.addActivityLevel);
}
function* watchGetActivityLevel() {
  yield takeEvery(actions.GET_ACTIVITY_LEVEL_REQUEST, activityLevelSaga.getActivityLevel);
}
function* watchGetActivityLevelById() {
  yield takeEvery(actions.GET_ACTIVITY_LEVEL_BY_ID_REQUEST, activityLevelSaga.getActivityLevelById);
}
function* watchUpdateActivityLevel() {
  yield takeEvery(actions.UPDATE_ACTIVITY_LEVEL_REQUEST, activityLevelSaga.updateActivityLevel);
}
function* watchDeleteActivityLevel() {
  yield takeEvery(actions.DELETE_ACTIVITY_LEVEL_REQUEST, activityLevelSaga.deleteActivityLevel);
}

// program saga
function* watchAddProgram() {
  yield takeEvery(actions.ADD_PROGRAM_REQUEST, programSaga.addProgram);
}
function* watchGetProgram() {
  yield takeEvery(actions.GET_PROGRAM_REQUEST, programSaga.getProgram);
}
function* watchGetProgramById() {
  yield takeEvery(actions.GET_PROGRAM_BY_ID_REQUEST, programSaga.getProgramById);
}
function* watchGetProgramByAdminId() {
  yield takeEvery(actions.GET_PROGRAM_BY_ADMIN_ID_REQUEST, programSaga.getProgramByAdminId);
}
function* watchGetProgramDetailByActivityId() {
  yield takeEvery(actions.GET_PROGRAM_DETAIL_BY_ACTIVITY_ID_REQUEST, programSaga.getProgramDetailByActivityId);
}
function* watchUpdateProgram() {
  yield takeEvery(actions.UPDATE_PROGRAM_REQUEST, programSaga.updateProgram);
}
function* watchDeleteProgram() {
  yield takeEvery(actions.DELETE_PROGRAM_REQUEST, programSaga.deleteProgram);
}

// form science day survey
function* watchGetFormScienceDaySurvey() {
  yield takeEvery(actions.GET_FORM_SCIENCE_DAY_SURVEY_REQUEST, formScienceDaySurveySaga.getFormScienceDaySurvey);
}

// form activity saga
function* watchAddFormActivity() {
  yield takeEvery(actions.ADD_FORM_ACTIVITY_REQUEST, formActivitySaga.addFormActivity);
}
function* watchGetFormActivityByMemberId() {
  yield takeEvery(actions.GET_FORM_ACTIVITY_BY_MEMBER_ID_REQUEST, formActivitySaga.getFormActivityByMemberId);
}
function* watchGetFormActivityById() {
  yield takeEvery(actions.GET_FORM_ACTIVITY_BY_ID_REQUEST, formActivitySaga.getFormActivityById);
}
function* watchUpdateFormActivity() {
  yield takeEvery(actions.UPDATE_FORM_ACTIVITY_REQUEST, formActivitySaga.updateFormActivity);
}
function* watchDeleteFormActivity() {
  yield takeEvery(actions.DELETE_FORM_ACTIVITY_REQUEST, formActivitySaga.deleteFormActivity);
}

// competition saga
function* watchAddCompetition() {
  yield takeEvery(actions.ADD_COMPETITION_REQUEST, competitionSaga.addCompetition);
}

function* watchGetCompetition() {
  yield takeEvery(actions.GET_COMPETITION_REQUEST, competitionSaga.getCompetition);
}

// competition
function* watchGetCompetitionById() {
  yield takeEvery(actions.GET_COMPETITION_BY_ID_REQUEST, competitionSaga.getCompetitionById);
}

function* watchGetCompetitionByMemberId() {
  yield takeEvery(actions.GET_COMPETITION_BY_MEMBER_ID_REQUEST, competitionSaga.getCompetitionByMemberId);
}

function* watchUpdateCompetition() {
  yield takeEvery(actions.UPDATE_COMPETITION_REQUEST, competitionSaga.updateCompetition);
}

function* watchDeleteCompetition() {
  yield takeEvery(actions.DELETE_COMPETITION_REQUEST, competitionSaga.deleteCompetition);
}

// participant saga
function* watchAddParticipant() {
  yield takeEvery(actions.ADD_PARTICIPANT_REQUEST, participantSaga.addParticipant);
}

function* watchGetParticipant() {
  yield takeEvery(actions.GET_PARTICIPANT_REQUEST, participantSaga.getParticipant);
}

function* watchGetParticipantByAdminId() {
  yield takeEvery(actions.GET_PARTICIPANT_BY_ADMIN_ID_REQUEST, participantSaga.getParticipantByAdminId);
}

function* watchUpdateParticipant() {
  yield takeEvery(actions.UPDATE_PARTICIPANT_REQUEST, participantSaga.updateParticipant);
}

function* watchDeleteParticipant() {
  yield takeEvery(actions.DELETE_PARTICIPANT_REQUEST, participantSaga.deleteParticipant);
}

// form activity responses
function* watchAddFormActivityResponse() {
  yield takeEvery(actions.ADD_FORM_ACTIVITY_RESPONSES_REQUEST, formActivityResponseSaga.addFormActivityResponse);
}
function* watchGetFormActivityResponseByActivityId() {
  yield takeEvery(actions.GET_FORM_ACTIVITY_RESPONSES_BY_ACTIVITY_ID_REQUEST, formActivityResponseSaga.getFormActivityResponseByActivityId);
}

// form science day responses
function* watchAddFormScienceDayResponse() {
  yield takeEvery(actions.ADD_FORM_SCIENCE_DAY_RESPONSE_REQUEST, formScienceDayResponseSaga.addFormScienceDayResponse);
}
function* watchGetFormScienceDayResponse() {
  yield takeEvery(actions.GET_FORM_SCIENCE_DAY_RESPONSE_REQUEST, formScienceDayResponseSaga.getFormScienceDayResponse);
}

// award level
function* watchAddAwardLevel() {
  yield takeEvery(actions.ADD_AWARD_LEVEL_REQUEST, awardLevelSaga.addAwardLevel);
}

function* watchGetAwardLevel() {
  yield takeEvery(actions.GET_AWARD_LEVEL_REQUEST, awardLevelSaga.getAwardLevel);
}

function* watchUpdateAwardLevel() {
  yield takeEvery(actions.UPDATE_AWARD_LEVEL_REQUEST, awardLevelSaga.updateAwardLevel);
}

function* watchDeleteAwardLevel() {
  yield takeEvery(actions.DELETE_AWARD_LEVEL_REQUEST, awardLevelSaga.deleteAwardLevel);
}

// competition result
function* watchAddCompetitionResult() {
  yield takeEvery(actions.ADD_COMPETITION_RESULT_REQUEST, competitionResultSaga.addCompetitionResult);
}

function* watchGetCompetitionResult() {
  yield takeEvery(actions.GET_COMPETITION_RESULT_REQUEST, competitionResultSaga.getCompetitionResult);
}

function* watchGetCompetitionResultByAdminId() {
  yield takeEvery(actions.GET_COMPETITION_RESULT_BY_ADMIN_ID_REQUEST, competitionResultSaga.getCompetitionResultByAdminId);
}

function* watchGetCompetitionResultByMemberId() {
  yield takeEvery(actions.GET_COMPETITION_RESULT_BY_MEMBER_ID_REQUEST, competitionResultSaga.getCompetitionResultByMemberId);
}

function* watchGetCompetitionResultByOverview() {
  yield takeEvery(actions.GET_COMPETITION_RESULT_BY_OVERVIEW_REQUEST, competitionResultSaga.getCompetitionResultByOverview);
}

function* watchGetCheckCompetitionResult() {
  yield takeEvery(actions.GET_CHECK_COMPETITION_RESULT_REQUEST, competitionResultSaga.getCheckCompetitionResult);
}

function* watchUpdateCompetitionResult() {
  yield takeEvery(actions.UPDATE_COMPETITION_RESULT_REQUEST, competitionResultSaga.updateCompetitionResult);
}

function* watchUpdateCheckCompetitionResult() {
  yield takeEvery(actions.UPDATE_CHECK_COMPETITION_RESULT_REQUEST, competitionResultSaga.updateCheckCompetitionResult);
}

function* watchDeleteCompetitionResult() {
  yield takeEvery(actions.DELETE_COMPETITION_RESULT_REQUEST, competitionResultSaga.deleteCompetitionResult);
}

// send email
function* watchSendEmail() {
  yield takeEvery(actions.SEND_EMAIL_REQUEST, emailSaga.sendEmail);
}

// report competion
function* watchGetReportCompetition() {
  yield takeEvery(actions.GET_REPORT_COMPEITION_REQUEST, reportSaga.getReportCompetition);
}

// report competion by id
function* watchGetReportCompetitionById() {
  yield takeEvery(actions.GET_REPORT_COMPEITION_BY_ID_REQUEST, reportSaga.getReportCompetitionById);
}

// report competion result
function* watchGetReportCompetitionResult() {
  yield takeEvery(actions.GET_REPORT_COMPEITION_RESULT_REQUEST, reportSaga.getReportCompetitionResult);
}

// report competion result by id
function* watchGetReportCompetitionResultById() {
  yield takeEvery(actions.GET_REPORT_COMPEITION_RESULT_BY_ID_REQUEST, reportSaga.getReportCompetitionResultById);
}

// report participant
function* watchGetReportParticipant() {
  yield takeEvery(actions.GET_REPORT_PARTICIPANT_REQUEST, reportSaga.getReportParticipant);
}

// report participant by admin id
function* watchGetReportParticipantByAdminId() {
  yield takeEvery(actions.GET_REPORT_PARTICIPANT_BY_ADMIN_ID_REQUEST, reportSaga.getReportParticipantByAdminId);
}

// report competition award
function* watchGetReportCompetitionAward() {
  yield takeEvery(actions.GET_REPORT_COMPETITION_AWARD_REQUEST, reportSaga.getReportCompetitionAward);
}

// report competition award
function* watchGetReportCompetitionAwardByAdminId() {
  yield takeEvery(actions.GET_REPORT_COMPETITION_AWARD_BY_ADMIN_ID_REQUEST, reportSaga.getReportCompetitionAwardByAdminId);
}


export default function* reduxSaga() {
  yield all([
    watchLogin(),
    watchForgotPassword(),
    watchResetPassword(),
    watchRegister(),
    watchUpdatePassword(),

    watchAddMember(),
    watchGetMember(),
    watchGetMemberById(),
    watchUpdateMember(),
    watchDeleteMember(),

    watchAddAdmin(),
    watchGetAdmin(),
    watchGetAdminById(),
    watchUpdateAdmin(),
    watchDeleteAdmin(),

    watchAddSchool(),
    watchgetSchool(),
    watchUpdateSchool(),
    watchDeleteSchool(),

    watchGetSite(),
    watchUpdateSite(),

    watchAddNews(),
    watchGetNews(),
    watchGetNewsById(),
    watchUpdateNews(),
    watchDeleteNews(),

    watchAddAwardAttachment(),
    watchGetAwardAttachment(),
    watchGetAwardAttachmentById(),
    watchUpdateAwardAttachmentById(),
    watchDeleteAwardAttachmentById(),

    watchAddCertificate(),
    watchGetCertificate(),
    watchgetCertificateByType(),
    watchUpdateCertificate(),
    watchDeleteCertificate(),

    watchAddFormScienceDay(),
    watchGetFormScienceDay(),
    watchGetFormScienceDayById(),
    watchUpdateFormScienceDay(),
    watchDeleteFormScienceDay(),

    watchAddActivity(),
    watchGetActivity(),
    watchGetActivityByAdminId(),
    watchGetActivityById(),
    watchGetActivityDetail(),
    watchUpdateActivity(),
    watchDeleteActivity(),

    watchAddActivityLevel(),
    watchGetActivityLevel(),
    watchGetActivityLevelById(),
    watchUpdateActivityLevel(),
    watchDeleteActivityLevel(),

    watchAddProgram(),
    watchGetProgram(),
    watchGetProgramById(),
    watchGetProgramByAdminId(),
    watchGetProgramDetailByActivityId(),
    watchUpdateProgram(),
    watchDeleteProgram(),

    watchGetFormScienceDaySurvey(),

    watchAddFormActivity(),
    watchGetFormActivityByMemberId(),
    watchGetFormActivityById(),
    watchUpdateFormActivity(),
    watchDeleteFormActivity(),

    watchAddCompetition(),
    watchGetCompetition(),
    watchGetCompetitionById(),
    watchGetCompetitionByMemberId(),
    watchUpdateCompetition(),
    watchDeleteCompetition(),

    watchAddParticipant(),
    watchGetParticipant(),
    watchGetParticipantByAdminId(),
    watchUpdateParticipant(),
    watchDeleteParticipant(),

    watchAddFormActivityResponse(),
    watchGetFormActivityResponseByActivityId(),
    watchAddFormScienceDayResponse(),
    watchGetFormScienceDayResponse(),

    watchAddAwardLevel(),
    watchGetAwardLevel(),
    watchUpdateAwardLevel(),
    watchDeleteAwardLevel(),

    watchAddCompetitionResult(),
    watchGetCompetitionResult(),
    watchGetCompetitionResultByAdminId(),
    watchGetCompetitionResultByMemberId(),
    watchGetCompetitionResultByOverview(),
    watchGetCheckCompetitionResult(),
    watchUpdateCompetitionResult(),
    watchUpdateCheckCompetitionResult(),
    watchDeleteCompetitionResult(),

    watchSendEmail(),

    watchGetReportCompetition(),
    watchGetReportCompetitionById(),
    watchGetReportCompetitionResult(),
    watchGetReportCompetitionResultById(),
    watchGetReportParticipant(),
    watchGetReportParticipantByAdminId(),
    watchGetReportCompetitionAward(),
    watchGetReportCompetitionAwardByAdminId(),
  ]);
}
