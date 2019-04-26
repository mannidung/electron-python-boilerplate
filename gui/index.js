// Import client API
const API = require("../client/api_client").API

// Variables holding the input field and output div
let input_field = document.querySelector('#echo')
let output_div = document.querySelector('#output')

// Add an event listener to the input filed
input_field.addEventListener('input', () => {
    // Call API
    API.echo(input_field.value, (result) => {
        console.log("In add events listener: " + result)
        output_div.textContent = result
    })
})

// Add event to input field
input_field.dispatchEvent(new Event('input'))