const colorPicker = document.getElementById("color-picker")
const colorValue = document.getElementById('color-value')
const selectColorMenu = document.getElementById("color-menu")
const sendRequestBtn = document.getElementById("send-color-info")
const colorAndHexContainer = document.getElementById("color-section-and-hexcode")

// store the inputs values
let color = colorPicker.value 
let paletteType = selectColorMenu.value
let colorArray = []

/* display the hex value of 
the default color (black) from the color-picker */
colorValue.innerHTML = color  

/* displays the value of the color I selected, 
under the color-picker  */
colorPicker.addEventListener('change', function(event) {
    color = event.target.value
    colorValue.innerHTML = color
})

/* store the palette type, when is selected */
selectColorMenu.addEventListener('change', function(event) {
    paletteType = event.target.value
})

/* send the requested info to the Color API */
sendRequestBtn.addEventListener("click", function() {

    fetch(`https://www.thecolorapi.com/scheme?hex=${color.replace('#','')}&mode=${paletteType}`)

         // the API responds with an object of data about the requested color scheme
        .then(response => response.json())
        .then(data => renderColorHtml(data))
})


/* 1. The function iterates through the data.colors
which holds the colors from the requested scheme
and stores their hex value in an array.

2. Then it returns a html string with the color scheme and display it on the screen */
function renderColorHtml(data) {
    data.colors.forEach(c => colorArray.unshift(c.hex.value))

        let colorHtmlString =  colorArray.map(c => `
        <div class="color-section-container">
            <div class="color-section" style="background-color: ${c}" onclick()></div>
            <p class="hexcode-section"> ${c}</p>
        </div> `
       ).join('') 

       colorAndHexContainer.innerHTML = colorHtmlString
       colorArray = [] //after the color scheme is displayed, the color Array will be reseted
}