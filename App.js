import axios from "axios";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ListItem from "./ListItem";

import React from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  const handleGetRequest = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      setData([...data, response.data]);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Form */}
      <TextInput
        placeholder="Title"
        value={formData.title}
        onChangeText={(text) => handleInputChange("title", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={formData.body}
        onChangeText={(text) => handleInputChange("body", text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handlePostRequest} style={styles.button}>
        <Text style={styles.buttonText}>Create New Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGetRequest} style={styles.button}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      {/* Display Data */}
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "80%",
  },
});

export default App;
