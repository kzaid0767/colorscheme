const form = document.getElementById('main-form')
const colorsContainer = document.getElementById('colors-container')

let hexArray=[]
const colorCount = 11

alert(`Click on the hex color to copy it to clipboard`)

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const data = new FormData(form)
    const hex = data.get('color').slice(1,)
    const scheme = data.get('scheme')
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${scheme}&count=${colorCount}`)
        .then(res => res.json())
        .then(data => {
            
            for(let item of data.colors){
                hexArray.push(item.hex.value)
            }

            renderColors(hexArray)

        })
})

function renderColors(arr){
    colorsContainer.innerHTML = ``
    
    let htmlString = arr.map((item) => `
            <div>
                <div data-color="${item}" class="each-color" style="background-color:${item};"></div>
                <p data-color="${item}">${item}</p>
            </div>
        `).join('')
    
    colorsContainer.innerHTML = htmlString
    hexArray = []
}

//copying hex color

document.addEventListener('click', (e)=>{
     let hexColor = e.target.dataset.color
    if(hexColor){
        navigator.clipboard.writeText(hexColor)

        // Alert the copied text
        alert(`The hex color ${hexColor} was copied to clipboard`)
    }
})