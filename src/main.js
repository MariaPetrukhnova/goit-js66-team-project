import { firebase } from './partials/firebase';
import { refsEl } from '../src/partials/refs.js';
import { calendarTools } from './partials/calendar';
import { loadWeatherDate } from './partials/weather';
import { fetchPopularNews } from './partials/try_api';
import { changeTheme, addDarkClassToHTML } from './partials/theme-toggle';
import { toggleMenu } from './partials/mobile-version';
import {} from './partials/categories.js';
import { apiCategoties } from './partials/api-categories';
import * as articles from './partials/articles';
import { apiFetchNewsByValue } from './partials/apiFetchNewsByValue';
import {} from './partials/paginations';
import * as localeStorage from './partials/localeStoreageHandler';

if (window.location.pathname === '/') {
    document.querySelector('.navbar__link')?.classList?.add('navbar__link--current')
} else {
    document.querySelector(`.navbar__link[href=".${window.location.pathname}"]`)?.classList?.add('navbar__link--current')
}

