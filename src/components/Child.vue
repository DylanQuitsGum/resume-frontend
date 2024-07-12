<template>
    <div class="luke">
        <div class="chat">
            <img src="../assets/luke-skywalkder.png" alt="Luke Skywalker" />
            <div class="bubble">
                <p>I'll never join you!</p>
                <p class='date'>02/24/2022</p>
            </div>
        </div>
        <p class="hint">Type something you would like to add:</p>
        <input type="text" placeholder="Press enter to send a message"
               @change="$emit('custom-event', $event.target.value)"/>
    </div>
</template>

<script>
    export default{
        name: "Child",
    };
</script>
