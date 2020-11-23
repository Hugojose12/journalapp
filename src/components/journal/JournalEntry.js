import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const note = {
        date,
        title,
        body,
        url
    }

    const handleActivateNote = () => {
        dispatch( activeNote(id, note))
   } 

    return (
        <div 
            className="journal__entry pointer"
            onClick = {handleActivateNote}
        >
            
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${ url })`
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('do')}</h4>
            </div>

        </div>
    )
}
