/**
*
* Asynchronously loads the component for Spam
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/pageLoading';

export const Spam = lazyLoad(() => import('./index'), module => module.Spam, {fallback: <PageLoading />,},);