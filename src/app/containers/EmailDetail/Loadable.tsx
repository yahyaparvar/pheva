/**
 *
 * Asynchronously loads the component for EmailDetail
 *
 */
import { PageLoading } from "app/components/pageLoading";
import { lazyLoad } from "common/loadable";

export const EmailDetail = lazyLoad(
  () => import("./index"),
  (module) => module.EmailDetail,
  { fallback: <PageLoading /> }
);
