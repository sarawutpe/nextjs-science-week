import { combineReducers } from 'redux';
import * as authReducer from './authReducer';
import * as memberReducer from './memberReducer';
import * as adminReducer from './adminReducer';
import * as schoolReducer from './schoolReducer';
import * as siteReducer from './siteReducer';
import * as newsReducer from './newsReducer';
import * as awardAttachmentReducer from './awardAttachmentReducer';
import * as certificateReducer from './certificateReducer';
import * as formScienceDayReducer from './formScienceDayReducer';
import * as activityReducer from './activityReducer';
import * as activityLevelReducer from './activityLevelReducer';
import * as programReducer from './programReducer';
import * as formScienceDaySurveyReducer from './formScienceDaySurveyReducer';
import * as formActivityReducer from './formActivityReducer';
import * as competitionReducer from './competitionReducer';
import * as participantReducer from './participantReducer';
import * as formActivityResponseReducer from './formActivityResponseReducer';
import * as formScienceDayResponseReducer from './formScienceDayResponseReducer';
import * as awardLevelReducer from './awardLevelReducer';
import * as competitionResultReducer from './competitionResultReducer';
import * as emailReducer from './emailReducer';
import * as reportReducer from './reportReducer';

const reducers = combineReducers({
  ...authReducer,
  ...memberReducer,
  ...adminReducer,
  ...schoolReducer,
  ...siteReducer,
  ...newsReducer,
  ...awardAttachmentReducer,
  ...certificateReducer,
  ...formScienceDaySurveyReducer,
  ...formScienceDayReducer,
  ...activityReducer,
  ...activityLevelReducer,
  ...programReducer,
  ...formActivityReducer,
  ...competitionReducer,
  ...participantReducer,
  ...formActivityResponseReducer,
  ...formScienceDayResponseReducer,
  ...awardLevelReducer,
  ...competitionResultReducer,
  ...emailReducer,
  ...reportReducer,
});

export default reducers;
