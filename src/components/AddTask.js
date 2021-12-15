import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = event => {
        event.preventDefault();

        if (!text || !day) {
            alert('Please enter a Task and a valid Day & Time!');
            return;
        }

        setText('');
        setDay('');
        setReminder(false);

        onAdd({ text, day, reminder });
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label htmlFor='add-text'>Task</label>
                <input className='add-text' type='text' placeholder='Add Task'
                    value={text} onChange={event => {
                        setText(event.target.value)
                    }} />
            </div>
            <div className='form-control'>
                <label htmlFor='add-day'>Day & Time</label>
                <input className='add-day' type='text' placeholder='Add Day & Time'
                    value={day} onChange={event => {
                        setDay(event.target.value)
                    }} />
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor='set-reminder'>Reminder</label>
                <input className='set-reminder' type='checkbox'
                    value={reminder} onChange={event => {
                        setReminder(event.currentTarget.checked)
                    }} />
            </div>
            <input className='btn btn-block' type='submit' value='Save Task' />
        </form>
    )
}

export default AddTask
