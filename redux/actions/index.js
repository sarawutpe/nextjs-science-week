import * as authAction from './authAction';
import * as memberAction from './memberAction';
import * as adminAction from './adminAction';
import * as schoolAction from './schoolAction';
import * as siteAction from './siteAction';
import * as newsAction from './newsAction';
import * as awardAttachmentAction from './awardAttachmentAction';
import * as certificateAction from './certificateAction';
import * as formScienceDaySurvey from './formScienceDaySurveyAction';
import * as formActivityAction from './formActivityAction';
import * as formScienceDayAction from './formScienceDayAction';
import * as activityAction from './activityAction';
import * as activityLevelAction from './activityLevelAction';
import * as programAction from './programAction';
import * as competitionAction from './competitionAction';
import * as participantAction from './participantAction';
import * as formActivityResponseAction from './formActivityResponseAction';
import * as formScienceDayResponseAction from './formScienceDayResponseAction';
import * as awardLevelAction from './awardLevelAction';
import * as competitionResultAction from './competitionResultAction';
import * as emailAction from './emailAction';
import * as reportAction from './reportAction';

const actions = {
  ...authAction,
  ...memberAction,
  ...adminAction,
  ...siteAction,
  ...schoolAction,
  ...newsAction,
  ...awardAttachmentAction,
  ...certificateAction,
  ...formScienceDaySurvey,
  ...formScienceDayAction,
  ...activityAction,
  ...activityLevelAction,
  ...programAction,
  ...formActivityAction,
  ...competitionAction,
  ...participantAction,
  ...formActivityResponseAction,
  ...formScienceDayResponseAction,
  ...awardLevelAction,
  ...competitionResultAction,
  ...emailAction,
  ...reportAction,
};

export default actions;
