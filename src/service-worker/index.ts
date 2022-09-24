/// <reference lib="webworker" />
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */

import { handleActivate } from './activate';
import { handleInstall } from './install';
import { handleFetch } from './fetch';

// has to be var, because we need function scope
declare var self: ServiceWorkerGlobalScope;

/**
 * Takes care of the installation of the service worker, as well as the creation of the cache.
 */
self.addEventListener('install', handleInstall);

/**
 * Intercepts requests made by the page so we can decide what to do with each one.
 */
self.addEventListener('fetch', handleFetch);

/**
 * Takes care of the activation of the service worker, as well as the deletion of old caches.
 */
self.addEventListener('activate', handleActivate);
