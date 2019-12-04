<template>
  <v-dialog
    v-model="dialog"
    width="40%"
    light
  >
    <template v-slot:activator="{ on }">
      <v-btn large :disabled="disableButton" :class="buttonClasses" v-on="on">{{buttonText}}</v-btn>
    </template>

    <v-card>
      <v-card-title>{{dialogText}}</v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" @click="dialog = false">Cancel</v-btn>
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
    buttonClasses: Array,
    buttonText: String,
    dialog: Boolean,
    enableDeny: Boolean,
    dialogText: String,
    disableButton: Boolean,
    denyCallback: Function,
    confirmCallback: Function,
  },
};
</script>
