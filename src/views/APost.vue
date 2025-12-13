<template>
    <div class="form">
    <h3>A Post</h3>
    <div class="row">
      <label for="body">Body</label>
      <textarea name="body" v-model="post.body"></textarea>
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
        id: null,
        body: ""
      },
    };
  },
  methods: {
    fetchPost() {
      const postId = this.$route.params.id;
      console.log("Fetching post with ID: ", postId)
      fetch(`http://localhost:3000/posts/${postId}`, {
          credentials: 'include'
        })
        .then((response) => response.json())
        .then(data => {
          console.log("Fetched post: ", data);
          this.post = data;
        })
        .catch(err => console.log(err.message))
    },
    
    updatePost() {
      const postId = this.$route.params.id;
      var data = {
        body: this.post.body
      };
      fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Post updated', data);
        this.$router.push('/');
      })
      .catch(err => console.log(err.message));
    },

    deletePost() {
      const postId = this.$route.params.id;
      fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        credentials: 'include'
      })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err.message));
    }
  },
  mounted() {
    this.fetchPost();
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
