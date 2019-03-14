<template>
  <mu-appbar color="primary">
    <mu-button icon slot="left"> <mu-icon value="menu"></mu-icon> </mu-button
    >Dashboard
    <mu-menu slot="right">
      <mu-button flat>MENU</mu-button>
      <mu-list slot="content">
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>Menu Item 1</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>Menu Item 2</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>
  </mu-appbar>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
.mu-appbar {
  top: 0;
  position: sticky;
  width: 100%;
}
</style>
