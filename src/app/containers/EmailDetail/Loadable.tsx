/**
*
* Asynchronously loads the component for EmailDetail
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/pageLoading';

export const EmailDetail = lazyLoad(() => import('./index'), module => module.EmailDetail, {fallback: <PageLoading />,},);