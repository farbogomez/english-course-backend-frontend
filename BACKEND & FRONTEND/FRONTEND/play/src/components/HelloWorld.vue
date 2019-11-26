<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout colum align-center>
        <div class="section">
          <figure>
            <div class="level"></div>
            <figcaption style="font-weight: bold">Choose a level</figcaption>
          </figure>

          <figure>
            <div class="activities"></div>
            <figcaption style="font-weight: bold">Solve the activities</figcaption>
          </figure>

          <figure>
            <div class="coins"></div>
            <figcaption style="font-weight: bold">Win coins</figcaption>
          </figure>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({})
};
</script>
