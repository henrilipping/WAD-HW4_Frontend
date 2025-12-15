<template>
  <div class="form">
    <h3>Add Post</h3>
    <div class="row">
      <label for="body">Body</label>
      <textarea name="body" v-model="post.body"></textarea>
    </div>
    <div class="container">
      <button @click="addPost" class="center">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        body: ''
      }
    };
  },
  methods: {
    addPost() {
      fetch(`http://localhost:3000/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ body: this.post.body })
      })
          .then(response => {
            console.log(response.data);
            this.$router.push('/');
          })
          .catch(err => console.log(err.message));
    },
  },
}
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
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 28%;
}
.container {
  display: flex;
  justify-content: center;
}
.row {
  display: flex;
  gap: 50px;
  justify-content: center;
  margin-bottom: 12px;
}
</style>
