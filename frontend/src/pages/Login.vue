<template>
  <div id="wrapper">
    <div id="login-form">
      <img id="logo" src="http://via.placeholder.com/150x150">
  
      <v-form v-model="valid">
  
        <v-text-field color="demko" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
  
        <v-text-field color="demko" type="password" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
  
      </v-form>
  
      <div class="text-xs-center">
        <v-btn round color="demko" class="font-weight-bold login-button" outline>Zaloguj się</v-btn>
      </div>
  
      <div class="text-xs-center">
        <v-btn round color="demko" class="font-weight-bold white--text register-button">Zarejestruj się</v-btn>
      </div>
  
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-page',
    data: () => ({
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
    }),
    methods: {
  
    }
  }
</script>



<style lang="scss" scoped>
  #wrapper {
    height: 100vh;
    width: 100vw;
  }
  
  #login-form {
    width: 400px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    text-align: center
  }
  
  #logo {
    width: 50%;
    margin-bottom: 30px;
  }
  
  .login-button {
    margin: 30px 0;
    width: 100%;
  }
  
  .register-button {
    margin: 0;
    width: 100%;
  }
</style>