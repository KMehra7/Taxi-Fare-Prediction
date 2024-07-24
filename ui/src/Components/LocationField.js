import React,{useState, useEffect} from "react";


export default function LocationField (props){
    
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [place,setPlace]=useState({
        placeName:'',
        lat:'',
        lon:''
    })
    function handleFormData(){
        props.setFormData(prevState => ({
            ...prevState,
            [`${props.name}`]: place.placeName,
            [`${props.name}_latitude`]: place.lat,
            [`${props.name}_longitude`]: place.lon
          }));
    }
    
    useEffect(() => {
        handleFormData();
        if(!place.placeName.includes('New York')){
            setQuery('')
        }
      }, [place]);    

      useEffect(() => {
        
      }, [props]);    

    function LocationSuggestion({place_name,lat,lon}){
        const handleClick = () => {
            setPlace({
              placeName: place_name,
              lat: lat,
              lon: lon
            });
            setQuery(place_name);
            setResults([])
          };
        return (
        <div
            style={{
              padding: '10px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
            contentEditable={false}
            onClick={handleClick}

          >
            {place_name}
          </div>
        )
    }  
    

    const handleInputChange = (event) => {
        setQuery(event.target.value);
      
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${event.target.value}&format=json`)
          .then(response => response.json())
          .then(data => {
            setResults(data);
          })
          .catch(error => {
            console.error(error);
          });
      }
      
  
    return (
      <div>
        <input
          type="text"
          placeholder={props.value}
          value={query}
          onChange={handleInputChange}
        />
        <ul>
          {results.map(result => {
            return (
                <div>
                    <li key={result.place_id}>
                        <LocationSuggestion place_name={result.display_name} lat={result.lat} lon={result.lon}/>
                    </li>
                </div>
              )
        })}
        </ul>
      </div>
    );
}
