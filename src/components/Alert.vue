<template>
  <mu-snackbar :color="color" :open.sync="open" position="top">
    <mu-icon left :value="icon"></mu-icon>
    {{ message }}
    <mu-button flat slot="action" color="#fff" @click="$emit('close-alert')">
      Close</mu-button
    >
  </mu-snackbar>
</template>

<script>
export default {
  props: {
    color: String,
    message: String,
    open: Boolean,
    icon: String
  }
};
</script>
