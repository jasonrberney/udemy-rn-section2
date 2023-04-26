import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
// access status bar of phone (clock, battery, etc.)
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText) {
    console.log(enteredGoalText);
    // previous state is automatically pass in as param to function when setting state
    // FlatList will automatically look for a key property
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={"#a065ec"}
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            // ScrollView is great for long text articles, but it is going to render everything
            // which can become a problem with dynamic lists - instead use FlatList
            // FlatList will automatically look for a key property, try using objects with a 'key' property, however
            // in the demo we are using keyExtractor below
            data={courseGoals}
            // item and index are provided to extract a key from the object
            keyExtractor={(item, index) => {
              return item.id;
            }}
            renderItem={(itemData) => {
              // itemData.item holds the data for the item
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

// styles do not cascade in React Native
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 60,
  },
  goalsContainer: {
    flex: 5,
  },
});
