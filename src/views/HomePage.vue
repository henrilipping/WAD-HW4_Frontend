<template>
  <body>
    <section class="bars">
      <aside class="sidebar"></aside>
      <main>
        <button class="logout" @click="Logout">Logout</button>
        <!--loops threw all of the posts from the store, creates a Post (that comes from BlogPost.vue)-->
        <div class="post" v-for="post in posts" :key="post.id" :post="post" @click="openPost(post.id)">
          <div class="post-header">
              <p class="date">{{ formatDate(post.created) }}</p>
          </div>
          <p class="message">{{ post.body }}</p>
        </div>
        <div class="buttons">
          <button class="addpost-btn" @click="goToAddPost">Add post</button>
          <button class="delete" @click="deleteAllPosts">Delete All</button>
        </div>
      </main>
      <aside class="sidebar"></aside>
    </section>
  </body>
</template>

<script>
import auth from "../auth";
export default {
  name: "HomePage",
  components: {
  },
   data: function() {
    return {
    posts:[ ],
    authResult: auth.authenticated()
    }
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },

    async fetchPosts() {
      fetch('http://localhost:3000/posts', {
          credentials: 'include'
        })
        .then((response) => response.json())
        .then(data => this.posts = data)
        .catch(err => console.log(err.message))
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString(
        'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
    },

    openPost(id) {
      console.log("opening post with ID: ", id)
      this.$router.push(`/apost/${id}`);
    },

    goToAddPost() {
      this.$router.push("/addpost");
    },

    async deleteAllPosts() {
      fetch("http://localhost:3000/posts", {
        method: "DELETE",
        credentials: 'include'
      })
      .then(() => this.fetchPosts());
    },
  }, 
  mounted() {
    this.fetchPosts();
  },
  // watch: {
  //   $route() {
  //     this.fetchPosts();
  //   }
  // }
}
</script>

<style scoped>
* {
    font-family: monospace;
    font-size: 17px;
    box-sizing: border-box;
}

.post {
    background-color: #d3d3d3;
    border-radius: 10px;
    padding: 8px;
}

.post > div { 
  display: flex;
  justify-content: flex-end;
}

.date {
  font-size: 14px;
}

.message {
    padding-left: 3px;
    margin: 0px, 5px;
    text-align: left;
}

.bars {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.sidebar {
    width: 200px;
    background-color: #bfbfbf;
    margin: 3px;
    border-radius: 10px;
    max-width: 100px;
}

main {
    display: flex;
    flex-direction: column;
    flex:1;
    gap: 20px;
    margin: 3px;
}

@media (max-width: 600px) {
    .sidebar {
        display: none;
    }
    #header {
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .nav {
        flex-direction: column;
        gap: 10px;
    }
    main {
        margin: 10px;
        justify-content: center;
    }
}

.logout {
  max-width: 150px;
  height: auto;
  align-content: center;
  margin: auto;
  border-radius: 5px;
  background-color: rgb(36, 147, 202);
  border: 0;

}

.logout:hover {
  background-color: rgb(43, 177, 244);
}
.buttons {
  display: flex;
  justify-content: space-between;
}

.delete {
  max-width: 150px;
  height: auto;
  align-content: center;
  margin: auto;
  border-radius: 5px;
  background-color: rgb(36, 147, 202);
  border: 0;
}
.delete:hover {
  background-color: rgb(43, 177, 244);
}

.addpost-btn {
  max-width: 150px;
  height: auto;
  align-content: center;
  margin: auto;
  border-radius: 5px;
  background-color: rgb(36, 147, 202);
  border: 0;
}
.addpost-btn:hover {
  background-color: rgb(43, 177, 244);
}
</style>
