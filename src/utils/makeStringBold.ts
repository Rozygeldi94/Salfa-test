export const makeStringBold = (item: string, keyword: string) => {
  let regExp = new RegExp(keyword.toLowerCase(), "g");
  if (!keyword) {
    return item;
  }

  if (item.toLowerCase().indexOf(keyword.toLowerCase()) === 0) {
    console.log("test");

    return item.replace(
      keyword[0]
        .toUpperCase()
        .concat(keyword.toLowerCase().slice(1, keyword.length)),
      "<b>" +
        keyword[0]
          .toUpperCase()
          .concat(keyword.toLowerCase().slice(1, keyword.length)) +
        "</b>"
    );
  }
  return item.replace(regExp, "<b>" + keyword.toLowerCase() + "</b>");
};
