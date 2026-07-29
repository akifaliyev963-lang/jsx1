import "./Uzv.css";

function Uzv(props) {
  return (
    <div className="card">
      <h2>{props.ad}</h2>

      <p>
        <strong>Vəzifə:</strong> {props.vezife}
      </p>

      <p>
        <strong>Email:</strong> {props.email}
      </p>

      <div className="btns">
        <button
          className="edit-btn"
          onClick={() => props.redakte(props.id)}
        >
          Redaktə
        </button>

        <button
          className="delete-btn"
          onClick={() => props.sil(props.id)}
        >
          Sil
        </button>
      </div>
    </div>
  );
}

export default Uzv;