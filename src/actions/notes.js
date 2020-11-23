import { db } from "../firebase/firebaseConfig"
import {types} from '../types/types';
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNote = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

        dispatch( activeNote(doc.id, newNote))

    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes( uid )
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestone = {...note};
        delete noteToFirestone.id;
        await db.doc(`${ uid }/journal/notes/${note.id}`).update( noteToFirestone )
        .then (() => {
            dispatch( refreshNote(note.id, noteToFirestone))
            Swal.fire('Saved', note.title, 'success')
        })
        .catch(({message}) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
            })
        })

    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})


export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const {active} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file )
        active.url = fileUrl

        dispatch( activeNote(active.id, {...active}))

        Swal.close();
    }
}