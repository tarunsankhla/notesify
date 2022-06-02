function ShowDate(date: String): String {
	// console.log("show date", date);
	let dateArray = date.split(" ");
	return dateArray.slice(1).join(" ");
}

export default ShowDate;
