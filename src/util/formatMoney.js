function formatMoney(sign, num, c, d, t) {
    var n = num,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d === undefined ? '.' : d,
        t = t === undefined ? ',' : t,
        s = n < 0 ? '-' : '',
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
 }

 export function usDollarFormatter(value) {
    return formatMoney('$', value, 2, '.', ',');
 }

 export function currencyToNumber(value) {
  if (value !== null && value !== undefined) {
    return parseFloat(value.replace(/\$|,/g, ''));
  } else {
    return null;
  }
 }

//formatCurrency('$', 3197488.67345, 2, '.', ',') => $3,197,488.67
//formatCurrency('c', 3197488.67345, 3, '-', '.') => c3.197.488-673
