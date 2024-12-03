const RegisterClient = async (data) => {
  const user_data = data;
  try {
    const response = await fetch(
      "https://back-mistterqr-node.onrender.com/api/clientes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de incluir la cabecera Content-Type
        },
        body: JSON.stringify(user_data),
      }
    );
    // console.log('response', response)

    // Verificar si la respuesta HTTP fue exitosa
    if (!response.ok) {
      setLoading(false);
      throw new Error(`Error HTTP! status: ${response.status}`);
    }

    // Procesar la respuesta si todo fue bien
    const data = await response.json();
    console.log("Cliente registrado exitosamente:", data);

    var modal = document.getElementById("successModal");
    modal.style.display = "block";

    // Ocultar el modal después de 3 segundos y recargar la página
    setTimeout(function () {
      modal.style.display = "none";
      window.location.reload(); // Recargar la página para limpiar el formulario
    }, 3000); // 3000 ms = 3 segundos

    setLoading(false);

    // alert("¡Registro guardado!");
  } catch (error) {
    // Manejar cualquier error que ocurra
    alert(`Lo sentimos, ha ocurrido un error!: ${error}`);
    console.log("Hubo un error al registrar al cliente:", error.message);
  }
};

const sendButton = document.querySelector("#boton-enviar-formulario");
const setLoading = (loading) => {
  if (loading) {
    sendButton.setAttribute("disabled");
  } else {
    sendButton.removeAttribute("disabled");
  }
};

document
  .getElementById("solicitud")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío normal del formulario

    var formData = new FormData(this); // Recoger los datos del formulario

    const data = Object.fromEntries(formData);
    console.log(data);

    RegisterClient(data);
  });

// document
//   .getElementById("solicitud")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Evitar el envío normal del formulario

//     var formData = new FormData(this); // Recoger los datos del formulario

//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", "./php/tu_script.php", true); // Mantener la vinculación a tu archivo PHP

//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         // Mostrar el modal de éxito
//         var modal = document.getElementById("successModal");
//         modal.style.display = "block";

//         // Ocultar el modal después de 3 segundos y recargar la página
//         setTimeout(function () {
//           modal.style.display = "none";
//           window.location.reload(); // Recargar la página para limpiar el formulario
//         }, 3000); // 3000 ms = 3 segundos
//       } else {
//         alert("Error al enviar la solicitud: " + xhr.responseText);
//       }
//     };

//     xhr.send(formData); // Enviar el formulario con AJAX
// });
