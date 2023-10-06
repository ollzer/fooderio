import * as React from "react";

function MenuItem(props) {
  const {data} = props
  return(
    <React.Fragment>{data.Name}<br/></React.Fragment>
  )
}

function Meal(props) {
  const {data} = props
  const MenuMap = data.MenuItems.map((MenuItemData) => (
    <MenuItem data={MenuItemData}></MenuItem>
  ));
  return(
    <div>
      <br/>
      <b>{data.Name}</b><br />
      {MenuMap}
    </div>
  )
}

function MenuDate(props) {
  const {data} = props
  const MealMap = data.Meals.map((MealItem) => (
    <Meal data={MealItem}></Meal>
  ));
  return(
    <div>
      <h3>{data.DateString}</h3>
      {MealMap}
      <br />
    </div>
  )
}

function Menu(props) {
  const {data} = props
  const Dates = data.MenuDates.map((DateItem) => (
    <MenuDate data={DateItem}></MenuDate>
  ));
  return (
    <div>
      {Dates}
    </div>
  )
}

function isToday(dateString) {
  // Create a Date object from the string
  const dateToCheck = new Date(dateString);

  // Create a Date object for the current date
  const currentDate = new Date();

  // Compare the year, month, and day
  const isToday =
    dateToCheck.getFullYear() === currentDate.getFullYear() &&
    dateToCheck.getMonth() === currentDate.getMonth() &&
    dateToCheck.getDate() === currentDate.getDate();

  if (isToday) {
    return true
  } else {
    return false
  }
}



export default function WeekList(props) {
  const urlFi = "wp-json/mape/v1/lunch-menu/get-menu/fi/45371f8c-56a5-4c2d-8292-29949e842bb5";
  const urlSv = "wp-json/mape/v1/lunch-menu/get-menu/sv/45371f8c-56a5-4c2d-8292-29949e842bb5";
  const [foodDataFi, setFoodDataFi] = React.useState([])
  const [foodDataSv, setFoodDataSv] = React.useState([])
    const [menu, setMenu] = React.useState()

    React.useEffect(() => {
      fetch(urlFi)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setFoodDataFi(data)
        })
      fetch(urlSv)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setFoodDataSv(data)
        })
          
    }, [])

    React.useEffect(() => {
        if(foodDataFi == null) {return}
        if(foodDataFi.length<1) {return}
        if(foodDataFi[0].Menus == null) {return}
        if(foodDataFi[0].Menus.length < 1) {return}
        if(foodDataFi[0].Menus[0].MenuDates == null) {return}
        if(foodDataFi[0].Menus[0].MenuDates.length < 1) {return}
        for (let index = 0; index < foodDataFi[0].Menus[0].MenuDates.length; index++) {
          if (!isToday(foodDataFi[0].Menus[0].MenuDates[index].Date)) {
            foodDataFi[0].Menus[0].MenuDates.splice(index,1);
            index--;
          }
        }

        if(foodDataSv == null) {return}
        if(foodDataSv.length<1) {return}
        if(foodDataSv[0].Menus == null) {return}
        if(foodDataSv[0].Menus.length < 1) {return}
        if(foodDataSv[0].Menus[0].MenuDates == null) {return}
        if(foodDataSv[0].Menus[0].MenuDates.length < 1) {return}
        for (let index = 0; index < foodDataSv[0].Menus[0].MenuDates.length; index++) {
          if (!isToday(foodDataSv[0].Menus[0].MenuDates[index].Date)) {
            foodDataSv[0].Menus[0].MenuDates.splice(index,1);
            index--;
          }
        }

        if (foodDataFi[0].Menus[0].MenuDates.length > 0 && foodDataSv[0].Menus[0].MenuDates.length > 0) {
          foodDataSv[0].Menus[0].MenuDates[0].Meals.forEach(Meal => {
            foodDataFi[0].Menus[0].MenuDates[0].Meals.push(Meal)
          });
        }

        const MenuData = <Menu sx data={foodDataFi[0].Menus[0]}></Menu>

        setMenu(MenuData)
        
    }, [foodDataFi]);

  return (
    <React.Fragment>{menu}</React.Fragment>
  );
}
