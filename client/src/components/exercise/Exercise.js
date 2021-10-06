import React from 'react'
import {v4 as uuid} from "uuid"
import DemoPic from './DemoPic'


function Exercise({exercise}) {
    
    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11) ? match[2] : null;     
    }
    
    function renderVid() {
        if (exercise.youtube_url.length > 0) {
            const vidId = getId(exercise.youtube_url)
            return <><iframe width="560" height="315" title={`${exercise.name} video demonstration`} src={`//www.youtube.com/embed/${vidId}?start=${exercise.timestamp}`} frameBorder="0" allowFullScreen></iframe><button>remove video</button></>
        } 
        else {return null}
    }

    return (
        <div>

            {/*eventually, an actions will be created for deleting and editing exercise */}
            
            <h3>{exercise.name}</h3>
            {exercise.demos.length > 0 ? exercise.demos.map( (url) => <DemoPic key={uuid()} url={url} /> ) : null}  
            <br/>
            {renderVid()}
            <p>Description: {exercise.description}</p>
            <button>delete exercise</button><br/>
            <button>edit exercise</button>

        </div>
    )
}

export default Exercise
