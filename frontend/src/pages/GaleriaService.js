import React, { useState } from "react";
import axios from "axios";

const GaleriaService = () => {
  const [galeriaId, setGaleriaId] = useState(null);
  const [formData, setFormData] = useState({
    galeria_leiras: { magyar: "", angol: "" },
    kep_leiras: { magyar: "", angol: "" },
    kepek: [],
    fotos_neve: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      kepek: files,
    });
  };

  const addInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.name = "kepek[]";
    input.multiple = true;

    const br = document.createElement("br");

    document.getElementById("kepek").before(input, br);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "kepek") {
          formData.kepek.forEach((file) => {
            formDataToSubmit.append("kepek[]", file);
          });
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:8000/api/galeria/store",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Galeria létrehozva:", response.data);

      const { galeria_id } = response.data;
      setGaleriaId(galeria_id);

    } catch (error) {
      console.error("Hiba történt a galéria létrehozása során:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="galeria_leiras_magyar">Galéria leírása (Magyar):</label>
      <input
        type="text"
        name="galeria_leiras[magyar]"
        id="galeria_leiras_magyar"
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="galeria_leiras_angol">Galéria leírása (Angol):</label>
      <input
        type="text"
        name="galeria_leiras[angol]"
        id="galeria_leiras_angol"
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="kep_leiras_magyar">Kép leírása (Magyar):</label>
      <input
        type="text"
        name="kep_leiras[magyar]"
        id="kep_leiras_magyar"
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="kep_leiras_angol">Kép leírása (Angol):</label>
      <input
        type="text"
        name="kep_leiras[angol]"
        id="kep_leiras_angol"
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="kepek">Képek:</label>
      <input
        type="file"
        name="kepek[]"
        id="kepek"
        multiple
        onChange={handleFileChange}
        required
      />
      <button type="button" onClick={addInput}>
        További kép kiválasztása
      </button>
      <br />

      <label htmlFor="fotos_neve">Fotós neve:</label>
      <input
        type="text"
        name="fotos_neve"
        id="fotos_neve"
        onChange={handleChange}
        required
      />
      <br />

      <button type="submit">Galéria létrehozása</button>
    </form>
  );
};

export default GaleriaService;
