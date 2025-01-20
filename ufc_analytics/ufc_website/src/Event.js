import React, {useEffect, useState} from 'react'
import './Event.css'

const Event = (props) => {
    const title = props.title;
    const event = props.event;
    const result = props.result;
    const odds = props.odds;
    const [predictions, setPredictions] = useState("");
    const [open, setOpen] = useState(false);

    const openEvent = () => {
        setOpen(!open);
    }

    const parseCSV = (csvString) => {
      const rows = csvString.trim().split("\n"); // Split by newlines
      const headers = rows[0].split(","); // Extract headers from the first row
  
      // Map remaining rows into objects
      return rows.slice(1).map(row => {
          const values = row.split(",");
          return headers.reduce((acc, header, index) => {
              acc[header] = values[index];
              return acc;
          }, {});
      });
  };

    useEffect(() => {
        const loadPredictions = async () => {
          try {
            const response = await fetch(`${event}.csv`);
            if (!response.ok) {
              throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            const data = await response.text();
            const parsedPredictions = parseCSV(data); // Parse CSV into objects
            console.log(parsedPredictions); // Inspect the array of objects

            // Now `parsedPredictions` is an array, so you can use .map
            parsedPredictions.map(prediction => {
                console.log(`Red: ${prediction.RedFighter}, Blue: ${prediction.BlueFighter}, Result: ${prediction.Result}`);
                return null;
            });

            setPredictions(parsedPredictions);
          } catch (error) {
            console.error('Error loading predictions:', error);
          }
        };
    
        if (event) {
          loadPredictions();
        }
      }, [event]);

//     useEffect(() => {
//       fetch('http://127.0.0.1:5051/predictions', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ event: event })
//       })
//       .then(response => response.json())
//       .then(data => {
//           setPredictions(data);
//           console.log('Success:', data);
//       })
//       .catch((error) => {
//           console.error('Error:', error);
//           console.log('There was a problem getting the predictions')
//       });
//   }, []);

    return (
        <div className='preds'>
            <div className='row' onClick={() => openEvent()}>
                <h1 className='title'>{title}</h1>
            </div>
            {open && (
                <div>
                    <div className='labels'>
                        <p>Blue Fighter</p>
                        <p>Red Fighter</p>
                        <p>Our Prediction</p>
                        <p>Betting Odds Prediction</p>
                        <p>Winner</p>
                    </div>
                    {predictions.map((entry, index) => (
                        <div key={index} className='entry'>
                            <p>{entry.BlueFighter}</p>
                            <p>{entry.RedFighter}</p>
                            <p>{parseInt(entry.Result) === 0 ? 'Blue' : 'Red'}</p>
                            <p>{odds[index] === 0 ? 'Blue' : 'Red'}</p>
                            <p className={parseInt(entry.Result) === result[index] ? 'green' : 'red'}>{result[index] === 0 ? 'Blue' : 'Red'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Event