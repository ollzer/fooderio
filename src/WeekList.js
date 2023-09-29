import * as React from "react";

function MenuItem(props) {
  const {data} = props
  return(
    <React.Fragment>{data.Name}, </React.Fragment>
  )
}

function Meal(props) {
  const {data} = props
  const MenuMap = data.MenuItems.map((MenuItemData) => (
    <MenuItem data={MenuItemData}></MenuItem>
  ));
  return(
    <div>
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


export default function WeekList(props) {
    const url = "wp-json/mape/v1/lunch-menu/get-menu/fi/45371f8c-56a5-4c2d-8292-29949e842bb5";
    const [foodData, setFoodData] = React.useState([])
    const [menu, setMenu] = React.useState()

    React.useEffect(() => {
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setFoodData(data)
        })
    }, [])

    React.useEffect(() => {
        if(foodData == null) {return}
        if(foodData.length<1) {return}
        if(foodData[0].Menus == null) {return}
        if(foodData[0].Menus.length < 1) {return}
        if(foodData[0].Menus[0].MenuDates == null) {return}
        if(foodData[0].Menus[0].MenuDates.length < 1) {return}
        
        const MenuData = <Menu data={foodData[0].Menus[0]}></Menu>

        setMenu(MenuData)
        
    }, [foodData]);

  return (
    <React.Fragment>{menu}</React.Fragment>
  );
}
