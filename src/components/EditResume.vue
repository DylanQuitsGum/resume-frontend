<template>
  <div v-if="currentResume">
    <p class="headline">Edit Resume</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        variant="outlined"
        v-model="currentResume.resumeTitle"
        :rules="[(v) => !!v || 'Resume title is required']"
        label="Resume Title"
        required
      ></v-text-field>

      <v-app>
        <template>
          <div v-if="editor">
            <bubble-menu
              class="bubble-menu"
              :tippy-options="{ duration: 100 }"
              :editor="editor"
            >
              <button
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
              >
                Bold
              </button>
              <button
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
              >
                Italic
              </button>
              <button
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
              >
                Strike
              </button>
            </bubble-menu>
            <floating-menu
              class="floating-menu"
              :tippy-options="{ duration: 100 }"
              :editor="editor"
            >
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 1 }),
                }"
              >
                H1
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 2 }),
                }"
              >
                H2
              </button>
              <button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
              >
                Bullet list
              </button>
            </floating-menu>
          </div>
        </template>
        <editor-content :editor="editor" />
      </v-app>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateResume"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a resume...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ResumeService from "@/services/resume.service";
import router from "../router";

import jsPDF from "jspdf";
import { BubbleMenu, Editor, EditorContent, FloatingMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const editor = ref(
  new Editor({
    extensions: [StarterKit],
    content: "",
  })
);

const route = useRoute();
const user = JSON.parse(localStorage.getItem("user"));
const currentResume = ref();
const message = ref("");

const fetchUserResume = async () => {
  var resumeId = route.params.id;
  ResumeService.get(user.id, resumeId)
    .then((response) => {
      currentResume.value = response.data;
      editor.value.commands.setContent(currentResume.value.resumeText);
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateResume = async () => {
    var data = {
        resumeId: currentResume.value.id,
        userId: user.id,
        resumeTitle: currentResume.value.resumeTitle,
        resumeText: editor.value.getHTML()
    }
  ResumeService.update(user.id, currentResume.value.id, data)
    .then((response) => {
      message.value = "The resume was updated successfully!";
      router.push({ path: "/user" });
    })
    .catch((e) => {
      console.log(e);
    });
};

const cancelEdit = async () => {
  router.push({ path: "/user" });
};

onMounted(() => {
  fetchUserResume();
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
