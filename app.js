const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Question = require('./models/Question');
const { collection } = require('./mongo');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quizdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/api/questions', async (req, res) => {
  
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.post("/",async(req,res)=>{
      const {QuizResults}=req.body

      const data={
           QuizResults:QuizResults
      }

    await collection.insertMany([data])
})
app.listen(8000,()=>{
    console.log("port connected")
})
