import React, { useEffect, useState } from "react";
import classes from "./AvaliableMeals.module.css";
import Cards from "../UI/Cards";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const resData = await fetch(
        "https://reacthooks-7e18f-default-rtdb.europe-west1.firebasedatabase.app/food.json"
      );
      if (!resData.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await resData.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchData().catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading Meals...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.Error}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={classes.meals}>
      <Cards>{mealsList}</Cards>
    </section>
  );
};

export default AvailableMeals;
