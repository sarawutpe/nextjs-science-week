const regexUtil = {
  prefixStudent: (value) => {
    const regex = '^(นางสาว|นาง|นาย|เด็กหญิง|เด็กชาย)[^ ]+[ ][^ ]';
    if (new RegExp(regex, 'g').test(value)) {
      return true;
    } else {
      return false;
    }
  },
};

export default regexUtil;
