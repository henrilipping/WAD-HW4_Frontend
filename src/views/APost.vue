<template>
    <div class="form">
    <h3>A Post</h3>
    <div class="row">
      <label for="body">Body</label>
      <textarea name="body" v-model="post.body"></textarea> <!--used AI to find how to get the text from the post to the textarea (prompt: In html how to show an element's (fetched from database) body text in a textarea.-->
    </div>
    <div class="container">
      <button @click="updatePost" class="center">Update</button>
      <button @click="deletePost" class="center">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: '',
        body: ''
      }
    };
  },
  methods: {
    fetchPost(id) { // for getting a single post. Used AI for debugging, finding why text was not displayed in the textarea. Used it to help write some checks to see where the program was running into problems. (Helped come to the realization that the backend had not been restarted after modifications.)
      console.log("Fetching post with ID: ", id)
      fetch(`http://localhost:3000/posts/${id}`, {
          credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message))
    },
    
    updatePost() {
      fetch(`http://localhost:3000/posts/${this.post.id}`, {
        method: 'PUT',
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

    deletePost() {
      fetch(`http://localhost:3000/posts/${this.post.id}`, {
        method: "DELETE",
        credentials: 'include',
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        console.log(response.data);
        this.$router.push('/')
      })
      .catch(err => console.log(err.message));
    }
  },
  mounted() {
    this.fetchPost(this.$route.params.id);
  }
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
