async function fetchText() {
  /*fetch currency exchange data*/
  let response = await fetch(
    "https://api.currencyapi.com/v3/latest?apikey=UdkrueOHBjiJCVxKNOo6F25KOfyWGymxRKJZDYZt"
  );
  let datax = await response.json();
  const data = datax.data;
  const arrayOfData = Object.entries(data);

  let names_values = arrayOfData.map((el) => {
    let name_value_obj = el[1];
    console.log("NEW STRUTRE", Object.values(name_value_obj));
    return Object.values(name_value_obj); // update data structure
  });
  console.log("return", names_values);
  return names_values;
}
