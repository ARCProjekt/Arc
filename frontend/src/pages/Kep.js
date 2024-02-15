export default function Kep(props) {
    function kattintas() {
      console.log("katt", props.index);
      props.kattintas(props.index);
    }
  
    return (
      <div className="kep">
        <img src={process.env.PUBLIC_URL+props.obj.src} alt="" className="img-fluid galeria-kep" onClick={kattintas} style={{
          width: '70%',
          height: '100%',
          objectFit: 'cover',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',  
          border: '2px solid #fff',  
          transition: 'transform 0.3s ease-in-out',  
        }} 
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}  
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
      </div>
    );
  }