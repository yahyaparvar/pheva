/**
*
* Asynchronously loads the component for Tasks
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/pageLoading';

export const Tasks = lazyLoad(() => import('./index'), module => module.Tasks, {fallback: <PageLoading />,},);