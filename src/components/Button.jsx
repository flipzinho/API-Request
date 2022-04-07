export default function Button({text, onClick, disabled}){ 
    
    return(
        
        <button className="button" 
        disabled={disabled}
        onClick={onClick} >
          {text}
         </button>
    )
}