

function Movie(props) {
    const {Title, Poster, Year, Type, imdbId: id} = props;
    return (
        <div id={id} className="card movie">
            <div className="card-image">
            {
                Poster === 'N/A'? <img src={`https://placehold.co/300x400?text=${Title}`} />  : <img src={Poster} />
            }
            
            </div>
            <div className="card-content">
            <span className="card-title">{Title}</span>
            <p>{Year} <span className="right">{Type}</span></p>
            </div>
        </div>
    )
}
export {Movie};