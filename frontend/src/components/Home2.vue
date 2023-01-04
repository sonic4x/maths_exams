<script>

export default {
    data: () => ({
        list: [0, 1, 2, 3, 4],
        imagelist: [
            'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
            'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
            'https://images.unsplash.com/photo-1524260855046-f743b3cdad07?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',

        ]
    }),
};
</script>

<template>
    <v-container>
        <v-row justify="space-around">
            <Flicking>
                <img v-for="imgsrc in imagelist" :src="imgsrc" :key="imgsrc" />
                <!-- <div v-for="idx in list" class="flicking-panel" :key="idx">{{ idx }}</div> -->
            </Flicking>
        </v-row>
    </v-container>
</template>

<style scoped>
.flicking-panel {
    display: flex;
    height: 100px;
    object-fit: cover;
    width: 500px;
    align-items: center;
    justify-content: center;
    background-color: cornsilk;
}
</style>
