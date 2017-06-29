// Object with function inside that is called as soon as page loads
const app = {
    init(selectors) {
        this.flicks = [] /* HERE FOR HW. When you add a new one when form is submitted, 
        you add flick to this array. Not just name. ID and all. One-liner */
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.favButton = document.querySelector(selectors.favSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this)) 
            // Bind returns a new copy of function set correctly
            // 'This' will be whatever 'this' is now
        
    }, // Don't forget comma

    renderListItem(flick) {
        const item = document.createElement('li')
        item.textContent = flick.name

        // Favorite button
        let favButton = document.createElement("fav")
        let text = document.createTextNode("Favorite")
        favButton.appendChild(text)
        document.body.appendChild(favButton)
        favButton.onclick = function() {favorite(item)}

        return item
    },

    // This is a function but still is a property, appends flick to array
    handleSubmit: function(ev) { // ev stands for event
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }
        const listItem = this.renderListItem(flick)

        // Remove button
        let removeButton = document.createElement("rem")
        let text2 = document.createTextNode("Remove")
        removeButton.appendChild(text2)
        document.body.appendChild(removeButton)        

        // Appends each entered flick to array
        this.flicks.push(flick)
        console.log(this.flicks)

        for(let i = 0; i < this.flicks.length; i++) {
            this.list.appendChild(listItem)
        }

        // REMOVING
        // this.flicks.splice(0, 1);

        this.max++
    },
}

function favorite(itemName) {
    let favClicked = false
    console.log(favClicked)
    if(favClicked == true) {
        itemName.style.backgroundColor = "darkred"
        favClicked = false
    }
    else {
        itemName.style.backgroundColor = "palevioletred"
        favClicked = true
    }
}

// Run as soon as page loads
app.init({
    formSelector:'form#flick-form',
    listSelector: '#flick-list',
}) 