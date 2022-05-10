function CalculateDate(date: String): Array<String>{ 
    let dateArray = date.split(" ");
    return [...dateArray.slice(0,1),...dateArray.slice(3)]
}

export default CalculateDate;