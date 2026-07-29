import { useState } from "react";
import Swal from "sweetalert2";
import "./components/App.css";
import Uzv from "./components/Uzv";

function App() {
  const [komanda, setKomanda] = useState([
    {
      id: 1,
      ad: "Akif Əliyev",
      vezife: "Frontend Developer",
      email: "akif@gmail.com",
    },
    {
      id: 2,
      ad: "Aysel Məmmədova",
      vezife: "UI/UX Designer",
      email: "aysel@gmail.com",
    },
  ]);

  const [axtaris, setAxtaris] = useState("");
  const [filtr, setFiltr] = useState("");

  function uzvElaveEt() {
    Swal.fire({
      title: "Yeni Üzv",
      html: `
        <input id="ad" class="swal2-input" placeholder="Ad">
        <input id="vezife" class="swal2-input" placeholder="Vəzifə">
        <input id="email" class="swal2-input" placeholder="Email">
      `,
      showCancelButton: true,
      confirmButtonText: "Əlavə et",
      cancelButtonText: "Ləğv",
      preConfirm: () => {
        const ad = document.getElementById("ad").value;
        const vezife = document.getElementById("vezife").value;
        const email = document.getElementById("email").value;

        if (!ad || !vezife || !email) {
          Swal.showValidationMessage("Bütün sahələri doldurun!");
          return false;
        }

        return { ad, vezife, email };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const yeniUzv = {
          id: Date.now(),
          ad: result.value.ad,
          vezife: result.value.vezife,
          email: result.value.email,
        };

        setKomanda([...komanda, yeniUzv]);

        Swal.fire({
          icon: "success",
          title: "Uğurlu!",
          text: "Yeni üzv əlavə olundu.",
        });
      }
    });
  }

  function uzvSil(id) {
    Swal.fire({
      title: "Əminsiniz?",
      text: "Bu üzv silinəcək!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "Xeyr",
    }).then((result) => {
      if (result.isConfirmed) {
        setKomanda(komanda.filter((uzv) => uzv.id !== id));

        Swal.fire({
          icon: "success",
          title: "Silindi!",
          text: "Üzv uğurla silindi.",
        });
      }
    });
  }

  function redakteEt(id) {
    const secilenUzv = komanda.find((uzv) => uzv.id === id);

    Swal.fire({
      title: "Üzvü redaktə et",
      html: `
        <input id="ad" class="swal2-input" value="${secilenUzv.ad}">
        <input id="vezife" class="swal2-input" value="${secilenUzv.vezife}">
        <input id="email" class="swal2-input" value="${secilenUzv.email}">
      `,
      showCancelButton: true,
      confirmButtonText: "Yadda saxla",
      cancelButtonText: "Ləğv",
      preConfirm: () => {
        return {
          ad: document.getElementById("ad").value,
          vezife: document.getElementById("vezife").value,
          email: document.getElementById("email").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setKomanda(
          komanda.map((uzv) =>
            uzv.id === id
              ? {
                  ...uzv,
                  ad: result.value.ad,
                  vezife: result.value.vezife,
                  email: result.value.email,
                }
              : uzv
          )
        );

        Swal.fire({
          icon: "success",
          title: "Yeniləndi!",
          text: "Məlumat uğurla dəyişdirildi.",
        });
      }
    });
  }

  const filterUzvler = komanda.filter((uzv) => {
    const adUygun = uzv.ad
      .toLowerCase()
      .includes(axtaris.toLowerCase());

    const vezifeUygun =
      filtr === "" || uzv.vezife === filtr;

    return adUygun && vezifeUygun;
  });

  return (
    <div className="container">
      <h1>Komanda — {komanda.length} nəfər</h1>

      <input
        type="text"
        placeholder="Ada görə axtar..."
        value={axtaris}
        onChange={(e) => setAxtaris(e.target.value)}
      />

      <br />
      <br />

      <select
        value={filtr}
        onChange={(e) => setFiltr(e.target.value)}
      >
        <option value="">Hamısı</option>
        <option value="Frontend Developer">
          Frontend Developer
        </option>
        <option value="Backend Developer">
          Backend Developer
        </option>
        <option value="UI/UX Designer">
          UI/UX Designer
        </option>
        <option value="Project Manager">
          Project Manager
        </option>
      </select>

      <br />
      <br />

      <button onClick={uzvElaveEt}>
        Üzv əlavə et
      </button>

      <hr />

      <div className="cards">
        {komanda.length === 0 ? (
          <h2>Hələ üzv yoxdur</h2>
        ) : (
          filterUzvler.map((uzv) => (
            <Uzv
              key={uzv.id}
              id={uzv.id}
              ad={uzv.ad}
              vezife={uzv.vezife}
              email={uzv.email}
              sil={uzvSil}
              redakte={redakteEt}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;