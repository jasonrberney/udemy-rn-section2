import { View, Text, StyleSheet, Pressable, Modal } from "react-native";

function GoalItem(props) {
  return (
    <View
      // View has consistent styling between iOS and Android (rounded corners on elements)
      style={styles.goalItem}
    >
      <Pressable
        // bind allows you to preconfigure a function for future execution
        onPress={props.onDeleteItem.bind(this, props.id)}
        andoird_ripple={{ color: "#dddddd" }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
