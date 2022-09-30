<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="openEmail(email)"
      >
        <td>
          <input type="checkbox" />
        </td>
        <td>{{ email.from }}</td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">{{ format(new Date(email.sentAt), "MMM do, yyyy") }}</td>
        <td>
          <button @click="archiveEmail(email)">Archive</button>
        </td>
      </tr>
    </tbody>
  </table>

  <MailView v-if="openedEmail" :email="openedEmail" />
</template>

<script>
import MailView from "@/components/MailView.vue";
import { format } from "date-fns";
import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    MailView
  },
  async setup() {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    let { data: emails } = await axios.get("http://localhost:3000/emails");
    return {
      format,
      emails,
      openedEmail: null
    };
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1;
      });
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(e => !e.archived);
    }
  },
  methods: {
    openEmail(email) {
      email.read = true;
      this.updateEmail(email);
      this.openedEmail = email;
    },
    archiveEmail(email) {
      email.archived = true;
      this.updateEmail(email);
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    }
  }
};
</script>

<style lang="scss" scoped></style>