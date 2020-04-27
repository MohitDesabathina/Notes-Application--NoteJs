const fs = require('fs')
const chalk = require('chalk')

//const getNotes = () => {
 //   return 'Your notes...'
//}

const addNote = (title, body) => {
    const notes = loadNotes()
 // const duplicateNotes = notes.filter( (note) =>  note.title === title)
    const duplicateNotes = notes.find((note) => note.title ===title)    
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title already taken!'))
    }
}

const saveNotes =  (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote =  (title) => {
        const notes = loadNotes()
        const notestokeep = notes.filter((note) => note.title !==title )

        if(notes.length > notestokeep.length){
            console.log(chalk.green.inverse('Note removed'))
            saveNotes(notestokeep)
        }
        else{
            console.log(chalk.red.inverse('No note found'))
        }
        saveNotes(notestokeep)
     }

const listNotes= () => {
    const notes = loadNotes()
    console.log(chalk.red.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)   
    
    if(note){
       console.log(chalk.bold(note.title))
       console.log((note.body))
    }else{
       console.log(chalk.red.inverse('Error! No note found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}