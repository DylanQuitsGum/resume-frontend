<template>
  <v-card title="Resumes" elevation="10">
    <v-data-table-virtual
      :headers="resumeHeaders"
      :items="userResumes"
      disable-pagination
      :hide-default-footer="true"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editResume(item.id)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="mr-2" @click="deleteResume(item.id)"
          >mdi-delete</v-icon
        >
        <v-icon small class="mr-2" @click="exportResume(item)"
          >mdi-export</v-icon
        >
      </template>
    </v-data-table-virtual>

    <v-card-actions>
      <v-btn small color="error" @click="removeAllResumes"> 
        Remove All 
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ResumeService from "@/services/resume.service";
import dateFormat from 'dateformat';
import jsPDF from "jspdf";

const router = useRouter();

const resumeHeaders = ref([
  {
    title: "Resume Title",
    align: "start",
    sortable: false,
    value: "resumeTitle",
  },
  { text: "Position", value: "position", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
]);

const userResumes = ref([]);
const user = JSON.parse(localStorage.getItem("user"));

const fetchData = async () => {
  fetchUserResumes();
};

const fetchUserResumes = async () => {
  try {
    const res = await ResumeService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userResumes.value = data.map((c) => ({
        ...c,
        ResumeTitle: c.resumeTitle,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};

const editResume = async (id) => {
  router.push({ path: `editResume/${id}` });
};

const deleteResume = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  ResumeService.delete(user.id, id)
    .then(() => {
      fetchUserResumes();
    })
    .catch((e) => {
      console.log(e);
    });
};

const exportResume = async (resume) => {
  const { resumeTitle, resumeText }  = resume;

  var doc = new jsPDF();
  doc.html(resumeText, {
    callback: function (doc) {
      var fileName = `${resumeTitle}.pdf`;
      doc.save(fileName);
    },
    x: 15,
    y: 15,
    width: 170,
    windowWidth: 670
  })
}

const removeAllResumes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  ResumeService.deleteAll(user.id)
    .then((response) => {
      this.fetchUserResumes();
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  fetchData();
});
</script>
