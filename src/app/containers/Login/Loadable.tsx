/**
*
* Asynchronously loads the component for Login
*
*/
import React from 'react';
import { lazyLoad } from 'common/loadable';
import { PageLoading } from 'app/components/pageLoading';

export const Login = lazyLoad(() => import('./index'), module => module.Login, {fallback: <PageLoading />,},);