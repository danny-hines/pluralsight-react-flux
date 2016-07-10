'use strict';

import 'babel-polyfill';
import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';

render(Routes, document.getElementById('app'));