/**
*
* Asynchronously loads the component for Sent
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/pageLoading';

export const Sent = lazyLoad(() => import('./index'), module => module.Sent, {fallback: <PageLoading />,},);