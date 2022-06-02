import { Server, Model, RestSerializer } from "miragejs";
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  archiveNoteHandler,
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  updateNoteHandler,
} from "./backend/controllers/NotesController";
import { users } from "./backend/db/users";
import { v4 as uuid } from "uuid";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      user: Model,
      notes: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          notes: [
            {
              _id: uuid(),
              title: "note 1",
              content: "dumy data for note 1",
              color: "#bebdff",
              createdOn: new Date().getMonth() + " " + new Date().toDateString(),
              pin: "notpinned",
              priority: "high",
              label: ["label-1","label-2","label-3"],
            },
            {
              _id: uuid(),
              title: "note 2",
              content: "dumy data for note 2",
              color: "rgb(255 101 132)",
              createdOn: new Date().getMonth() + " " + new Date().toDateString(),
              pin: "pinned",
              priority: "medium",
              label: ["label-1","label-3"],
            },
            {
              _id: uuid(),
              title: "note 3",
              content: "dumy data for note 3",
              color: "rgb(251 172 12)",
              createdOn: new Date().getMonth() + " " + new Date().toDateString(),
              pin: "notpinned",
              priority: "low",
              label: ["label-3"],
            },
            {
              _id: uuid(),
              title: "note 4",
              content: "dumy data for note 4",
              color: "#539987",
              createdOn: new Date().getMonth() + " " + new Date().toDateString(),
              pin: "pinned",
              priority: "high",
              label: ["label-1","label-2"],
            },
            {
              _id: uuid(),
              title: "note 5",
              content: "dumy data for note 5",
              color: "#8c7aa9",
              createdOn: new Date().getMonth() + " " + new Date().toDateString(),
              pin: "notpinned",
              priority: "medium",
              label: ["label-2","label-3"],
            }
          ],
          archives: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // notes routes (private)
      this.get("/notes", getAllNotesHandler.bind(this));
      this.post("/notes", createNoteHandler.bind(this));
      this.post("/notes/:noteId", updateNoteHandler.bind(this));
      this.delete("/notes/:noteId", deleteNoteHandler.bind(this));
      this.post("/notes/archives/:noteId", archiveNoteHandler.bind(this));

      // archive routes (private)
      this.get("/archives", getAllArchivedNotesHandler.bind(this));
      this.post(
        "/archives/restore/:noteId",
        restoreFromArchivesHandler.bind(this)
      );
      this.delete(
        "/archives/delete/:noteId",
        deleteFromArchivesHandler.bind(this)
      );
    },
  });
  return server;
}
