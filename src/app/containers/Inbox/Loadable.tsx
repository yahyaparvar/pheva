/**
*
* Asynchronously loads the component for Inbox
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/pageLoading';

export const Inbox = lazyLoad(() => import('./index'), module => module.Inbox, {fallback: <PageLoading />,},);