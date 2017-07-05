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

        if (flicksArray) {
            flicksArray
                .reverse()
                .map(this.addFlick.bind(this))
        }
    }

    save() {
        localStorage.setItem('flicks', JSON.stringify(this.flicks))
    }

    saveOnEnter(flick, listItem, ev) {
        if (ev.key === 'Enter') {
            this.toggleEditable(flick, listItem)
        }
    }

    toggleEditable(flick, listItem, ev) {
        const nameField = listItem.querySelector('.flick-name')
        const btn = listItem.querySelector('button.edit')
        const icon = btn.querySelector('i.fa')

        // Make no longer editable
        if (nameField.isContentEditable) {
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
        if (i < this.flicks.length - 1) {
            this.moveUp(this.flicks[i + 1])
        }
    }

    moveUp(flick) {
        const listItem = this.list.querySelector(`[data-id="${flick.id}"]`)
        const i = this.flicks.indexOf(flick)

        if (i > 0) {
            this.list.insertBefore(listItem, listItem.previousElementSibling)
            const previousFlick = this.flicks[i - 1]
            this.flicks[i - 1] = flick
            this.flicks[i] = previousFlick

            this.save()
        }
    }

    favFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        flick.fav = listItem.classList.toggle('fav')
        this.save()
    }

    removeFlick(flick, ev) {
        // Remove from DOM
        const listItem = ev.target.closest('.flick')
        listItem.remove()

        // Remove from array
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)

        this.save()
    }

    // Take flick and make item list out of it
    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id

        if (flick.fav) {
            item.classList.add('fav')
        }

        const nameSpan = item.querySelector('.flick-name')
        nameSpan.textContent = flick.name
        nameSpan.addEventListener(
            'keypress',
            this.saveOnEnter.bind(this, flick, item)
        )

        item
            .querySelector('button.remove')
            .addEventListener(
            'click',
            this.removeFlick.bind(this, flick)
            )

        item
            .querySelector('button.fav')
            .addEventListener(
            'click',
            this.favFlick.bind(this, flick)
            )

        item
            .querySelector('button.move-up')
            .addEventListener(
            'click',
            this.moveUp.bind(this, flick)
            )

        item
            .querySelector('button.move-down')
            .addEventListener(
            'click',
            this.moveDown.bind(this, flick)
            )

        item
            .querySelector('button.edit')
            .addEventListener(
            'click',
            this.toggleEditable.bind(this, flick, item)
            )

        return item
    }

    addFlick(flick) {
        this.flicks.unshift(flick)

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        if (flick.id > this.max) {
            this.max = flick.id
        }
        this.save()
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
            fav: false,
        }

        this.addFlick(flick)

        f.reset()
    }
}

const app = new App({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template'
})