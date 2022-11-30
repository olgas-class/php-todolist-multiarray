const { createApp } = Vue;

createApp({
  data() {
    return {
      todoList: [],
      newTodo: "",
    };
  },
  created() {
    axios.get("server.php").then((resp) => {
      console.log(resp.data);
      this.todoList = resp.data;
    });
  },
  methods: {
    addTodo() {
      const data = {
        newTodo: this.newTodo,
      };

      axios
        .post("server.php", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {
          this.todoList = resp.data;
          this.newTodo = "";
        });
    },
    toggleTextDone(index) {
      const data = {
        toggleIndex: index,
      };

      axios
        .post("server.php", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {
          this.todoList = resp.data;
        });
    },
    deleteTask(index) {
      //       const data = {
      //         deleteIndex: index,
      //       };
      //
      //       axios
      //         .post("server.php", {
      //           headers: { "Content-Type": "multipart/form-data" },
      //         })
      //         .then((resp) => {
      //           this.todoList = resp.data;
      //         });

      // sintassi alternativa
      const data = new FormData();
      data.append("deleteIndex", index);
      console.log(data);
      axios.post("server.php", data).then((resp) => {
        this.todoList = resp.data;
      });
    },
  },
}).mount("#app");
