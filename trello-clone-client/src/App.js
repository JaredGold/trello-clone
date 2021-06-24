import {useEffect, useState} from 'react'
import {Button, Typography, Box, Card, TextField, CardContent} from '@material-ui/core'

// import './App.css';
import { api } from './data'
import { validateInput } from './utils/validators'


function App() {
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    api.get('/cards')
      .then(({data}) => setCards(data))
  }, []);

  const addCard = async (event) => {
    event.preventDefault();
    try {
      const {data} = await api.post('/cards', {title,description})
      setTitle("")
      setDescription("")
      const cardsClone = [...cards]
      cardsClone.push({
        title: data.title,
        description: data.description,
        id: data.id
      })
      setCards(cardsClone)
    } catch(err) {
      console.log("oops:", err)
    }
    
  }

  const handleTextChange = (event, setter) => {
    // run the input through the validator function
    const textInput = event.target.value
    if (validateInput(textInput)) {
      setter(event.target.value)
    } else {
      alert("That is a naught word!")
    }
  }

  return (
    <div>
      <Typography>
        Trello Clone
      </Typography>
      {cards.map(({title, description, id}) => (
        <Box key={id}>
          <Card varient="outlined">
            <CardContent>
              <Typography>Title: {title}</Typography>
              <Typography>Description: {description}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
      <form onSubmit={addCard}>
        <TextField required onChange={(e) => handleTextChange(e, setTitle)} value={title} id="standard-basic" label="Title" />
        <TextField required onChange={(e) => handleTextChange(e, setDescription)} value={description} id="standard-basic" label="Description" />
        <Button type="submit" varient="outlined">Add Card</Button>
      </form>
    </div>
  );
}

export default App;
