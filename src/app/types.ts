export enum AppPages {
  RootPage = "/dashboard",
  HomePage = "/",
  Dashboard = "/home",
  Login = "/login",
  Inbox = "/emails/inbox",
  Sent = "/emails/sent",
  NotFoundPage = "*",
  AboutMe = "/aboutMe",
  Calendar = "/calendar",
  EmailDetail = "/emailDetail",
  Spam = "/spam",
  Tasks = "/tasks",
  PrivacyPolicy = "/privacy-policy",
  // [INSERT NEW PAGE PATH ABOVE] < Needed for generating containers seamlessly
}
export enum Themes {
  DARK = "DARK",
  LIGHT = "LIGHT",
  DRACULA = "DRACULA",
  SOLAR = "SOLAR",
  NORD = "NORD",
  DISCORD = "DISCORD",
  MIDNIGHT = "MIDNIGHT",
  LOCA = "LOCA",
}
export enum Status {
  LOADING = "LOADING",
  INITIAL = "INITIAL",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  CANCELLED = "CANCELLED",
}
