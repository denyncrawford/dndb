/*jshint esversion: 8 */

const _app = new Vue({
  el: "#app",
  template: `
    <div class="p-10">
      <h1 class="text-3xl max-w-prose">Please select one of the methods bellow before making a query to use the datastore in this demo</h1>
      <p class="mt-2 max-w-prose">This is a simple server (REST API) implementation for DnDB. You can insert, find, update and remove the typed username.</p>
      <p class="mt-2 max-w-prose">- To make a update, type the old username and the new one, separated with a comma ','. <br>- If you want to fetch all users,
      just make an empty query with the find method</p>
      <select ref="method" class="mt-5 p-2 rounded border border-black">
        <option v-for="(option, i) in options" :key="i">
          {{option}}
        </option>
      </select>
      <input @keydown="error = ''; success = ''" ref="query" type="text" class="ml-5 w-60 mt-5 p-2 rounded border border-black" placeholder="Type a username">
      <button @click="makeQuery" class="bg-black mt-5 ml-2 p-2 rounded text-white">Make Query</button>
      <p v-show="error" class="mt-5 text-red-600">Error: {{error}}</p>
      <p v-show="success" class="mt-5 text-green-600">Success: {{success}}</p>
      <pre class="overflow-auto max-w-prose mt-5 p-5 rounded bg-gray-100">{{lastResponse}}</pre>
      <div class="mt-5 flex items-center">
        <h1>You can check DnDB at:</h1>
        <a href="https://dndb.crawford.ml" class="bg-black ml-2 p-2 rounded text-white">DnDB Website</a>
        <a href="https://github.com/denyncrawford/dndb" class="bg-black ml-2 p-2 rounded text-white">Github</a>
      </div>
    </div>
  `,
  data() {
    return {
      options: [
        "find",
        "findOne",
        "insert",
        "update",
        "updateOne",
        "remove",
        "removeOne",
      ],
      lastResponse: "",
      error: "",
      success: "",
    };
  },
  async mounted() {
    const { data } = await axios("/all");
    this.lastResponse = data;
  },
  methods: {
    updateResponse(response) {
      this.lastResponse = response;
    },
    async makeQuery() {
      const method = this.$refs.method.value;
      const query = this.$refs.query.value;

      switch (method) {
        case "find": {
          let findData;
          if (!query.length) findData = await axios("/all");
          else findData = await axios(`/all/${query}`);

          this.updateResponse(findData.data);
          this.success = `Fetched multiple documents matching the query: ${
            query.length ? query : "all"
          }.`;

          break;
        }
          
        case "findOne": {
          const { data: findOneData } = await axios(`/${query || null}`);

          this.updateResponse(findOneData);
          this.success = `Fetched one document matching the query: ${
            query.length ? query : null
          }.`;
          
          break;
        }

        case "insert": {
          if (!query.length) {
            return (this.error =
              "You can not insert an empty username (for this demo), please type a username.");
          }

          const { data: insertData } = await axios.post(`/${query}`);

          this.updateResponse(insertData);
          this.success = "New document inserted.";

          break;
        }

        case "update": {
          if (!query.length) {
            return (this.error =
              "You cannot update an empty username, type a username and followed by a comma the new update.");
          }

          const updateQuery = query.split(",");

          if (updateQuery.length !== 2) {
            return (this.error =
              "You must specify a update, please type a username and followed by a comma the new update.");
          }

          const { data: updateData } = await axios.put(
            `/all/${updateQuery[0].trim()}/${updateQuery[1].trim()}`,
          );

          this.updateResponse(updateData);
          this.success = `All document matching ${updateQuery[0]} updated to ${
            updateQuery[1]
          }.`;
          
          break;
        }

        case "updateOne": {
          if (!query.length) {
            return (this.error =
              "You can not update an empty username, please type a username and followed by a comma the new update.");
          }

          const updateOneQuery = query.split(",");

          if (updateOneQuery.length !== 2) {
            return (this.error =
              "You must specify a update, please type a username and followed by a comma the new update.");
          }

          const { data: updateOneData } = await axios.put(
            `/${updateOneQuery[0].trim()}/${updateOneQuery[1].trim()}`,
          );

          this.updateResponse(updateOneData);
          this.success = `The first document matching ${
            updateOneQuery[0]
          } updated to ${updateOneQuery[1]}.`;
          
          break;
        }

        case "remove": {
          let removedData;
          if (!query.length) removedData = await axios.delete("/all");
          else removedData = await axios.delete(`/all/${query}`);
          
          this.updateResponse(removedData.data);
          this.success = `Removed multiple documents matching the query: ${
            query.length ? query : "all"
          }.`;

          break;
        }

        case "removeOne": {
          const { data: removeOneData } = await axios.delete(`/${query}`);
          
          this.updateResponse(removeOneData);
          this.success = `Removed first documents matching the query: ${query}.`;
          
          break;
        }
        
        default: {
          break;
        }
      }
    },
  },
});
