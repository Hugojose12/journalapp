import React, { useEffect, useRef, useMemo } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote } from '../../actions/notes';

export const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { body, title } = formValues;

    const activeId = useRef( note.id )

    const dispatch = useDispatch()

    useEffect(() => { 
        if(note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {

        if( note.url !== formValues.url ){
            formValues.url = note.url
        }

        dispatch(activeNote(formValues.id, {...formValues}))
        
    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value = {title}
                    name = "title"
                    onChange = {handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value = {body}
                    name = "body"
                    onChange = {handleInputChange}
                ></textarea>

               { (note.url) &&
                    <div className="notes__image">
                        <img 
                            src={note.url}
                            alt="imagen"
                        />
                    </div>}


            </div>

        </div>
    )
}
