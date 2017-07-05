// Object with function inside that is called as soon as page loads
class App {
    constructor(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this)) 
            // Bind returns a new copy of function set correctly
            // 'This' will be whatever 'this' is now   
        this.load()
    }

    load() {
        const flicksJSON = localStorage.getItem('flicks') // Load JSON from localStorage
        const flicksArray = JSON.parse(flicksJSON) // convert JSON back into array

        if(flicksArray) {
            flicksArray
                .reverse()
                .map(this.addFlick.bind(this))
        }
    }

    save() {
        localStorage.setItem('flicks',JSON.stringify(this.flicks))
    }

    saveOnEnter(flick, listItem, ev) {
        if(ev.key === 'Enter') {
            this.toggleEditable(flick, listItem)
        }
    }

    toggleEditable(flick, listItem, ev) {
        const nameField = listItem.querySelector('.flick-name')
        const btn = listItem.querySelector('button.edit')
        const icon = btn.querySelector('i.fa')

        // Make no longer editable
        if(nameField.isContentEditable) {
            nameField.contentEditable = false
            icon.classList.remove('fa-check')
            icon.classList.add('fa-pencil')
            icon.classList.remove('success')

            // Save changes
            flick.name = nameField.textContent
            this.save()
        }

        // Make editable
        else {
            nameField.contentEditable = true
            nameField.focus()
            icon.classList.remove('fa-pencil')
            icon.classList.add('fa-check')
            btn.classList.add('success')
        }
    }

    moveDown(flick) {
        const i = this.flicks.indexOf(flick)
        if(i < this.flicks.length - 1) {
            this.moveUp(this.flicks[i + 1])
        }
    }

    moveUp(flick) {
        const listItem = this.list.querySelector(`[data-id="${flick.id}"]`)
    }

    favFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        flick.fav = listItem.classList.toggle('fav')
    }

    removeFlick(flick, ev) {
        // Remove from DOM
        const listItem = ev.target.closest('.flick')
        listItem.remove()
       
        // Remove from array
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)
    }

    // Take flick and make item list out of it
    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flick-name')
            .textContent = flick.name
        item
            .querySelector('button.remove')
            .addEventListener('click',this.removeFlick.bind(this, flick))
        item
            .querySelector('button.fav')
            .addEventListener('click',this.favFlick.bind(this, flick))

        return item
    }

    // Adds flick to array
    handleSubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = { // IDs in the DOM
            id: this.max + 1,
            name: f.flickName.value,
            fav: false,
        }

        this.flicks.unshift(flick) // Add each entered flick to array

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild) // Add flick to top of page list
        // Up and down arrows

        this.max++
        f.reset(); // Clears entry field after submitted
    }

}

// Run as soon as page loads
app.init({
    formSelector:'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template', // CSS selector for something with multiple classes
}) 