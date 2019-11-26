<template>
  <div class="home">
    <NavBar
      bgcolor="background-color: rgba(0, 0, 0, 0.397); position: fixed; box-shadow:none; height: 80px"
    >
      <div slot="navBtn" style="margin-top: 13px; margin-rigth: 10px">
        <v-btn rounded @click="showAndClose2" color="white black--text">Login</v-btn>&nbsp;&nbsp;
        <v-btn rounded @click="showAndClose" color="white black--text">Sign in</v-btn>
      </div>
    </NavBar>

    <Banner></Banner>

    <v-container class="start" v-if="verLogin == true">
      <div class="modal2">
        <div class="login">
          <v-card>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-til> Login </v-toolbar-til>
              <span @click="showAndClose2" class="close2"> &times; </span>
              <v-spacer/>
              <v-tooltip bottom></v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field 
                  label="User" 
                  v-model="nickname" 
                  name="user" 
                  autofocus 
                  required 
                  prepend-icon="mdi-account" 
                  type="text">
                </v-text-field>
                <v-text-field 
                  id="password"
                  label="Password" 
                  v-model="pass" 
                  name="user" 
                  required 
                  prepend-icon="mdi-lock" 
                  type="password">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions style="margin-top: -20px; margin-left: 140px">
              <v-btn @click="login" style="width:140px" color="primary"> Login </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-container>

    <v-container class="registro" v-if="verRegistro == true">
      <div class="modal">
        <div class="registrarse">
          <v-toolbar id="barRegistro">
            <h1>Register User</h1>
            <span @click="showAndClose" class="close">&times;</span>
          </v-toolbar>

          <v-form id="formRegistro">
            <div id="nombre">
              <v-text-field v-model="name" label="Name" autofocus box required></v-text-field>
            </div>
            <div id="last">
              <v-text-field v-model="lastname" label="Lastname" box required></v-text-field>
            </div>
            <div id="user">
              <v-text-field v-model="user" label="User" box required></v-text-field>
            </div>
            <div id="password2">
              <v-text-field
                v-model="password"
                label="Password"
                box
                required
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'password' : 'text'"
                @click:append="show = !show"
              ></v-text-field>
            </div>

            <v-btn id="registrar" @click="register" color="white--text">Sign in</v-btn>
          </v-form>
        </div>
      </div>
    </v-container>

    <v-container id="title">
      <h1>HOW TO PLAY?</h1>
    </v-container>

    <HelloWorld></HelloWorld>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="blue">
          <div style="margin-left: 480px">
            <v-btn class="mx-4" dark icon>
              <v-icon size="28px">mdi-facebook-box</v-icon>
            </v-btn>
            <v-btn class="mx-4" dark icon>
              <v-icon size="28px">mdi-gmail</v-icon>
            </v-btn>
            <v-btn class="mx-4" dark icon>
              <v-icon size="28px">mdi-instagram</v-icon>
            </v-btn>
            <v-btn class="mx-4" dark icon>
              <v-icon size="28px">mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn class="mx-4" dark icon>
              <v-icon size="28px">mdi-twitter</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{new Date().getFullYear()}} -
          <strong>&copy; Todos los derechos reservados</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import Banner from "@/components/Banner.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    NavBar,
    Banner,
    HelloWorld
  },
  data() {
    return {
      verRegistro: false,
      nickname: '',
      pass: '',
      verLogin: false,

      name: "",
      lastname: "",
      user: "",
      password: "",
      show: true
    };
  },
  methods: {
    showAndClose() {
      if (this.verRegistro == false) {
        this.verRegistro = true;
      } else {
        this.verRegistro = false;
      }
    },

    showAndClose2() {
      if (this.verLogin == false) {
        this.verLogin = true;
      } 
      else {
        this.verLogin = false; 
      }
    },

    login() {
      if (this.nickname !== "" && this.pass !== "") {
        axios.post(`http://localhost:8045/login`, {
          nickname: this.nickname,
          password: this.pass
        })
        .then(response => {
          console.log(response.data.login);
          if (response.data.login == null) {
            alert("Este usuario no fue encontrado");
            this.nickname = ""; this.pass = "";
          }
          else {
            alert("Usuario encontrado");
            this.$router.push("/register"); 
          }
        })
        .catch(err => {
          console.error(err);
        })
      }
      else {
        alert("Complete todos los campos");
      }
    },

    register() {
      this.verRegistro = false;

      axios
        .post(`http://localhost:8045/usuarios`, {
          name: this.name,
          lastname: this.lastname,
          nickname: this.user,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
          this.name = ""; this.lastname = ""; this.user = ""; this.password = "";
        })
        .catch(err => {
          console.log(err);
        });

        this.$router.push("/register");
    }
  }
};
</script>
