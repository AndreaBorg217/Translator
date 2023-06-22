# Translator

This project was developed in Angular using Material components.  

## Features
- Searchable dropdowns to pick an input and target language allowing one to swap the chosen languages
- The country code for a given language is used to obtain an emoji of the country's flag.  This is subject to change depending on one's OS and browser.
- Text to speech of the input text and translation
- Voice input
- Copying of a translation to clipboard

## APIs
It uses MyMemory's APIs to obtain a list of available languages and for the translation.  It also uses the Web Speech API for text to speech and voice recognition.  The navigator.clipboard API is used to copy a translation.

## Running the app.

Make sure you have node.js and npm installed.  Run `npm install` to install the required libraries.  Then run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

<p align="center">
  <img src="Screenshots\Screenshot 2023-06-18 at 22.53.16.png">
</p>
