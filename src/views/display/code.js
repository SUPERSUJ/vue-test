const code = `
  <template>
    <div>
      <input v-model="message">
      <p :class="{'red': !!message }">{{message}}</p>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          message: '',
        };
      }
    }
  </script>
  <style>
    .red {
      color: red;
    }
  </style>
`;

export default code;
