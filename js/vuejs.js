new Vue({
  el: "#home",
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
  computed: {
    isMobile: function () {
      if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
       } else {
        return false;
       }
    },
  },
  methods: {
    enviarEmail(event) {
      event.preventDefault();
      this.loading = true;
      let emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!emailRegex.test(this.email)) {
        Swal.fire("Warning", "Please put a valid email", "warning");
        this.loading = false;
        return;
      }
      if (this.nombre == "" || this.mensaje == "") {
        Swal.fire(
          "Warning",
          "Please fill in the missing fields",
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
            Swal.fire("Success", data.P_MENSAJE, "success");
          } else {
            Swal.fire("Warning", data.P_MENSAJE, "warning");
          }
        })
        .catch(function (error) {
          vueInstance.loading = false;
          console.error(error);
        });
    },
  },
});
