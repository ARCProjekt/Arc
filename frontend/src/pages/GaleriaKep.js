export default function GaleriaKep(props) {
   
  
    return (
      <div className="kep">
        <img src={process.env.PUBLIC_URL+props.obj.src} alt="" className="img-fluid galeria-kep"  style={{
          width: '70%',
          height: '100%',
          objectFit: 'cover',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',  
          border: '2px solid #fff',  
          transition: 'transform 0.3s ease-in-out',  
        }} 
        />
      </div>
    );
  }
  