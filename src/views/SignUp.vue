<template>
  <div class="form">
    <h3>SignIn</h3>
    <div class="row">
      <label for="email">Email</label>
      <input type="email" name="email" required v-model="email" />
    </div>
    <div class="row">
      <label for="password">Password</label>
      <input type="password" name="password" required v-model="password" />
    </div>
      <button @click="SignUp" class="signup">SignUp</button>
  </div>
</template>

<script>
export default {
  name: "SignUp",

  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    SignUp() {
      var data = {
        email: this.email,
        password: this.password,
      };
      // Sends data(email and password) to server
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // enabled cookies
        body: JSON.stringify(data),
      })
          .then(async (response) => {
            const data = await response.json();
            
            if (!response.ok) { // response is flase when status code is >400
              console.log(data.error);
              alert(data.error); // used AI to find how to show user an alert.
              this.$router.push("/");
              return;
            }

            console.log(data);
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error");
          });
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(214, 197, 161);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);
}
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: #2c3e4f;
  width: 75%;
  border-radius: 5px;
}
button {
  background: rgb(64, 120, 197);
  border: 0;
  padding: 10px 20px;
  margin: 20px 20px 20px 20px;
  color: white;
  border-radius: 5px;
  align-items: center;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.75);
}
button:hover {
  background-color: rgb(26, 74, 181);
}
.signup {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%;
  display: flex;
  justify-content: center;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>