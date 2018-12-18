import Polyglot from 'node-polyglot';
import dict from './dict';

const locale = window.localStorage.getItem('locale') || 'en';
const polyglot = new Polyglot({
  locale,
  phrases: dict,
});

export function getDict(phrase, interpObj) {
  return polyglot.t(phrase, interpObj);
};
