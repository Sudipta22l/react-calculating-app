
// get expense data from local storage
const getData = () => {
  if(localStorage.expenses){
    return JSON.parse(localStorage.getItem('expenses'));
  } else {
    localStorage.setItem('expenses', JSON.stringify([]));
  }
}

// get deposit data from local storage
export const getDepositData = () => {
  if(localStorage.deposit){
    return JSON.parse(localStorage.getItem('deposit'));
  } else {
    localStorage.setItem('deposit', JSON.stringify([]));
  }
}

// get only years entered in the database; like [2000, 2001, 2002]
export const getYears = (props) => {
  const allData = (props === 'depos') ? getDepositData() : getData();
  let years = [];

  allData.map((data) => {
    if(years.indexOf(new Date(data.date).getFullYear()) === -1) {
      years.push(new Date(data.date).getFullYear());
    }
    return '';
  });

  return years;
}

// calculating total expenses of wanted year.
export const getYearlyExpenses = (year) => {
  const allData = getData();
  let total = 0;
  allData.map((data) => {
    if(parseInt(new Date(data.date).getFullYear()) === parseInt(year)) {
      total = total + parseInt(data.amount);
    }
    return '';
  });

  return total;
}

export const getYearlyDeposit = (year) => {
  const allData = getDepositData();
  let total = 0;
  allData.map((data) => {
    if(parseInt(new Date(data.date).getFullYear()) === parseInt(year)) {
      total = total + parseInt(data.amount);
    }
    return '';
  });

  return total;

}

export const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// get all data of a year send through argument
export const getYearData = (year, props) => {
  const allData = (props === 'depos') ? getDepositData() : getData();
  let currentYrData = [];
  allData.map((data) => {
    if (parseInt(new Date(data.date).getFullYear()) === parseInt(year)) {
      currentYrData.push(data);
    }
    return '';
  });

  return currentYrData;

}

// get only month entered in the database in a perticular year, send via argument; like [0, 1, 2]
export const getMonths = (year, props) => {
  const allData = (props === 'depos') ? getYearData(year, 'depos') : getYearData(year);
  let months = [];
  allData.map((data) => {
    if(months.indexOf(new Date(data.date).getMonth()) === -1) {
      months.push(new Date(data.date).getMonth());
    }
    return '';
  });
  return months;
}

// get total expenses of a month
export const getMonthlyExpenses = (year, month) => {
  const allData = getYearData(year);
  let total = 0;
  allData.map((data) => {
    if(parseInt(new Date(data.date).getMonth()) === parseInt(month)) {
      total = total + parseInt(data.amount);
    }
    return '';
  });
  return total;
}

export const getMonthlyDeposit = (year, month) => {
  const allData = getYearData(year, 'depos');
  let total = 0;
  allData.map((data) => {
    if(parseInt(new Date(data.date).getMonth()) === parseInt(month)) {
      total = total + parseInt(data.amount);
    }
    return '';
  });
  return total;
}

// get all data of a month of a perticular year send through argument
export const getMonthData = (year, month, props) => {
  const allData = (props === 'depos') ? getYearData(year, 'depos') : getYearData(year);
  let currentMonthData = [];
  allData.map((data) => {
    if(parseInt(new Date(data.date).getMonth()) === parseInt(month)) {
      currentMonthData.push(data);
    }
    return '';
  });
  return currentMonthData;
}

// get only date entered in the database in a perticular year's perticular month, send via argument; like [0, 1, 2, 15, 23, 31]
export const getDays = (year, month, props) => {
  const allData = (props === 'depos') ? getMonthData(year, month, 'depos') : getMonthData(year, month);
  let days = [];
  allData.map((data) => {
    if(days.indexOf(new Date(data.date).getDate()) === -1) {
      days.push(new Date(data.date).getDate());
    }
    return '';
  });
  return days;
}

// get total expenses of a day
export const getDalyExpenses = (year, month, day) => {
  const allData = getMonthData(year, month);
  let total = 0;
  allData.map((data) => {
    if(parseInt(new Date(data.date).getDate()) === parseInt(day)) {
      total = total + parseInt(data.amount);
    }
    return '';
  });
  return total;
}

export const getDalyDeposit = (year, month, day) => {
  const allData = getMonthData(year, month, 'depos');
  let total = 0;
  allData.map((data) => {
    if(parseInt(new Date(data.date).getDate()) === parseInt(day)) {
      total = total + parseInt(data.amount);
    }
    return '';
  });
  return total;
}

// get all expenses of a date
export const getDayData = (year, month, day, props) => {
  const allData = (props === 'depos') ? getMonthData(year, month, 'depos') : getMonthData(year, month);
  let currentDayData = [];
  allData.map((data) => {
    if(parseInt(new Date(data.date).getDate()) === parseInt(day)) {
      currentDayData.push(data);
    }
    return '';
  });
  return currentDayData;
}


// console.log('from data page', getDayData('2022', 3, 1));


export default getData;
