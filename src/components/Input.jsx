export default function Input({searchValue, handleChange}){
    return(
        <input className="input" type="search" placeholder="Type your search!" value={searchValue} onChange={handleChange}/> 
    )
}