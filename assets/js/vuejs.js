new Vue({
  el: "#main",
  data: {
    axiosConfig: {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    },
    urlApi: "https://jebg.duckdns.org/WS-Api/",
    nombre: "",
    email: "",
    mensaje: "",
    loading: false,
  },
  methods: {
    enviarEmail(event) {
      event.preventDefault();
      this.loading = true;
      let emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!emailRegex.test(this.email)) {
        Swal.fire("Advertencia", "Favor de poner un email valido", "warning");
        this.loading = false;
        return;
      }
      if (this.nombre == "" || this.mensaje == "") {
        Swal.fire(
          "Advertencia",
          "Favor de llenar los campos faltantes",
          "warning"
        );
        this.loading = false;
        return;
      }

      let params = {
        p_nombre: this.nombre,
        p_mensaje: this.mensaje,
        p_from: this.email,
        p_to: "jesusedu90@hotmail.com",
      };
      
      var vueInstance = this;
      axios
        .post(
          this.urlApi + "jwt/enviarEmail",
          JSON.stringify(params),
          this.axiosConfig
        )
        .then((res) => {
          vueInstance.loading = false;
          let data = res.data;
          if (data.return >= 0) {
            vueInstance.nombre = "";
            vueInstance.mensaje = "";
            vueInstance.email = "";  
            Swal.fire("Aviso", data.P_MENSAJE, "success");
          } else {
            Swal.fire("Advertencia", data.P_MENSAJE, "warning");
          }
        })
        .catch(function (error) {
          vueInstance.loading = false;
          console.error(error);
        });
    },
  },
});
