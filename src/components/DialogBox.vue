<template>
  <v-dialog :value="value" @input="$emit('input')" width="40%" light>
    <v-card>
      <v-card-title>{{dialogText}}</v-card-title>
      <v-card-subtitle class="error--text">{{errorText}}</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" @click.native="$emit('input')">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="enableDeny" color="warning" @click="denyCallback">No</v-btn>
        <v-btn color="primary" @click="confirmCallback">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogBox',
  props: {
    confirmCallback: Function,
    denyCallback: Function,
    dialogText: String,
    enableDeny: Boolean,
    errorText: String,
    value: Boolean,
  },
  methods: {
    closeDialog() {
      this.$emit('input');
    },
  },
};
</script>

<style lang="scss">
.v-dialog {
  .v-card__title {
    height: auto;
    word-break:keep-all
  }
  .v-card__subtitle {
    padding-left: 24px;
  }
}
</style>
