import React from 'react';
import { Text, Button, View, ScrollView, StyleSheet, Switch, TextInput } from 'react-native';

// unique id for each todo
let id = 0

const Todos = (props) => (
  <View style={styles.li}>
    <Switch value={props.todos.checked} onValueChange={props.onToggle}></Switch>
    <Button onPress={props.onDelete} title='delete'/>
    <Text>{props.todos.text}</Text>
  </View>
)

export default class App extends React.Component {

  // state 
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      text: '',
    }
  }

  // lifecycle method
  addTodos() {
    const text = this.state.text
    if(text != '') {
      this.setState({
        todos: [...this.state.todos, {id: id++, text: text, checked: false}],
        text: '',
      })
    }
  }

  handleChangeText(newText) {
    this.setState({
      text: newText,
    })
  }

  // lifecycle method
  removeTodos(id) {
    this.setState({
      todos: this.state.todos.filter(todos => todos.id !== id)
    })
  }

  // lifecycle method
  toggleTodos(id) {
    this.setState({
      todos: this.state.todos.map(todos => {
        if(todos.id !== id) return todos
        return {
          id: todos.id,
          text: todos.text,
          checked: !todos.checked,
        }
      })
    })
  }

  render() {
    return (
      <View style={styles.fill}>
        <View style={styles.header}>
          <Text style={styles.text}>Total todos: {this.state.todos.length}</Text>
          <Text style={styles.text}>Unchecked Todos: {this.state.todos.filter(todos => todos.checked !== true).length}</Text>
          <Text style={styles.text}>Checked Todos: {this.state.todos.filter(todos => todos.checked !== false).length}</Text>
        </View>
        <View style={[styles.li, styles.li_extend]}>
          <TextInput
            style={styles.textInput}
            onChangeText={newText => this.handleChangeText(newText)}
            defaultValue={this.state.text}
          />
          <Button onPress={() => this.addTodos(this.state.text)} title='add todo'/>
        </View>
        <ScrollView style={styles.fill}>
          {this.state.todos.map(todos => (<Todos onToggle={() => this.toggleTodos(todos.id)} onDelete={() => this.removeTodos(todos.id)} todos={todos}/>))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  li: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    marginLeft: 20,
  }, 
  li_extend: {
    justifyContent: "center", 
    marginTop: 20,
    marginLeft: -10, 
  },
  header: {
    paddingTop: 40,
    marginLeft: 20,
  },
  fill: {
    flex: 1,
  },
  textInput: {
    height: 40, 
    width: 800,
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 10,
  },
  text: {
    fontSize: 25,
  }
})