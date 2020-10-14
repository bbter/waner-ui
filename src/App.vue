<template>
<div>导航栏 |
    <router-link to="/">Bbt</router-link> |
    <router-link to="/xxx">Bbt2</router-link>
</div>
<hr>
<router-view></router-view>
</template>

<script>
export default {
    name: 'App',
}
</script>
