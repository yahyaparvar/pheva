/**
*
* Asynchronously loads the component for Calendar
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/pageLoading';

export const Calendar = lazyLoad(() => import('./index'), module => module.Calendar, {fallback: <PageLoading />,},);