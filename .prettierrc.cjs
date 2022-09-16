module.exports = {
    printWidth: 90,
    tabWidth: 4,
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    jsxSingleQuote: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    importOrder: [
        '^[^./]*[^.]*[.]css$',
        '^[.]{1,2}/.*(?<!.css)$',
        '^[.]{1,2}/.*[.]css$',
    ],
    importOrderSortSpecifiers: true,
};
