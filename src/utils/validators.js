exports.validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@(gmail|outlook)\.com$/;
    return re.test(email);
  };
  
  exports.validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/;
    return re.test(password);
  };
  