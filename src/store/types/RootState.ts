import { AboutMeState } from 'app/containers/AboutMe/types';
import { LoginState } from 'app/containers/Login/types';
import { InboxState } from 'app/containers/Inbox/types';
import { SentState } from 'app/containers/Sent/types';
import { CalendarState } from 'app/containers/Calendar/types';
import { EmailDetailState } from 'app/containers/EmailDetail/types';
import { SpamState } from 'app/containers/Spam/types';
import { TasksState } from 'app/containers/Tasks/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { HomeState } from "app/containers/Home/types";
import { GlobalState } from "store/slice";

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  global?: GlobalState;
  home?: HomeState;
  aboutMe?: AboutMeState;
  login?: LoginState;
  inbox?: InboxState;
  sent?: SentState;
  calendar?: CalendarState;
  emailDetail?: EmailDetailState;
  spam?: SpamState;
  tasks?: TasksState;
// [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
