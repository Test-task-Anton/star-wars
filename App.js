import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import Person from './components/Person';
import axios from 'axios';


export default function App() {
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [droidCount, setDroidCount] = useState(0);

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then(response => {
        setPeople(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log(people.length);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Fans</Text>
        <View style={styles.sectionCounters}>
          <View style={styles.sectionCounter}>
            <Text style={styles.counter}>{femaleCount}</Text>
            <Text style={styles.counterName}>Female Fans</Text>
          </View>
          <View style={styles.sectionCounter}>
            <Text style={styles.counter}>{maleCount}</Text>
            <Text style={styles.counterName}>Male Fans</Text>
          </View>
          <View style={styles.sectionCounter}>
            <Text style={styles.counter}>{droidCount}</Text>
            <Text style={styles.counterName}>Others</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => {
            setMaleCount(0);
            setFemaleCount(0);
            setDroidCount(0);
          }}
        >
          <Text style={styles.resetText}>Clear Fans</Text>
        </TouchableOpacity>


        <View style={styles.items}>
          {people.map(person => (
            <Person 
              key={person.created} 
              person={person}
              maleFunc={(newCount) => setMaleCount(newCount)}
              femaleFunc={(newCount) => setFemaleCount(newCount)}
              droidFunc={(newCount) => setDroidCount(newCount)}
            />
          ))}
        </View>
        <View style={styles.buttonWrapper}>
          <Button 
            title="Prev"
            style={styles.button}
            disabled={currentPage === 1} 
            onPress={handlePrevPage} 
          />
          <Button 
            title="Next"
            style={styles.button}
            disabled={currentPage === 9}
            onPress={handleNextPage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6ec',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionCounters: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sectionCounter: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
  counter: {
    fontSize: 24,
  },
  counterName: {
    fontSize: 18,
  },
  resetButton: {
    marginTop: 15,
    height: 35,
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    color: 'red',
    fontSize: 18,
  },
  items: {
    marginTop: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
  },
});
