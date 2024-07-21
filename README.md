https://www.chegg.com/homework-help/questions-and-answers/propose-relational-database-design-set-relation-schemata-online-food-ordering-delivery-app-q20110221


Datastructure


Hashing

1) Find top three repeated in array(https://www.geeksforgeeks.org/find-top-three-repeated-array/)



Must read knapsack

https://www.quora.com/0-1-Integer-Knapsack-problem-without-items-repeating-How-do-I-approach

https://www.codesdope.com/course/algorithms-knapsack-problem/


Ds_learning
Ds learninig

How to analyze__

Derive use cases for all the scenario

use case for no result also

Recursive function with void

return in the top of method

return in the bottom of method

Pair or duplicates_

SOrt array elements
Use 2 pointers(from start and end then slide based on the comparison value)
Duplicates__

Always try to use hasmap or hashing
or use indexing with sorted array(array[i] and array[i+1])
Leetcode 75 Questions (NeetCode on yt).xlsx

image

Dynamic programming

create extra space(like array)
initialize first one or 2 values
use these value for further computaution
each index represents subproblemsm think in sub problems way...................................... I can't generate or display screenshots directly, but I can describe what the resulting form will look like, so you know what to expect.

Expected Result
When you run the provided React code with Material-UI, you should see a page with the following elements:

Form Title: At the top, you'll see a heading saying "Questionnaire Form" in a larger font size.

10 Text Fields: Below the title, there will be 10 text fields stacked vertically, each labeled "Question 1" through "Question 10". Each text field will be full-width, with some spacing between them.

Submit Button: Below the text fields, there will be a "Submit" button centered on the form.

Steps to View the Form
Start Your Development Server: If you haven't already done so, run npm start in your project directory.

Open in Browser: Navigate to http://localhost:3000 in your web browser.

Description of the Form's Appearance
Container: The form is centered on the page within a container.
Typography: The title "Questionnaire Form" uses Material-UI's Typography component for a styled heading.
Text Fields: Each question uses the TextField component from Material-UI, providing consistent and stylish input fields.
Spacing: Each text field has margin-bottom spacing to ensure there is space between the fields.
Submit Button: The button is styled with Material-UI's Button component and has a primary color to stand out.
Code Recap
Here is the code again for clarity:

QuestionnaireForm.js:

import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const QuestionnaireForm = () => {
  const [formValues, setFormValues] = React.useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Values:', formValues);
    // Here, you can handle form submission, e.g., send data to the server
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Questionnaire Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {Object.keys(formValues).map((key, index) => (
          <Box key={key} mb={2}>
            <TextField
              fullWidth
              label={`Question ${index + 1}`}
              name={key}
              value={formValues[key]}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        ))}
        <Box mt={4}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default QuestionnaireForm;
App.js:

import React from 'react';
import QuestionnaireForm from './QuestionnaireForm';

const App = () => {
  return (
    <div>
      <QuestionnaireForm />
    </div>
  );
};

export default App;
Following these instructions, you should be able to set up and view the form on your local development environment. If you have any issues or need further assistance, feel free to ask!