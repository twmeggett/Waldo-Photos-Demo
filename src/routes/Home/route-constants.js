import { addNavLinks } from '../../common-ui/Header/components/Header';
import { getDict } from '../../common-ui/I18n';

export const HOME_ROUTE = '/';

addNavLinks({ href: HOME_ROUTE, text: getDict('nav.home') });
