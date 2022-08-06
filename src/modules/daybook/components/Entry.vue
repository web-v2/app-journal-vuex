<template>
    <div>
        <div class="entry-container mb-3 pointer p-2" @click="$router.push({name: 'entry', params: {id: '1s5a1s5a8s7arfg54s4a5'}})">            
            <!-- titulo-->
            <div class="entry-title d-flex">
                <span class="text-success fs-5 fw-bold">01</span>
                <span class="mx-1 fs-5">Agosto</span>
                <span class="mx-2 fw-light">2022, lunes</span>
            </div>
            <div class="entry-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque blanditiis dicta excepturi at alias provident sequi labore iusto magnam dolorem, fugit saepe molestiae recusandae laboriosam eum. Nesciunt pariatur ex facilis.
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;
    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
    .entry-description{
        font-size: 14px;
    }
}

</style>